import axios from "axios";

export const generateResponse = async (req, res) => {
    const {question} = req.body;

    try {

        const ragUrl = "https://imole-glmu8.ondigitalocean.app/chat/";

        axios.post(ragUrl, {user_query: question}, {responseType: 'stream'})
            .then(response => {
                console.log('Response received from RAG server')

                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
                res.setHeader('Connection', 'keep-alive');

                response.data.pipe(res);
                console.log("Streaming response to client")

            })
            .catch(e => console.error("Error fetching:", e))

    } catch (e) {

        console.error("Unexpected Error Occurred", e);
        return (
            res.status(500)
                .json({
                    error: "An unexpected error occurred while generating a valid server-sent event.",
                })
        )
    }
}

