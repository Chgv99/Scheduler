const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const parseCommand = require('../../utils/commands/command.js');
const { parse } = require('dotenv');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();

module.exports = class AlarmCommand extends BaseCommand {
    constructor () {
        super('alarm', 'reminders', []);
        this.connection = StateManager.connection;
    }

    async run (client, message/*, args*/) {
        const [cmd, args] = parseCommand(client, message);
        console.log(cmd);
        console.log(args);
        if (args.length >= 2/* && (header.length + argsQuot.length) <= 5*/){
            //const [day, month, year] = args[0].split('-');
            const [hours, minutes] = args[0].split(':');
            console.log("horillas y minutillos");
            console.log(hours + ", " + minutes);
            console.log(args)
            if (args.length == 3){
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Alarms VALUES('${message.guild.id}', \'${hours}:${minutes}\', '${args[1]}', '${args[2]}', '${guildOutputChannels.get(message.guild.id)}')`
                    ).catch(e => {
                        console.log(e);
                    });
                    console.log(`Alarm "${args[1]}" set successfully at ${hours}:${minutes}.`); 
                    message.channel.send(`Alarm "${args[1]}" set successfully at ${hours}:${minutes}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the alarm. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            } else if (args.length == 4){
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Alarms VALUES('${message.guild.id}', \'${hours}:${minutes}\', '${args[1]}', '${args[2]}', '${args[3]}')`
                    );
                    console.log(`Alarm "${args[2]}" set successfully at ${hours}:${minutes} in ${args[3]}.`); 
                    message.channel.send(`Alarm "${args[2]}" set successfully at ${hours}:${minutes} in ${args[3]}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the alarm. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            } else {
                try {
                    await this.connection.query(
                        //`INSERT INTO Reminders VALUES('${message.guild.id}', '${message.channel.id}', \'${year}-${month}-${day} ${hours}:${minutes}\', '${argsQuot[0]}', '${argsQuot[1]}')`
                        `INSERT INTO Alarms VALUES('${message.guild.id}', \'${hours}:${minutes}\', '${args[1]}', NULL, '${guildOutputChannels.get(message.guild.id)}')`
                    );
                    console.log(`Alarm "${args[1]}" set successfully at ${hours}:${minutes}.`); 
                    message.channel.send(`Alarm "${args[1]}" set successfully at ${hours}:${minutes}.`); 
                } catch (e) {
                    console.log(e);
                    message.channel.send(`Could not set the alarms. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
                }
            }
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