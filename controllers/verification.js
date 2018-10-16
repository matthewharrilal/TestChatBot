module.exports = (req, res) => {
    const hubChallenge = req.query["hub.challenge"]; // Get the challenge of the request

    const hubMode = req.query["hub.mode"]; // Get the mode of the type of message it is
    const verifyTokenMatches = (req.query["hub.verify_token"] === "testBot"); // If the token is correct

    if (hubMode && verifyTokenMatches) { // If both these properties exist send the challenge with a 200 status code
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end(); // Else send a 403 if one of them is missing, need both!
    }
};
