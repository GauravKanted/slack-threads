const dotenv = require('dotenv');
const express = require('express')
const { WebClient } = require('@slack/web-api');
var Slackhook = require('slackhook');
const app = express()
const port = 3000
dotenv.config();

var outslack = new Slackhook({
  domain: 'siamcomputing',
  token: process.env.SLACK_OUT_TOKEN
});

const web = new WebClient(process.env.SLACK_IN_TOKEN);
const currentTime = new Date().toTimeString();

console.log('Getting started with Node Slack SDK');

app.get('/', function (req, res) {
  (async () => {
    // Use the `auth.test` method to find information about the installing user
    const res = await web.auth.test()
    
    // Find your user id to know where to send messages to
    const userId = res.user_id
    console.log("User:", userId)

    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      "type": "message",
      "channel": "chat-bot-live",
      "user": userId,
      "text": "Reply from the visitor"
    });
    console.log('Message posted!');
  })();
});

app.post('/post', function (req, res) {
  console.log("Inside Outgoing Fn", req, res)
  var hook = outslack.respond(req.body);
  res.json({ text: 'Hi ' + hook.user_name, username: 'Siam Computing' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))