const axios = require("axios");
const { API_KEY } = require("../../config/apiConfig");

// Verify GST Number
exports.verifyGST = async (req, res) => {
  const { gstin } = req.body;

  if (!gstin) {
    return res.status(400).json({ error: "GSTIN is required" });
  }
  const GST_API_URL = `${process.env.GST_URL}/${API_KEY}/${gstin}`;

  try {
    const response = await axios.get(GST_API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Invalid GSTIN or API Error" });
  }
};
