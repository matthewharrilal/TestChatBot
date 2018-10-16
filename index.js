const express = require("express");
const bodyParser = require("body-parser");
const CircularJSON = require('circular-json');
const searchJSON = require('./helpers/JSONSearch.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const sampleObject = {
    title: "Hello",
    msg: {
        titleMsg: "Jello"
    },
    age: 7
}

function getChallenge(str, challengeIndex) {
    var endIndex = 0
    for (i = challengeIndex; i < str.length; i++) {
        console.log('hi')
        if (str[i] == "&") {
            endIndex = i
         }
    }
    return endIndex
}

app.get('/', (req, res) => {
    const strJSON = CircularJSON.stringify(res)
    const hubChallenge = res.socket.parser.incoming.query["hub.challenge"]
    res.send(hubChallenge)
});

app.listen(3000, () => console.log("Webhook server is listening, port 3000"));
