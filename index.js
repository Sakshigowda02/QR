const express = require("express");
const QRCode = require("qrcode");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
  console.log("BODY:", req.body);

  const text = req.body.text || "default";
  console.log("Generating QR for text:", text);

  try {
    const qrCode = await QRCode.toDataURL(text);
    console.log("QR generated successfully");
    res.json({ qrCode });
  } catch (err) {
    console.error("QR ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
