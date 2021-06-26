var cron = require('node-cron');

var crono = function crono(){
    cron.schedule('5 * * * *', () => {
        //console.log('running a task every minute');
    }, {
        scheduled: true
    });
}

//module.exports = { crono };