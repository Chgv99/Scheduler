const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();
const guildTimeZones = new Map();

module.exports = class guildCreateEvent extends BaseEvent {
    constructor () {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (client, guild) {
        try {
            await this.connection.query(
                `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
            );
            await this.connection.query(
                `INSERT INTO GuildConfigurable VALUES ('${guild.id}', NULL, '>>', 'general', 'Etc/UTC')`
            );
            guildOutputChannels.set(guild.id, 'general');
            StateManager.emit('channelUpdated', guild.id, 'general');
            guildCommandPrefixes.set(guild.id, '>>');
            StateManager.emit('prefixUpdated', guild.id, '>>');
            guildTimeZones.set(guild.id, '>>');
            StateManager.emit('timeZoneUpdated', guild.id, "Etc/UTC");
            console.log('Added guild to db.');
        } catch (e) {
            console.log(e);
        }
    }
}

//No deberían hacer falta
StateManager.on('timeZoneUpdated', (guildId, tz) => {
    guildTimeZones.set(guildId, tz);
})
StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})
StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})

