const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const Discord = require('discord.js');
const Translate = require('../../utils/translateEmoji');
const parseCommand = require('../../utils/commands/command.js');
const { parse } = require('dotenv');
const CheckReminders = require('../../utils/CheckReminders');
const moment = require('moment-timezone');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();
const guildTimeZones = new Map();

module.exports = class TimeZoneCommand extends BaseCommand {
    constructor () {
        super('timezone', 'view', []);
        this.connection = StateManager.connection;
    }

    async run (client, message/*, args*/) {
        console.log("timezone command");
        const now = moment().tz(guildTimeZones.get(message.guild.id))
        console.log("The time on this server is ", now.hours(), ":", now.minutes());
        const tz = guildTimeZones.get(message.guild.id)
        var hours
        var minutes
        now.hours() >= 10 ? hours = now.hours().toString() : hours = "0" + now.hours().toString()
        now.minutes() >= 10 ? minutes = now.minutes().toString() : minutes = "0" + now.minutes().toString()
        message.channel.send("The time zone for this server is " + moment.tz(tz).format("Z z") + " (" + tz + ").");
    }
}

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})

StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})

StateManager.on('timeZoneUpdated', (guildId, timeZone) => {
    guildTimeZones.set(guildId, timeZone);
})