
# Image Proxy Serverless Function

This project contains a serverless function to act as a proxy for fetching and serving images. It uses Vercel's serverless function capabilities and allows you to fetch images from any URL and serve them from a different domain while handling CORS.

## Features

- **Proxy for Image Fetching:** Fetches an image from a URL and serves it via a Vercel serverless function.
- **CORS Support:** Allows cross-origin requests from a specified domain.
- **Custom Content-Type:** The function automatically sets the appropriate content type for the image.

## Setup

To get started with this serverless function, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/ivansojivarghese/proxy.git
cd proxy
```

### 2. Install Dependencies (Optional)

If you need to install dependencies (e.g., `node-fetch` for handling HTTP requests), you can create a `package.json` file in the repository:

```bash
npm init -y
npm install node-fetch
```

### 3. Deploy on Vercel

1. **Create a Vercel Account:** Go to [Vercel](https://vercel.com) and create an account if you don’t already have one.
2. **Connect to GitHub:** After logging into Vercel, connect your GitHub account and import this repository.
3. **Deploy the Function:** Vercel will automatically detect the serverless function in the `proxy.js` file and deploy it.
4. **Configure Domain Access:** The CORS headers in the function allow requests only from `https://media-sphere.vercel.app`. You can adjust this domain as needed.

### 4. Using the Proxy

To use the image proxy, make a `GET` request to your deployed Vercel function with the image URL as a query parameter:

```
https://<your-vercel-project>.vercel.app/api/proxy?url=<image-url>
```

Replace `<your-vercel-project>` with the name of this Vercel project and `<image-url>` with the URL of the image you want to fetch.

For example:

```
https://proxy-five-puce.vercel.app/api/proxy?url=https://example.com/image.jpg
```

The function will fetch the image from the provided URL and return it to the requester.

## License

This project is open-source and available under the MIT License.
