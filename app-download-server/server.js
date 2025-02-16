import axios from "axios";

export default async function handler(req, res) {
  try {
    // Replace "YOUR_FILE_ID" with your actual Google Drive File ID
    const GOOGLE_DRIVE_URL = "https://drive.google.com/uc?export=download&id=1W0tXFfxm67KMu4S6ELe6kks89nbhwoXg";

    // Fetch the APK file from Google Drive
    const response = await axios({
      url: GOOGLE_DRIVE_URL,
      method: "GET",
      responseType: "stream",
    });

    // Set headers to force file download
    res.setHeader("Content-Disposition", 'attachment; filename="alvana.apk"');
    res.setHeader("Content-Type", "application/vnd.android.package-archive");

    // Pipe the file to the response
    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download APK" });
  }
}
