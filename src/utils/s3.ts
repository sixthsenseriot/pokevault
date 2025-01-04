import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export const uploadToS3 = async (fileName: string, fileContent: Buffer | Readable, mimeType: string) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log(`File uploaded successfully: ${fileName}`);
  } catch (err) {
    console.error('Error uploading file to S3:', err);
  }
};

export const getFileFromS3 = async (fileName: string) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);

    return data.Body as Readable;
  } catch (err) {
    console.error('Error retrieving file from S3:', err);
  }
};

export const deleteFileFromS3 = async (fileName: string) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log(`File deleted successfully: ${fileName}`);
  } catch (err) {
    console.error('Error deleting file from S3:', err);
  }
};
