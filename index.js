//setting up client
const Discord = ({ Client, Intents, DiscordAPIError } = require("discord.js"));
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

//.config files
let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);
const prefix = config.prefix;
const token = config.botToken;

//command handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//main code
client.on("message", (message) => {
  //setup prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  //no command
  if (message.content === prefix) {
    message.channel.send("Sorry you need to enter a command!");
  }
  //help command
  if (command === "help") {
    client.commands.get("helpEmbed").execute(message, MessageEmbed);
  }
  //selfassign roles
  if ((command === "destiny", "raid")) {
    client.commands.get("giveRoles").execute(message);
  }
});

//logon && print to console && set activity status
client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "dnd",
  });
  client.user.setActivity(`Destiny 2!`);
});
client.login(token);
