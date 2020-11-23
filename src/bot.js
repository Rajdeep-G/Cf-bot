require("dotenv").config();

const { Client, Message, MessageEmbed, Discord } = require("discord.js");
const axios = require("axios");
const client = new Client();

const PREFIX = "!cf ";

const FUTURE_CONTEST_URL = "https://codeforces.com/api/contest.list?gym=false";
const USER_INFO_URL = "https://codeforces.com/api/user.info?handles=";
const RATING_URL = "https://codeforces.com/api/user.rating?handle=";
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
    if (resp.data["status"] === "FAILED") {
      channel.send("User with handle " + userHandle + " not found");
    } else {
      const user_data = resp.data["result"][0];
      const fullname = user_data["firstName"] + " " + user_data["lastName"];
      const present_status =
        user_data["rating"] + " (" + user_data["rank"] + ")";
      const max_status =
        user_data["maxRating"] + " (" + user_data["maxRank"] + ")";
      const eventEmbed = new MessageEmbed()
        .setTitle("User details")
        .setThumbnail("http:" + user_data["avatar"])
        .addField("Name ", fullname, true)
        .addField("Country ", user_data["country"], true)
        .addField("Organisation- ", user_data["organization"], true)
        .addField("Present Rating ", present_status, true)
        .addField("Max Rating ", max_status);

      channel.send(eventEmbed);
    }
  } catch (error) {
    channel.send("User with handle " + userHandle + " not found");
  }
};
getRatingChange = async (userHandle, channel) => {
  try {
    const resp = await axios.get(RATING_URL + userHandle, {
      headers: HEADERS,
    });
    const data = resp.data["result"][resp.data["result"].length - 1];
    const last_contest = data["contestId"] + " - " + data["contestName"];
    if (data["newRating"] - data["oldRating"] >= 0) {
      const eventEmbed = new MessageEmbed()
        .setColor("8AFF33")
        .setAuthor("LAST CONTEST DETAILS")
        .addField("Contest", last_contest)
        .addField("Rank", data["rank"], true)
        .addField("Old Rating", data["oldRating"], true)
        .addField("New Rating", data["newRating"], true);
      channel.send(eventEmbed);
    } else {
      const eventEmbed = new MessageEmbed()
        .setColor("D8181B")
        .setAuthor("LAST CONTEST DETAILS")
        .addField("Contest", last_contest)
        .addField("Rank", data["rank"], true)
        .addField("Old Rating", data["oldRating"], true)
        .addField("New Rating", data["newRating"], true);
      channel.send(eventEmbed);
    }
  } catch (error) {
    channel.send("There does not exist any ctf handles with the given name");
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
          "!cf userinfo <cf-handle>",
          "Displays details for a particular user"
        )
        .addField(
          "!cf lastcontest <cf-handle>",
          "Displays the rating change of the last contest"
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
    } else if (CMD.toLowerCase() === "lastcontest") {
      if (args.length !== 1) {
        channel.send("Too many arguments");
      } else {
        getRatingChange(args[0], channel);
      }
    } else {
      channel.send("INVALID COMMAND (╯°□°）╯︵ ┻━┻");
    }
  }
});
client.login(process.env.TOKEN);
