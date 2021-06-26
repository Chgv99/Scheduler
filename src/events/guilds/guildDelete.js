const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

//const guildCommandPrefixes = new Map();

module.exports = class guildDeleteEvent extends BaseEvent {
    constructor () {
        super('guildDelete');
        this.connection = StateManager.connection;
    }

    async run (client, guild) {
        try {
            await this.connection.query(
                `DELETE FROM guilds  WHERE guildId = '${guild.id}'`
            );
            console.log('Deleted guild from guilds.');
            await this.connection.query(
                `DELETE FROM guildConfigurable  WHERE guildId = '${guild.id}'`
            );
            console.log('Deleted guild from guildConfigurable.');
            await this.connection.query(
                `DELETE FROM reminders WHERE guildId = '${guild.id}'`
            );
            console.log('Deleted guild reminders.');
            console.log('--DELETED GUILD FROM DB--');
        } catch (e) {
            console.log(e);
        }
    }
}

/*StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})*/

