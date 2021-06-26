const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const guildOutputChannels = new Map();
const guildTimeZones = new Map();

module.exports = class ChangeTimeZoneCommand extends BaseCommand {
    constructor () {
        super('chtimezone', 'configuration', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        console.log(guildOutputChannels);
        if (message.member.id === message.guild.ownerID) {
            if (args.length != 1) message.channel.send('Incorrect amount of arguments');
            else {
                const timeZone = guildTimeZones.get(message.guild.id);
                const newTimeZone = args[0];
                //console.log('channel: ' + channel.name);
                //console.log('newChannel: ' + newChannel.name);
                if (timeZone != null && newTimeZone === timeZone) {
                    console.log(`New time zone is the same as the current one: ${timeZone}`);
                    message.channel.send(`New time zone is the same as the current one: ${timeZone}`);
                } else { 
                    
                    try {
                        await this.connection.query(
                            `UPDATE GuildConfigurable SET timeZone = '${newTimeZone}' WHERE guildId = '${message.guild.id}'`
                        );
                        guildTimeZones.set(message.guild.id, newTimeZone);
                        StateManager.emit('timeZoneUpdated', message.guild.id, newTimeZone);
                        /*if (newTimeZone >= 0){
                            console.log(`Time zone updated succesfully. New time zone: UTC+${newTimeZone}`);
                            message.channel.send(`Time zone updated succesfully. New time zone: UTC+${newTimeZone}`);
                        } else {*/
                            console.log(`Time zone updated succesfully. New time zone: ${newTimeZone}`);
                            message.channel.send(`Time zone updated succesfully. New time zone: ${newTimeZone}`);
                        //}
                        console.log(guildOutputChannels);
                    } catch (e) {
                        console.log(e);
                        message.channel.send(`Failed to update server time zone to ${newTimeZone}`);
                    }
                }
            }
        } else {
            console.log('Not enough permissions.');
            message.channel.send('Not enough permissions.')
        }
    }
}

StateManager.on('timeZoneUpdated', (guildId, timeZone) => {
    guildTimeZones.set(guildId, timeZone);
})
/*
StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})*/