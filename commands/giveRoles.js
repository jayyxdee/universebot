module.exports = {
  name: "giveRoles",
  description: "self assign discord roles",
  execute(message) {
    //   let member = message.mentions.members.last();
    switch (message.content) {
      case "d!destiny":
        if (message.member.roles.cache.has("894150440994881536")) {
          message.channel.send("You already have that role!");
          console.log("destinyRole - have");
        } else {
          message.member.roles.add("894150440994881536").catch(console.error);
          message.channel.send("You have been given the destiny role.");
          console.log("destinyRole - give");
        }
        break;
      case "d!raid":
        if (message.member.roles.cache.has("893847125010575410")) {
          message.channel.send("You already have that role!");
          console.log("raidRole - have");
        } else {
          message.member.roles.add("893847125010575410").catch(console.error);
          message.channel.send("You have been given the raid role.");
          console.log("raidRole - give");
        }
        break;
    }
  },
};
