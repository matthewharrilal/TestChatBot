require('dotenv').config({
    path: '.env'
})
const apiAiClient = require("apiai");
const express = require("express");
const app = express()
const dialogApp = apiAiClient(process.env.CLIENT_ACCESS_TOKEN)
const DIALOGFLOW_CLIENT_EMAIL = process.env.DIALOGFLOW_CLIENT_EMAIL
const FACEBOOK_ACCESS_TOKEN = process.env.CLIENT_TOKEN;
const projectId = 'testagent-bd2d4';
const sessionId = 'testBot';
const languageCode = 'en-US';
const request = require("request");
const dialogflow = require('dialogflow');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));


const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);
console.log('This is the session client ' + sessionClient)

const sessionPath = sessionClient.sessionPath(projectId, sessionId);
console.log('This is the session path ' + Object.entries(sessionPath))

function body(userId, text) {
    const postBody = {
        "messaging_type": 'RESPONSE',
        "recipient": {
            "id": userId
        },
        "message": {
            text
        }
    }

}

const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`

// const sendTextMessage = (userId, text) => {
//     return fetch(
//         `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             method: 'POST',
//             body: body
//         }
//     );
// }

const sendTextMessage = (userId, text) => {
    app.post(url, (req, res) => {
        req.headers['Content-Type'] = 'application/json'
        res.send(body(userId, text))
    })
};

module.exports = (res, text) => {
    // const userId = event.sender.id;
    // console.log('This is the intent ' + Object.keys)
    const message = text
    // const message = event.queryResult.fulfillmentText;
    // console.log("USER ID >>>>>>>>> " + userId)
    console.log("MESSAGEEE >>>>>>> " + message)

    // const apiaiSession = dialogApp.textRequest(message, {
    //     sessionId
    // })
    //
    // apiaiSession.on('response', (response) => {
    //     const result = response.result.fulfillment.speech;
    //     console.log("RESULT >>>>>>> " + result)
    //     sendTextMessage(userId, result)
    // });
    //
    // apiaiSession.on('error', (error) => {
    //     console.log(error)
    // });
    // apiaiSession.end()

    // const request = {
    //     session: sessionPath,
    //     queryInput: {
    //         text: {
    //             text: message,
    //             languageCode: languageCode,
    //         },
    //     },
    // };
    //
    // sessionClient
    //     .detectIntent(request)
    //     .then(responses => {
    //         const result = responses[0].queryResult;
    //         console.log("RESULT >>>>>> " + result.fulfillmentText)
    //         return sendTextMessage(userId, result.fulfillmentText);
    //     })
    //     .catch(err => {
    //         console.error('ERROR:', err);
    //     });
}
