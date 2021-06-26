const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const Discord = require('discord.js');
const Translate = require('../../utils/translateEmoji');
const parseCommand = require('../../utils/commands/command.js');
const { parse } = require('dotenv');
const CheckReminders = require('../../utils/CheckReminders');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();

module.exports = class ListCommand extends BaseCommand {
    constructor () {
        super('list', 'view', []);
        this.connection = StateManager.connection;
    }

    async run (client, message/*, args*/) {
        console.log("list command");
        console.log(message.guild.id);
        var reminderEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Schedule for " + message.guild.name)
                    .addFields(
                        {name: '\u200B', value: '\u200B'},
                        {name: ':calendar: Reminders:', value: '\u200B'}
                    );
        await StateManager.connection.query(
            `SELECT * FROM reminders WHERE guildId = '${message.guild.id}'`// '2021-06-07 01:24:00'`
        ).then(result => {
            console.log("result length: " + result[0].length);
            if (result[0].length > 0) {
                
                    //.setURL('https://discord.js.org/')
                    
                    //.setFooter(data.date)
                var count = 0;
                result[0].forEach(reminder => {
                    count++;
                    var countEmoji = Translate(count.toString());
                    countEmoji = countEmoji.join('');
                    reminderEmbed.addFields(
                        { name:  countEmoji + " " + reminder.title, value: reminder.description + "\n" + reminder.date },
                        { name:  '\u200B', value: '\u200B' }
                    )
                    
                })
                
                console.log(result[0])
            } else {
                reminderEmbed.addFields(
                    { name: ':x: No reminders set', value: '\u200B'},
                )
            }
            
        });
        reminderEmbed.addFields(
                        //{name: '\u200B', value: '\u200B'},
                        {name: ':clock3: Alarms:', value: '\u200B'}
                    );
        await StateManager.connection.query(
            `SELECT * FROM alarms WHERE guildId = '${message.guild.id}'`// '2021-06-07 01:24:00'`
        ).then(result => {
            console.log("result length: " + result[0].length);
            if (result[0].length > 0) {
                
                    //.setURL('https://discord.js.org/')
                    
                    //.setFooter(data.date)
                var count = 0;
                result[0].forEach(reminder => {
                    count++;
                    var countEmoji = Translate(count.toString());
                    countEmoji = countEmoji.join('');
                    reminderEmbed.addFields(
                        { name: countEmoji + " " + reminder.title, value: reminder.description},
                        { name:  '\u200B', value: '\u200B' }
                    )
                    
                })
                console.log(result[0])
            } else {
                reminderEmbed.addFields(
                    { name: ':x: No alarms set', value: '\u200B'},
                )
            }
            
        }).catch(e => console.log(e));
        message.channel.send(reminderEmbed);
    }
}

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})

StateManager.on('channelUpdated', (guildId, channel) => {
    guildOutputChannels.set(guildId, channel);
})