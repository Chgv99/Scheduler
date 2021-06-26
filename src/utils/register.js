const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
        if (file.endsWith('.js')){
            const Command = require(path.join(filePath, file));
            if (Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                client.commands.set(cmd.name, cmd);
                //console.log(client.commands);
            }
        }
    }
}

async function registerEvents(client, dir = '') {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
        if (file.endsWith('.js')){
            const Event = require(path.join(filePath, file));
            //console.log(`${filePath}\\${file}`);
            if (Event.prototype instanceof BaseEvent) {
                const event = new Event();
                //console.log(`${event.name}, ${event.run.bind(null,client)}`);
                client.on(event.name, event.run.bind(event, client));
                //console.log(event.name);
            }
        }
    }
}

module.exports = { registerCommands, registerEvents };