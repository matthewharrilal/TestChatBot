const express = require("express");
const bodyParser = require("body-parser");
const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    // Get the challenge in the response object to set socket with application
    const hubChallenge = res.socket.parser.incoming.query["hub.challenge"]
    res.send(hubChallenge) // Sent the challenge back to verify facebook application
});

app.get("/", verificationController);
app.post("/", messageWebhookController);

app.listen(3000, () => console.log("Webhook server is listening, port 3000"));
