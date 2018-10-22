const processMessage = require("../helpers/processMessage");
const JSON = require('circular-json')

module.exports = (req, res) => {
    var csTopic;
    req.body.queryResult.fulfillmentMessages.forEach(textObject => {
        console.log('')

        console.log('MESSAGE >> ' + JSON.stringify(req.body.queryResult.queryText))
        console.log('RESULT >> ' + JSON.stringify(textObject.text.text[0]))

        if (req.body.queryResult.outputContexts[0].parameters['CS-Topics']) {
            csTopic = req.body.queryResult.outputContexts[0].parameters['CS-Topics']
        }

        console.log(csTopic)
        res.status(200).end();
    });
}
