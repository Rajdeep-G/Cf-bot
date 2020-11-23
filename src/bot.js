require("dotenv").config();

const { Client, Message, MessageEmbed, Discord } = require("discord.js");
const axios = require("axios");
const client = new Client();

const PREFIX = "!cf ";

client.on("ready", () => {
  console.log(` ${client.user.tag} is logged in!`);
  client.user
    .setPresence({
      activity: {
        name: "!ctf help",
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
        .setTitle("Usage:\n!cf <command> [...args]")
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
    } else {
      channel.send("Command not yet ready");
    }
  }
});
client.login(process.env.TOKEN);
