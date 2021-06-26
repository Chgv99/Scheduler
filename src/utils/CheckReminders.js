const StateManager = require('./StateManager');
const SendReminder = require('./messages/sendReminder.js');
const SendAlarm = require('./messages/sendAlarm.js');
const SendList = require('./messages/sendList.js');

const guildTimeZones = new Map();

module.exports = function (client) {
    //console.log('checking...');
    StateManager.connection.query(
        `SELECT * FROM reminders WHERE date <= NOW()`// + '${guildTimeZones.get()}'`// '2021-06-07 01:24:00'`
    ).then(result => {
        //console.log(result);
        

        
        var now
        for (var i = 0; i < result[0].length; i++){
            console.log(result[0][i])
            /*now = new Date(Date.now())
            //sumar zona horaria del servidor
            console.log("now: ", now.toGMTString())
            console.log("timezone: ", guildTimeZones.get(result[0][i].guildId))
            now.setTime(now.getTime() + guildTimeZones.get(result[0][i].guildId)*60*60*1000)
            console.log("now (with timezone): ", now.toGMTString())
            
            console.log(i)
            console.log(result[0][i])*/
            //console.log("raw date: ", result[0][])
            /*var date = new Date(result[0][i].date)
            storedTZ = guildTimeZones.get(result[0][i].guildId)
            if (storedTZ > 0){
                if (storedTZ >= 10){
                    var dateMoment = moment.tz(date.getYear+"-"+
                                       date.getMonth+"-"+
                                       date.getDay+"T"+
                                       date.getHours+":"+
                                       date.getMinutes, +
                                       "00"+"+"+storedTZ+":"+"00"
                }
            }*/
            

                                       //guildTimeZones.get(result[0][i].guildId)/**60*60*1000*/)
            
            console.log("check reminder date: ", result[0][i].date)
            now = new Date(Date.now())
            console.log("check reminder now: ", now)
        }  

        if (result[0][0] != null) {
            

            //CAMBIAR DELETE POR UNO ESPECÍFICO DEL REMINDER QUE SE HAYA ENVIADO
            //(AHORA SE ELIMINAN TODOS LOS REMINDERS NOW() coincidentes)
            StateManager.connection.query(
                `DELETE FROM reminders WHERE date <= NOW()`
            ).then(result => {
                console.log('success. result deleted from reminders');
                //StateManager.emit('sendMessage', result[0]);
                //StateManager.emit('prefixUpdated', guildId, prefix);
            });

            for (var i = 0; i < result[0].length; i++){
                SendReminder(client, result[0][i]);
            }   
            //console.log(result[0][0].guildId);
               
            //console.log(result[0]);
            
            
        } else {
            //console.log('null');
        }
        //console.log(result[1][0].name + ", " + result[1][1].name + ", " + result[1][2].name);
    });

    /*StateManager.connection.query(
        `SELECT * FROM alarms WHERE time <= NOW()`// '2021-06-07 01:24:00'`
    ).then(result => {
        if (result[0][0] != null) {
            console.log("result checkalarms ");
            console.log(result[0]);

            //CAMBIAR DELETE POR UNO ESPECÍFICO DEL REMINDER QUE SE HAYA ENVIADO
            //(AHORA SE ELIMINAN TODOS LOS REMINDERS NOW() coincidentes)
            StateManager.connection.query(
                `DELETE FROM alarms WHERE time <= NOW()`
            ).then(result => {
                console.log('success. result deleted from alarms');
            });

            for (var i = 0; i < result[0].length; i++){
                SendAlarm(client, result[0][i]);
            }
        }
    });*/
}

StateManager.on('timeZoneUpdated', (guildId, timeZone) => {
    guildTimeZones.set(guildId, timeZone);
})

//module.exports = { checkrm };