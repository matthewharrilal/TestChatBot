const processMessage = require("../helpers/processMessage");

module.exports = (req, res) => {
    if (req.body.object === "page") {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                console.log('This is the entry ' + JSON.stringify(event))
                if (event.message && event.message.text) {
                    processMessage(event);
                }
            });
        });

        res.status(200).end();
    }
};
