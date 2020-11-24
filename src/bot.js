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
getFutureContests = async (channel, limit) => {
  try {
    const resp = await axios.get(FUTURE_CONTEST_URL, { headers: HEADERS });
    var i;
    var count_contest = 0;
    const contest_data = [];

    for (i = 15; i >= 0; i--) {
      if (resp.data["result"][i]["phase"] === "BEFORE") {
        count_contest += 1;
        contest_data.push(resp.data["result"][i]["id"]);
        contest_data.push(resp.data["result"][i]["name"]);
        contest_data.push(resp.data["result"][i]["durationSeconds"]);
        contest_data.push(resp.data["result"][i]["startTimeSeconds"]);
      }
    }
    var c;
    if (count_contest < limit) {
      channel.send(
        "There are maximum " + count_contest + " contests in upcoming future"
      );
    }
    for (c = 0; c < count_contest; c++) {
      if (c >= limit) {
        break;
      }
      const contest_duration = contest_data[4 * c + 2] / 3600 + " Hrs";
      const contest_url =
        "https://codeforces.com/contests/" + contest_data[4 * c];
      const date = new Date(contest_data[4 * c + 3] * 1000).toLocaleDateString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      );
      const time = new Date(contest_data[4 * c + 3] * 1000).toLocaleTimeString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      );
      const m_time =
        time.substring(0, time.lastIndexOf(":")) +
        time.substring(time.lastIndexOf(":") + 3);
      const display_date_and_time = date + " at " + m_time;
      const helpEmbed = new MessageEmbed()
        .setURL(contest_url)
        .setTitle(contest_data[4 * c + 1])
        .addField("Contest-Id", contest_data[4 * c], true)
        .addField("Duration", contest_duration, true)
        .addField("Starting at (IST)", display_date_and_time, true);

      channel.send(helpEmbed);
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
      const current_rating = user_data["rating"];
      if (current_rating > 3000) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("FF1A1A")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 2700) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("FF1A1A")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 2400) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("FF1A1A")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 2200) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("FF981A")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 2000) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("FF981A")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1900) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("F155FF")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1600) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("337DFF")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1400) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("57FCF2")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1200) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("72FF72")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1000) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("A2E044")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      } else if (current_rating > 1000) {
        const eventEmbed = new MessageEmbed()
          .setTitle("User details")
          .setColor("988F81")
          .setThumbnail("http:" + user_data["avatar"])
          .addField("Name ", fullname, true)
          .addField("Country ", user_data["country"], true)
          .addField("Organisation ", user_data["organization"], true)
          .addField("Present Rating ", present_status, true)
          .addField("Max Rating", max_status);

        channel.send(eventEmbed);
      }
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
      const old_rating = parseInt(data["oldRating"], 10);
      const new_rating = parseInt(data["newRating"], 10);
      var tier;
      if (new_rating >= 3000 && old_rating < 3000) {
        tier = "Legendary Grandmaster";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("FF1A1A")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 2700 && old_rating < 2700) {
        tier = "International Grandmaster";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("FF1A1A")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 2400 && old_rating < 2400) {
        tier = "GrandMaster";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("FF1A1A")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 2200 && old_rating < 2200) {
        tier = "International Master";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("FF981A")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 2000 && old_rating < 2000) {
        tier = "Master";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("FF981A")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 1900 && old_rating < 1900) {
        tier = "Candidate master";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("F155FF")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 1600 && old_rating < 1600) {
        tier = "Expert";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("337DFF")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 1400 && old_rating < 1400) {
        tier = "Specialist";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("57FCF2")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 1200 && old_rating < 1200) {
        tier = "Apprentice";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("72FF72")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else if (new_rating >= 1000 && old_rating < 1000) {
        tier = "Pupil";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("A2E044")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      } else {
        tier = "NewBie";
        const eventEmbed2 = new MessageEmbed()
          .setTitle("CONFRATULTAIONS")
          .setColor("988F81")
          .addField("You are now a  ", tier);
        channel.send(eventEmbed2);
      }
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
        .setThumbnail(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFhsi1ZImNJDXQdTK9j6TEDA2n8Y0egkaDDA&usqp=CAU"
        )
        .setDescription("Its a bot to get in touch with CF.")
        .addField(
          "!cf future <no of upcoming contests>",
          "Displays upcoming CF contests"
        )
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
      if (args.length !== 1) {
        if (args.length != 0) {
          channel.send("Invalid number of arguments!");
        } else {
          getFutureContests(channel, 1);
        }
      } else {
        const no_of_contest = parseInt(args[0], 10);
        if (no_of_contest <= 0) {
          channel.send("Please enter a positive number.");
        } else {
          if (Number.isInteger(no_of_contest)) {
            getFutureContests(channel, no_of_contest);
          } else {
            channel.send("Please enter a positive number.");
          }
        }
      }
    } else if (CMD.toLowerCase() === "userinfo") {
      if (args.length !== 1) {
        channel.send("Invalid number of arguments");
      } else {
        getUserInfo(args[0], channel);
      }
    } else if (CMD.toLowerCase() === "lastcontest") {
      if (args.length !== 1) {
        channel.send("Invalid number of arguments");
      } else {
        getRatingChange(args[0], channel);
      }
    }  else {
      channel.send("INVALID COMMAND (╯°□°）╯︵ ┻━┻");
    }
  }
});
client.login(process.env.TOKEN);
