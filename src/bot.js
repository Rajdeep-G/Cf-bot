require("dotenv").config();

const { Client, Message, MessageEmbed, Discord } = require("discord.js");
const axios = require("axios");
const client = new Client();

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
  

  client.login(process.env.TOKEN);