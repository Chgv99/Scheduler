const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const guildCommandPrefixes = new Map();

module.exports = class ChangePrefixCommand extends BaseCommand {
    constructor () {
        super('chprefix', 'configuration', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        if (message.member.id === message.guild.ownerID) {
            if (args.length != 1) message.channel.send('Incorrect amount of arguments');
            else {
                const prefix = guildCommandPrefixes.get(message.guild.id);
                const newPrefix = args[0];
                if (newPrefix === prefix) {
                    console.log(`New prefix is the same as the current one: ${prefix}`);
                    message.channel.send(`New prefix is the same as the current one: ${prefix}`);
                } else { 
                    
                    try {
                        await this.connection.query(
                            `UPDATE guildconfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
                        );
                        guildCommandPrefixes.set(message.guild.id, newPrefix);
                        StateManager.emit('prefixUpdated', message.guild.id, newPrefix);
                        console.log(`Prefix updated succesfully. New prefix: ${newPrefix}`);
                        message.channel.send(`Prefix updated succesfully. New prefix: ${newPrefix}`);
                    } catch (e) {
                        console.log(e);
                        message.channel.send(`Failed to update server prefix to ${newPrefix}`);
                    }
                }
            }
        } else {
            console.log('Not enough permissions.');
            message.channel.send('Not enough permissions.')
        }
    }
}

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})