import express from "express";
import cors from "cors";

import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { id, geo } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing video ID' });
    }

    //  console.log(id, geo);

    const url = `https://yt-api.p.rapidapi.com/dl?id=${id}&cgeo=${geo || 'DE'}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '89ce58ef37msh8e59da617907bbcp1455bajsn66709ef67e50', // Your RapidAPI Key
            'x-rapidapi-host': 'yt-api.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch video info' });
        }

        // Assuming 'result' contains the video download URL in some format
        // Make sure to check the structure of the response from RapidAPI
        console.log(result); // This will help you debug the response structure
        
        // Check if the result contains the download URL
        if (result && result.adaptiveFormats[0].url) {
            res.status(200).json({ videoUrl: result.adaptiveFormats[0].url }); // Or adjust based on actual response structure
        } else {
            res.status(500).json({ error: 'No video URL found in response' });
        }
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ error: 'Error fetching video data' });
    }
}


/*

const app = express();
// Enable CORS for all routes
app.use(cors());

export default async function handler(req, res) {
// app.get("/", async (req, res) => {
    const queryParams = req.query;
    let videoUrl = queryParams.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Missing video URL' });
    }

    // Create a URL object to handle parameters more easily
    let urlObj = new URL(videoUrl);
    
    // Append query parameters
    for (const [key, value] of Object.entries(queryParams)) {
        if (key !== 'url') {
            urlObj.searchParams.set(key, value);
        }
    }

    // Get the updated video URL
    videoUrl = urlObj.toString();

    // console.log(videoUrl); // Log the final URL to see what we are working with

    res.setHeader('Access-Control-Allow-Origin', 'https://media-sphere.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        // Custom headers to simulate a real browser request

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://www.youtube.com/',  // Or other appropriate referrer
            'Origin': 'https://www.youtube.com/',  // Or other appropriate origin
            'Accept': 'video/webm,video/mp4',  // Accept video formats
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
          };          



        // Fetch the video URL with redirects allowed
        const response = await fetch(videoUrl, { headers, redirect: 'follow' });

        // console.log(res);

        const body = await response.text(); // Or response.json() if it's JSON
        console.log('Response Body:', body);

        // Log headers to check if they are coming through
        console.log('Response Headers:', response.headers);

        // Check if the request was successful
        if (response.ok) {
            const finalUrl = response.url; // The final video URL after redirects
            console.log('Final URL:', finalUrl);

            const contentType = response.headers.get('Content-Type');
            res.setHeader('Content-Type', contentType || 'video/webm'); // Fallback to 'video/webm' if not available

            // Set the appropriate headers for video content
            // res.setHeader('Content-Type', 'video/webm');
            res.setHeader('Cache-Control', 'no-store'); // Do not cache video stream

            // Pipe the video data to the client
            response.body.pipe(res);
        } else {
            res.status(500).json({ error: 'Failed to retrieve video' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while fetching video' });
    }
}
*/

// Make the server listen on port 3000
/*
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
*/
/*

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const queryParams = req.query;
    let videoUrl = queryParams.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "Missing video URL." });
    }

    // Create a URL object to handle parameters more easily
    let urlObj = new URL(videoUrl);
    
    // Append query parameters
    for (const [key, value] of Object.entries(queryParams)) {
        if (key !== 'url') {
            urlObj.searchParams.set(key, value);
        }
    }

    // Get the updated video URL
    videoUrl = urlObj.toString();

    console.log(videoUrl); // Log the final URL to see what we are working with

    try {
        const response = await fetch(videoUrl, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://www.youtube.com/",
                "Origin": "https://www.youtube.com/",
                "Accept": "video/webm",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "Range": "bytes=0-",  // Request the video in parts (important for streaming)
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        // Set headers for the response and stream the video
        res.setHeader("Content-Type", response.headers.get("content-type"));
        res.setHeader("Access-Control-Allow-Origin", "*");

        response.body.pipe(res); // Stream video data to the client
    } catch (error) {
        res.status(500).json({ error: `Error fetching video: ${error.message}` });
    }
}*/
