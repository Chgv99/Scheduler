const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SourceCommand extends BaseCommand {
    constructor () {
        super('source', 'miscellaneous', []);
    }

    run (client, message, args) {
        console.log('[' + this.name + '] https://github.com/Chgv99');
        message.channel.send('https://github.com/Chgv99');
    }
}