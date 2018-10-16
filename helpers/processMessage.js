require('dotenv').config()
const apiAiClient = require("apiai");
const DIALOGFLOW_CLIENT_EMAIL = process.env.DIALOGFLOW_CLIENT_EMAIL
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const projectId = 'testagent-bd2d4';
const sessionId = 'testBot';
const languageCode = 'en-US';
const request = require("request");
const dialogflow = require('dialogflow');
const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const sendTextMessage = (userId, text) => {
    return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                    id: userId,
                },
                message: {
                    text,
                },
            }),
        }
    );
}

module.exports = (event) => {
    const userId = event.sender.id;
    const message = event.message.text;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult;
            return sendTextMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}
