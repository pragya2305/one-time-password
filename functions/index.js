const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const createUser = require("./create_user");
const serviceAccount = require("./service_account.json");
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createUser = onRequest(createUser);

exports.requestOneTimePassword = onRequest(requestOneTimePassword);

exports.verifyOneTimePassword = onRequest(verifyOneTimePassword);
