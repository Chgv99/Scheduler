const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const parseCommand = require('../../utils/commands/command.js');
const { parse } = require('dotenv');

const guildCommandPrefixes = new Map();
const guildOutputChannels = new Map();

module.exports = class DeleteAlarmCommand extends BaseCommand {
    constructor () {
        super('deletealarm', 'reminders', []);
        this.connection = StateManager.connection;
    }

    async run (client, message/*, args*/) {
        const [cmd, args] = parseCommand(client, message);
        if (args.length == 1/* && (header.length + argsQuot.length) <= 5*/){
            //const [day, month, year] = args[0].split('-');
            //const [hours, minutes] = args[0].split(':');
            
            try {
                await this.connection.query(
                    `DELETE FROM alarms WHERE title = '${args[0]}'`
                ).then(result => {
                    console.log('success. result deleted from alarms');
                    
                    //StateManager.emit('sendMessage', result[0]);
                    //StateManager.emit('prefixUpdated', guildId, prefix);
                });
                console.log(`Alarm "${args[0]}" deleted successfully.`); 
                message.channel.send(`Alarm "${args[0]}" deleted successfully.`); 
            } catch (e) {
                console.log(e);
                message.channel.send(`Could not set delete the alarm. Use ${guildCommandPrefixes.get(message.guild.id)}help to see the command format.`); 
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