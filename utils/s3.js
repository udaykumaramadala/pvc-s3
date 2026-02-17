const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function uploadFile(filePath, s3Key, contentType) {
  const fileStream = fs.createReadStream(filePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: s3Key,
      Body: fileStream,
      ContentType: contentType
    })
  );

  console.log(`Uploaded to S3: ${s3Key}`);
}

module.exports = { uploadFile };
