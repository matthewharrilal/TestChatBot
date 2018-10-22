const processMessage = require("../helpers/processMessage");
const JSON = require('circular-json')

module.exports = (req, res) => {
    req.body.queryResult.fulfillmentMessages.forEach(textObject => {
        console.log('')
        console.log('MESSAGE >> ' + JSON.stringify(req.body.queryResult.queryText))
        if (req.body.queryResult.outputContexts[0].parameters['CS-Topics']) {
            console.log(req.body.queryResult.outputContexts[0].parameters['CS-Topics'])
        }
        console.log('RESULT >> ' + JSON.stringify(textObject.text.text[0]))
        console.log('')
        res.status(200).end();
    });
}
