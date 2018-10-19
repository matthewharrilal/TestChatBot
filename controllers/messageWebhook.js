const processMessage = require("../helpers/processMessage");
const JSON = require('circular-json')

// function findById(o, id) {
//     //Early return
//     if (o.id === id) {
//         return o;
//     }
//     var result, p;
//     for (p in o) {
//         if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
//             result = findById(o[p], id);
//             if (result) {
//                 return result;
//             }
//         }
//     }
//     return result;
// }

module.exports = (req, res) => {
    // console.log('These are the request parameters ' + JSON.stringify(req.params))
    req.body.queryResult.fulfillmentMessages.forEach(textObject => {
        console.log('')
        console.log('MESSAGE >> ' + JSON.stringify(req.body.queryResult.outputContexts[0].parameters['CS-Topics']))
        console.log('RESULT >> ' + JSON.stringify(textObject.text.text[0]))
        console.log('')
        res.status(200).end();
    });
}
