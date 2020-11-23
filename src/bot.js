require("dotenv").config();

const { Client, Message, MessageEmbed, Discord } = require("discord.js");
const axios = require("axios");
const client = new Client();

const PREFIX = "!cf ";

const FUTURE_CONTEST_URL = "https://codeforces.com/api/contest.list?gym=false";
const USER_INFO_URL = "https://codeforces.com/api/user.info?handles=";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:82.0) Gecko/20100101 Firefox/82.0",
};
getFutureContests = async (channel) => {
  try {
    const resp = await axios.get(FUTURE_CONTEST_URL, { headers: HEADERS });
    var i;
    const contest_data = [];
    for (i = 15; i >= 0; i--) {
      if (resp.data["result"][i]["phase"] === "BEFORE") {
        console.log(resp.data["result"][i]["name"]);
        contest_data.push(resp.data["result"][i]);
        console.log(contest_data);
      }
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

getUserInfo = async (userHandle, channel) => {
  try {
    const resp = await axios.get(USER_INFO_URL + userHandle, {
      headers: HEADERS,
    });
    console.log(resp.data["result"][0]);
  } catch (error) {
    console.error("Error: ", error);
  }
};

client.on("ready", () => {
  console.log(` ${client.user.tag} is logged in!`);
  client.user
    .setPresence({
      activity: {
        name: "!cf help",
        type: "WATCHING",
        details: "(1001)",
      },
    })
    .then(console.log)
    .catch(console.error);
});

client.on("message", (msg) => {
  if (msg.content.startsWith(PREFIX)) {
    const [CMD, ...args] = msg.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    const channel = msg.channel;
    if (CMD.toLowerCase() === "help") {
      const helpEmbed = new MessageEmbed()
        .setURL("https://codeforces.com")
        .setTitle("Usage: !cf <command> [...args]")
        .setImage(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFhsi1ZImNJDXQdTK9j6TEDA2n8Y0egkaDDA&usqp=CAU"
        )
        .setDescription("Its a bot to get in touch with CF.")
        .addField("!cf future", "Displays upcoming CF contests")
        .addField(
          "!cf user-info <cf-handle>",
          "Displays details for a particular user"
        );

      channel.send(helpEmbed);
    } else if (CMD.toLowerCase() === "future") {
      if (args.length !== 0) {
        channel.send("Too many arguments.");
      } else {
        getFutureContests(channel);
      }
    } else if (CMD.toLowerCase() === "userinfo") {
      if (args.length !== 1) {
        channel.send("Too many arguments");
      } else {
        getUserInfo(args[0], channel);
      }
    } else {
      channel.send("Command not yet ready");
    }
  }
});
client.login(process.env.TOKEN);
