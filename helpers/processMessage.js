require('dotenv').config()
const API_AI_TOKEN = process.env.API_AI_TOKEN;
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const request = require("request");

const sendTextMessage = (senderId, text) => {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages", // Send a request for a message from my account
        qs: {
            access_token: FACEBOOK_ACCESS_TOKEN // Use my facebook access token for verification that is my page
        },
        method: "POST", // Make a post request
        json: {
            recipient: { // The recipient of the message is the user who's send id is passed in
                id: senderId
            },
            message: { // Pass in a body of text to be sent to the user
                text
            },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {
        sessionId: "testBot"
    });

    apiaiSession.on("response", (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on("error", error => console.log(error));
    apiaiSession.end();
};
