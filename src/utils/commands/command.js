const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require('discord.js');
const guildCommandPrefixes = new Map();

module.exports = function (client, message) {
    console.log(client + message);
    try{
        
        const prefix = guildCommandPrefixes.get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);
        console.log(guildCommandPrefixes);
        console.log(prefix);
        
        var cmdName;
        var args;
        console.log("test command: ");
        console.log(cmdName + " " + args)
        if (prefix === usedPrefix) {
            //const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);
            //const command = client.commands.get(cmdName);
            
            if (message.content.indexOf("\"") > -1) {
                var header = message.content.substring(0, message.content.indexOf("\"") - 1).split(/\s+/);
                const argsQuot = message.content.substring(message.content.indexOf("\"") + 1, message.content.length - 1).split("\" \"");
                cmdName = header.shift();
                cmdName = cmdName.substring(prefix.length, cmdName.length);
                args = header.concat(argsQuot);
            } else {
                [cmdName, ...args] = message.content.slice(prefix.length).split(/\s+/);
            }
            
            const cmd = client.commands.get(cmdName);
            console.log("cmd: ", cmd);
            console.log("cmdName: ", cmdName);
            console.log("args: ", args);
            //const args = cmdArgs;
            if (cmd) {
                //command.run(client, message, cmdArgs);
                return [cmd, args];
            }
        }
        
        
        
    } catch (e) {
        console.log(e);
    };
}
//"ey" "putooos" "sup"
function findQuoteMarks(string) {
    if (string.indexOf("\"") > -1) {
        const argsQuot = message.content.substring(message.content.indexOf("\""), message.content.length);
        console.log("header = " + header);
        console.log("argsQuot = " + argsQuot);
    }
}

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});