import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Replacement for request

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
    const videoUrl = req.query.url;
    
    try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        
        res.setHeader("Content-Type", response.headers.get("content-type"));
        response.body.pipe(res); // Stream video response
    } catch (error) {
        res.status(500).send(`Error fetching video: ${error.message}`);
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
