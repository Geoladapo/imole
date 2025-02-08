import axios from "axios";

export const generateResponse = async (req, res) => {
    const {question} = req.body;

    try {
        const ragUrl = "https://imole-glmu8.ondigitalocean.app/chat/";

        // Start streaming the response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        console.log("Sending request to RAG system...");

        const response = await axios({
            method: "post",
            url: ragUrl,
            data: { user_query: question },
            responseType: "stream",
        });

        response.data.on("data", (chunk) => {
            res.write(chunk);
        });

        response.data.on("end", () => {
            console.log("Streaming completed.");
            res.end();
        });

        response.data.on("error", (err) => {
            console.error("Error in streaming:", err);
            res.status(500).end("Error in streaming response.");
        });

    } catch (e) {
        console.error("Unexpected Error Occurred", e);
        res.status(500).json({ error: "Unexpected server error." });
    }
}

