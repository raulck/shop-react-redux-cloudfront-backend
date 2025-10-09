import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import csv from "csv-parser";
import { Readable } from "stream";

const s3 = new S3Client({});
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

      const products: any[] = [];
      
      await new Promise<void>((resolve, reject) => {
        bodyStream
          .pipe(csv())
          .on("data", (row: any) => {
            console.log("Processing CSV row:", row.title || 'Unknown Product');
            products.push(row);
          })
          .on("end", resolve)
          .on("error", reject);
      });

      console.log(`Processed ${products.length} products from CSV file`);

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
