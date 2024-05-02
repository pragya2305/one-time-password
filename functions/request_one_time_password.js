const admin = require("firebase-admin");
const twillio = require("./twillio");

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must provide a phone number" });
  }

  // format the phone number to remove dashes and parenthesis
  const phone = String(res.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .getUser(phone)
    .then((useRecord) => {
      const code = Math.floor(Math.random() * 8999 + 1000);
      twillio.messages.create(
        {
          body: "Your code is " + code,
          to: phone,
          from: "+12054168045",
        },
        (err) => {
          if (err) {
            return res.status(422).send(err);
          }

          admin
            .database()
            .ref("users/" + phone)
            .update({ code, codeValid: true }, () => {
              res.send({ sucess: true });
            });
        }
      );
    })
    .catch((err) => {
      res.status(422).send({ error: err });
    });
};
