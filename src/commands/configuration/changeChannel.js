const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const guildOutputChannels = new Map();

module.exports = class ChangeChannelCommand extends BaseCommand {
    constructor () {
        super('chchannel', 'configuration', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        console.log(guildOutputChannels);
        if (message.member.id === message.guild.ownerID) {
            if (args.length != 1) message.channel.send('Incorrect amount of arguments');
            else {
                const channel = guildOutputChannels.get(message.guild.id);
                const newChannel = client.channels.cache.find(channel => channel.name === `${args[0]}`);
                //console.log('channel: ' + channel.name);
                //console.log('newChannel: ' + newChannel.name);
                if (channel != null && newChannel === channel) {
                    console.log(`New output channel is the same as the current one: ${channel.name}`);
                    message.channel.send(`New output channel is the same as the current one: ${channel}`);
                } else { 
                    
                    try {
                        await this.connection.query(
                            `UPDATE guildconfigurable SET outputChannel = '${newChannel.name}' WHERE guildId = '${message.guild.id}'`
                        );
                        guildOutputChannels.set(message.guild.id, newChannel.name);
                        StateManager.emit('channelUpdated', message.guild.id, newChannel.name);
                        console.log(`Output channel updated succesfully. New channel: ${newChannel.name}`);
                        message.channel.send(`Output channel updated succesfully. New channel: ${newChannel}`);
                        console.log(guildOutputChannels);
                    } catch (e) {
                        console.log(e);
                        message.channel.send(`Failed to update server output channel to ${newChannel}`);
                    }
                }
            }
        } else {
            console.log('Not enough permissions.');
            message.channel.send('Not enough permissions.')
        }
    }
}

StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})