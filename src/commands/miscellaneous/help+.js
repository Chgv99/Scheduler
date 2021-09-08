const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const StateManager = require('../../utils/StateManager');

//const { WebClient, LogLevel } = require("@slack/web-api");

const guildCommandPrefixes = new Map();

module.exports = class HelpPlusCommand extends BaseCommand {
    constructor () {
        super('help+', 'miscellaneous', []);
    }

    run (client, message, args) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Scheduler Help+')
            .setDescription(':robot:  Scheduler is a tool that allows you to create reminders and alarms inside your Discord server.')
            .setURL('https://github.com/Chgv99/Scheduler/blob/main/README.md')
            .addFields(
                { name: '\u200B', value: '\u200B'},
                { name: ':alarm_clock:  Set reminders', value: `\`\`\`${guildCommandPrefixes.get(message.guild.id)}reminder dd-mm-yyyy hh-mm "title" "description"\`\`\``},
                { name: '\u200B', value: ':clock3:  Time must use ISO 8601 format (24h).'},
                { name: '\u200B', value: ':newspaper:  The title and description of a reminder have to be enclosed in double quotes.'},
                { name: '\u200B', value: ':mag:  Description is optional.'},
                { name: '\u200B', value: '\u200B'},
                { name: ':calendar_spiral: List', value: `To see the list of created reminders use \`${guildCommandPrefixes.get(message.guild.id)}list\``},
                { name: '\u200B', value: '\u200B'},
                { name: ':grey_exclamation:  Change command prefix', value: `The default command prefix is \'>>\'. \`\`\`${guildCommandPrefixes.get(message.guild.id)}chprefix\`\`\``},
                { name: '\u200B', value: '\u200B'},
                { name: ':earth_africa:  Time Zone', value: '\nTo set up Scheduler, first you need to set a time zone for the server. It is set to UTC by default.' +
                                            `\`\`\`${guildCommandPrefixes.get(message.guild.id)}chtimezone YourTimeZone\`\`\`\n`+
                                            'For the moment, you only can set a time zone by using its full name (e.g. Atlantic/Canary, Europe/Madrid, etc...).\nCheck out [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of time zones if you don\'t know yours.\n'+
                                            `You can always see the current time of the server using \`${guildCommandPrefixes.get(message.guild.id)}time\`.\nBe careful, as having the expected time on your server does not mean that you got the correct time zone.`+
                                            `Not all time zones accomplish DST, so having an incorrect time zone might cause an unexpected time offset on spring and summer.`},
                { name: '\u200B', value: '\u200B'},
                
                //{ name: 'Prefix', value: ':pencil2: It is possible to change the default prefix of the commands by using *chprefix*. '},
                //{ name: '\u200B', value: '\u200B'},
                /*{ name: 'Date', value: 'dd-mm-yyyy', inline: true },
                { name: 'Time', value: 'hh:mm', inline: true },
                { name: 'Title', value: '"title"', inline: true },
                { name: 'Description', value: '"description"', inline: true },*/
            )
            .setFooter('Click on \'Scheduler Help+\' for more help.');
       /*console.log('[' + this.name + '] My creator is Christian G.!'+
                    '\nhttps://github.com/Chgv99'+
                    '\nhttps://twitter.com/ChgvCode'); */
        /*try {
            // Call the chat.postEphemeral method using the WebClient
            const result = await client.chat.postEphemeral({
                channel: message.channel.id,
                user: message.author.id,
                text: "Shhhh only you can see this :shushing_face:"
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }*/
        message.channel.send(helpEmbed); 
    }
}

StateManager.on('prefixUpdated', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
})