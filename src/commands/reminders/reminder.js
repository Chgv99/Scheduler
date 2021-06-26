const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const parseCommand = require('../../utils/commands/command.js');
const moment = require('moment-timezone');
const { parse } = require('dotenv');

const guildTimeZones = new Map();
const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();

module.exports = class ReminderCommand extends BaseCommand {
    constructor () {
        super('reminder', 'reminders', []);
        this.connection = StateManager.connection;
    }

    async run (client, message/*, args*/) {
        /*console.log(message.content);
        var header = message.content.slice(0, message.content.indexOf(' \"'));
        header = header.split(" ");
        var argsQuot = message.content.split("\"");//.split("");
        argsQuot.splice(0,1);
        argsQuot = argsQuot.join().split("").reverse().join("").substring(1).split("").reverse().join("").split(", ,");
        *///.join("").split("\" \"")
        
        const [cmd, args] = parseCommand(client, message);
        
        /*console.log("header");
        console.log(header);
        console.log("argsQuot");
        console.log(argsQuot);*/

        //console.log("header = " + cmd);
        //console.log("argsQuot = " + args);

        /**var desc = message.content.slice(message.content.indexOf("\""), message.content.length).substring(1);
        const title = desc.slice(0, desc.indexOf("\""));
        desc = desc.split("").reverse().join("").substring(1);
        desc = desc.slice(0, desc.indexOf("\"")).split("").reverse().join("");*/
        //console.log(desc);
        //desc = desc;
        
        //console.log(header.length);
        //console.log(argsQuot.length);
        console.log("nonce", message.nonce);
        console.log("timestamp", message.createdTimestamp);
        const messageTime = new Date(message.createdTimestamp);
        console.log("date", messageTime);
        if (args.length >= 3/* && (header.length + argsQuot.length) <= 5*/){
            var day;
            var month;
            var year;
            console.log("args[0]: " + args[0] + "|");
            if (args[0].indexOf("-") > -1) {
                console.log("ey tengo -");
                [day, month, year] = args[0].split('-');
            }
            if (args[0].indexOf("/") > -1) {
                console.log("ey tengo /");
                [day, month, year] = args[0].split('/');
            }
            const [hours, minutes] = args[1].split(':');
            
            
            //console.log(message.createdTimestamp);
            console.log("nonce", message.nonce);
            //console.log(message.nonce - message.createdTimestamp);
            console.log("fecha actual UTC")
            
            
            //var date = new Date(year,month,day,hours,minutes)
            var tz = guildTimeZones.get(message.guild.id)
            //date.setTime(date.getTime() - (tz*60*60*1000))

            //cambiar tz por la guardada en cache
            console.log(tz)
            //month starts on 0 (january)
            var mmnt = moment.utc([year,month-1,day,hours,minutes]).tz(tz)
            mmnt = moment(mmnt).tz("Etc/UTC")
            //var date = moment().format("DD")
            //console.log(date)
            //hora traducida a UTC (la que usa el bot)
            //var translatedMoment = date//mmnt.clone().tz("Etc/UTC")

            console.log("fechilla");
            console.log(mmnt)
            console.log(moment(mmnt))
            console.log(mmnt.date())
            console.log(month)
            console.log(year)
            console.log(hours)
            console.log(minutes)
            //console.log(translatedMoment)
            /*console.log(date.toGMTString())
            console.log(date.getDate())
            console.log(date.getMonth())
            console.log(date.getFullYear())
            console.log(date.getHours())
            console.log(date.getMonth())*/

            console.log(args.length)
            if (args.length == 4){
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Reminders VALUES('${message.guild.id}', \'${mmnt.format("YYYY")}-${mmnt.format("MM")}-${mmnt.format("DD")} ${mmnt.format("HH")}:${mmnt.format("mm")}\', '${args[2]}', '${args[3]}', '${guildOutputChannels.get(message.guild.id)}')`
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', \'${translatedMoment.getFullYear()}-${translatedMoment.getMonth()}-${translatedMoment.date()} ${translatedMoment.getHours()}:${translatedMoment.getMinutes()}:00\', '${args[2]}', '${args[3]}', '${guildOutputChannels.get(message.guild.id)}')`
                    );
                    console.log(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes}.`); 
                    message.channel.send(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the reminder. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            } else if (args.length == 5){
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Reminders VALUES('${message.guild.id}', \'${mmnt.format("YYYY")}-${mmnt.format("MM")}-${mmnt.format("DD")} ${mmnt.format("HH")}:${mmnt.format("mm")}\', '${args[2]}', '${args[3]}', '${args[4]}')`
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', \'${translatedMoment.getFullYear()}-${translatedMoment.getMonth()}-${translatedMoment.date()} ${translatedMoment.getHours()}:${translatedMoment.getMinutes()}\', '${args[2]}', '${args[3]}', '${args[4]}')`
                    );
                    console.log(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes} in ${args[4]}.`); 
                    message.channel.send(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes} in ${args[4]}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the reminder. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            } else {
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Reminders VALUES('${message.guild.id}', \'${mmnt.format("YYYY")}-${mmnt.format("MM")}-${mmnt.format("DD")} ${mmnt.format("HH")}:${mmnt.format("mm")}\', '${args[2]}', NULL, '${guildOutputChannels.get(message.guild.id)}')`
                    );
                    console.log(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes}.`); 
                    message.channel.send(`Reminder "${args[2]}" set successfully on ${day}-${month}-${year} at ${hours}:${minutes}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the reminder. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            }
            
            console.log(day);
            console.log(month);
            console.log(year);
            console.log(hours);
            console.log(minutes);
            
        } else {
            console.log('[' + this.name + '] Wrong amount of arguments.\n' + 
                        `Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
            message.channel.send('Wrong amount of arguments.\n' + 
                                 `Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
        }
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