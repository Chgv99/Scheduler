const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require('discord.js');
const parseCommand = require('../../utils/commands/command.js');

const guildCommandPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
    constructor () {
        super('message');
        this.connection = StateManager.connection;
    }

    async run (client, message) {
        if (message.author.bot) return;
        
        try{
            console.log("et");
            const [cmd, args] = parseCommand(client, message);
            cmd.run(client, message, args);
        }catch (e) {
            console.log(e);
        };

        
    }
}

StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});