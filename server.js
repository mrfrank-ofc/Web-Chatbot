const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chatbot API endpoint
app.post("/chat", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await axios.get(
      `https://api.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(query)}`
    );
    res.json({ response: response.data });
  } catch (error) {
    console.error("Error calling chatbot API:", error);
    res.status(500).json({ error: "Failed to fetch response from chatbot" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
