const admin = require("firebase-admin");

module.exports = (req, res) => {
  // verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad Input" });
  }

  // format the phone number to remove dashes and parenthesis
  const phone = String(res.body.phone).replace(/[^\d]/g, "");

  // create a new user account using that phone number
  admin
    .auth()
    .createUser({ uid: phone })
    .then((user) => res.send(user))
    .catch((err) => res.status(422).send({ error: err }));

  // respond to user request, saying the account was created
};
