import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET_NAME;

export const handler = async (event: {
  queryStringParameters: { name: any };
}) => {
  try {
    const fileName = event.queryStringParameters?.name;

    if (!fileName || !fileName.endsWith(".csv")) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: "Query param name is required and must end with .csv",
      };
    }

    const key = `uploaded/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: "text/csv",
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: url,
    };
  } catch (err) {
    console.error("Error generating signed URL:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Internal Server Error",
    };
  }
};
