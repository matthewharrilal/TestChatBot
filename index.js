const express = require("express");
const bodyParser = require("body-parser");
const CircularJSON = require('circular-json');
const searchJSON = require('./helpers/JSONSearch.js')
const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    const strJSON = CircularJSON.stringify(res)
    const hubChallenge = res.socket.parser.incoming.query["hub.challenge"]
    res.send(hubChallenge)
});

app.get("/", verificationController);
app.post("/", messageWebhookController);

app.listen(3000, () => console.log("Webhook server is listening, port 3000"));
