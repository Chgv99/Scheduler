const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();
const guildTimeZones = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super('ready');
        //console.log(StateManager.connection);
        this.connection = StateManager.connection;
    }

    async run (client) {
        //console.log(bot.user.tag + ' has logged in.');
        console.log(client.user.tag + ' is online!');
        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT * FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                //console.log(result);
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const outputChannel = result[0][0].outputChannel;
                const timeZone = result[0][0].timeZone;
                console.log(outputChannel);
                guildCommandPrefixes.set(guildId, prefix);
                guildOutputChannels.set(guildId, outputChannel);
                guildTimeZones.set(guildId, timeZone);
                StateManager.emit('prefixUpdated', guildId, prefix);
                StateManager.emit('channelUpdated', guildId, outputChannel);
                StateManager.emit('timeZoneUpdated', guildId, timeZone);
            }).catch(e => console.log(e));
        });
    }
}