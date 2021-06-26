require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents } = require('./utils/register.js');
const checkReminders = require('./utils/CheckReminders.js');

var cron = require('node-cron');

/*function checkReminders(client) {
    console.log('checking...' + client);
    StateManager.connection.query(
        `SELECT * FROM reminders WHERE date = NOW()`
    ).then(result => {
        //console.log(result);
        if (result[0][0] != null) {

            StateManager.connection.query(
                `DELETE FROM reminders WHERE date = '2021-06-06 06:42:00'`
            ).then(result => {
                console.log('success. result deleted from reminders');
                
            });
            console.log(result[0]);
            
            
        }
        //console.log(result[1][0].name + ", " + result[1][1].name + ", " + result[1][2].name);
    });
}*/

var task = cron.schedule('*/5 * * * * *', () => {
    //console.log('running a task every five seconds');
    checkReminders(client);
});
//const { connection } = require('./utils/StateManager');

(async () => {
    //connection = await require('../database/db');
    client.commands = new Map();
    //client.events = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');

    task.start();
    
})();


client.login(process.env.BOT_TOKEN);
/*con.connect(function(e) {
    if (e) throw(e);
    console.log("MySQL connected!");

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for(const file of commandFiles){
        const command = require(`./commands/${file}`);

        client.commands.set(con, command.name, command);

    }

    const prefix = '_';

    client.once('ready', () => {
        console.log(`${client.user.tag} is online!`);
    });

    

    
})*/


//client.login(process.env.BOT_TOKEN);