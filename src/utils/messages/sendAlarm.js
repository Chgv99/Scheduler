const BaseEvent = require('../structures/BaseEvent');
const StateManager = require('../StateManager');
const Discord = require('discord.js');
//const { MessageEmbed } = require('discord.js');
const guildOutputChannels = new Map();
const guildPrefixes = new Map();

module.exports = function (client, data) {
    var guildId = data.guildId;
    var targetChannel;
    if (data.targetChannel) targetChannel = data.targetChannel;
    else targetChannel = guildOutputChannels.get(data.guildId);
    const channel = client.channels.cache.find(channel => {
        //console.log("channel");
        //console.log(channel);
        //console.log("channel name: " + channel.name + " channel guild: " + channel.guild.id);
        if (channel.name === targetChannel && channel.guild.id === guildId){
            //console.log("canal final " + channel.name);
            return channel;
        } else {
            return null;
        }
    });
    //console.log("final channel info: ");
    //console.log(channel);
    
    /**TODO
     * LOS REMINDERS SE ENVÍAN A SERVIDORES ERRÓNEOS
     * channel DEVUELVE UNA GUILDID QUE NO CORRESPONDE
     * CON LA DE LA GUILD DEL CHANNEL AL QUE SE QUIERE
     * ENVIAR EL REMINDER
     */



    /*console.log(data[i]);
    const chan = guildOutputChannels.get(data[0][i].guildId);
    console.log('chan');
    console.log(guildOutputChannels);
    const channel = client.channels.cache.find(channel => channel.name === chan);
    console.log('channel');
    console.log(channel);*/
    console.log("data:");
    console.log(data);
    var reminderEmbed;
    if (data.description) {
        reminderEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(":clock3: " + data.title)
            //.setURL('https://discord.js.org/')
            .addFields(
                { name: ":pencil2: " + data.description, value: '\u200B'},
            )
            .setFooter("This alarm will go off every day at " + data.time + ".\nUse \`" + guildPrefixes.get(data.guildId) + "help\` to learn how to delete alarms.")
    } else {
        reminderEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(data.title)
            //.setURL('https://discord.js.org/')
            .setFooter("This alarm will go off every day at " + data.time + ".\nUse \`" + guildPrefixes.get(data.guildId) + "help\` to learn how to delete alarms.")
    }
    channel.send(reminderEmbed);
}

StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})

StateManager.on('prefixUpdated', (guildId, channel) => {
    guildPrefixes.set(guildId, channel);
})
/*StateManager.on('sendMessage', data => {
    console.log("ey");
    sendMessage(data);
});*/