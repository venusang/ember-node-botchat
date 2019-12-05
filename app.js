const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pusher = require("pusher");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ensure that your pusher credential are properly set in the .env file
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  forceTLS: true
});

const dialogFlowURL = process.env.DIALOGFLOW_URL;
const token = process.env.DEVELOPER_ACCESS_TOKEN;

app.set("port", process.env.PORT || 3000);
//https://nodejs.org/docs/v0.4.12/api/http.html#response.writeHead
//https://expressjs.com/en/api.html#setHeaders
//https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets
//response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
//https://github.com/apache/couchdb/issues/2221
app.post("/dialogue", (req, res) => {
  const data = {
    query: req.body.text,
    lang: "en",
    sessionId: "1234567890!@#$%^&*()"
  };

  axios
    .post(`${dialogFlowURL}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const responseData = {
        query: data.query,
        speech: response.data.result.fulfillment.speech
      };
      pusher.trigger("bot", "bot-response", responseData);
    })
    .catch(error => {
      console.log("error", error);
    });
});

app.listen(app.get("port"), () => {
  console.log("Listening on " + app.get("port"));
});
