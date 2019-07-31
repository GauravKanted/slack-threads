require('dotenv').config()
const express = require('express')
const { WebClient } = require('@slack/web-api');

const app = express()
const port = 3000
const web = new WebClient(process.env.SLACK_TOKEN);
const currentTime = new Date().toTimeString();

(async () => {
    // Use the `auth.test` method to find information about the installing user
    const res = await web.auth.test()
  
    // Find your user id to know where to send messages to
    const userId = res.user_id
    console.log("User:",userId)

    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: userId,
      text: `The current time is ${currentTime}`,
    });
  
    console.log('Message posted!');
  })();

console.log('Getting started with Node Slack SDK');

//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port)//, () => console.log(`Example app listening on port ${port}!`))