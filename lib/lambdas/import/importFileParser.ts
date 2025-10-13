import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import csv from "csv-parser";
import { Readable } from "stream";
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';


const s3 = new S3Client({});
const sqsClient = new SQSClient({});
const sqsUrl = process.env.SQS_URL!;

const BUCKET = process.env.BUCKET_NAME;

export const handler = async (event: { Records: any }) => {
  for (const record of event.Records || []) {
    try {
      const bucket = record.s3.bucket.name;
      const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

      console.log("Processing file:", key);

      const getRes = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: key })
      );
      const bodyStream = getRes.Body as Readable;

      if (!bodyStream) {
        console.warn(`Empty Body for key: ${key}`);
        continue;
      }

      await new Promise<void>((resolve, reject) => {
        bodyStream
          .pipe(csv())
          .on("data", async (row: any) => {
            // console.log("ROW:", row);
            try {
              console.log('Sending parsed row to SQS:', row);
              await sqsClient.send(
                new SendMessageCommand({
                  QueueUrl: sqsUrl,
                  MessageBody: JSON.stringify(row),
                })
              );
            } catch (err) {
              console.error('Failed to send message to SQS:', err);
            }
          })
          .on("end", resolve)
          .on("error", reject);
      });

      console.log(`CSV file ${key} successfully processed and sent to SQS.`);
      
      const parsedKey = key.replace("uploaded/", "parsed/");
      await s3.send(
        new CopyObjectCommand({
          Bucket: BUCKET,
          CopySource: `${bucket}/${key}`,
          Key: parsedKey,
        })
      );
      await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));

      console.log(`File moved to ${parsedKey}`);
    } catch (err) {
      console.error("Error processing file:", err);
      throw err;
    }
  }
};
