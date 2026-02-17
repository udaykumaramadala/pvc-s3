const fs = require("fs");
const { uploadFile } = require("../utils/s3");

async function main() {
  console.log("RPA Service Started...");

  // Dummy files to simulate logs, documents, screenshots, videos, traces
  const files = [
    { path: "/tmp/test_log.txt", s3Key: "traces/test_log.txt", type: "text/plain", content: "Sample log" },
    { path: "/tmp/test_doc.pdf", s3Key: "documents/test_doc.pdf", type: "application/pdf", content: "Sample doc" },
    { path: "/tmp/test_screenshot.png", s3Key: "screenshots/test_screenshot.png", type: "image/png", content: "Sample screenshot" },
    { path: "/tmp/test_video.mp4", s3Key: "videos/test_video.mp4", type: "video/mp4", content: "Sample video" }
  ];

  for (const file of files) {
    fs.writeFileSync(file.path, file.content);
    await uploadFile(file.path, file.s3Key, file.type);
    fs.unlinkSync(file.path); // remove temp file
  }

  console.log("All files uploaded to S3.");
}

main().catch(err => console.error(err));
