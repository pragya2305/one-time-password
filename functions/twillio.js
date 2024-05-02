const twillio = require("twillio");

const accountSid = "AC05d6840c5d117f9ad0027df675a4d8ca";
const authToken = "88b71361896b3d0e8397d0b143d24001";

module.exports = new twillio.Twillio(accountSid, authToken);
