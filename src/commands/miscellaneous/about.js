const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AboutCommand extends BaseCommand {
    constructor () {
        super('about', 'miscellaneous', []);
    }

    run (client, message, args) {
        console.log('[' + this.name + '] My creator is Christian G.!'+
                    '\nhttps://github.com/Chgv99'+
                    '\nhttps://twitter.com/ChgvCode'); 
        message.channel.send('My creator is Christian G.!'+
                             '\nhttps://github.com/Chgv99'+
                             '\nhttps://twitter.com/ChgvCode'); 
    }
    /*name: 'author',
    description: 'This will show info about my creator!',
    execute(con, message, args){
        message.channel.send('My creator is Christian G.!\nhttps://github.com/Chgv99\nhttps://twitter.com/ChgvCode'); 
    }*/
}