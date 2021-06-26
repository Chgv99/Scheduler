<!--<p align="center">
  <a href="https://github.com/Chgv99/Face-Class/blob/main/README.md">English</a> • <a href="https://github.com/Chgv99/Face-Class/blob/main/README(es).md">Español</a>
</p>-->

<h1 align="center">
 Scheduler
</h1>
<!--<h1 style="display: none">
  EY
</h1>-->
<p align="center">
 <b>A Discord bot that allows you to create reminders and alarms inside your own server.</b>
</p>
<p align="center">
 <img src="https://img.shields.io/badge/Project-WIP-orange"> <img src="https://img.shields.io/badge/Documentation-Outdated-orange">
</p>
<p align="center">
 <a href="https://github.com/Chgv99/Scheduler/blob/main/README.md#features">Features</a> • <a href="https://github.com/Chgv99/Scheduler/blob/main/README.md#help">Help</a>
</p>


# Features

You and your friends will be able to set useful reminders and alarms inside your Discord server for everyone to see.

<details open>
  <summary><b>The current version offers:</b></summary>

1. Creating a reminder on the specified date and time with a title (and a description).
2. Setting up a broadcast channel
3. Specify the output channel for a specific reminder
4. Modify the default prefix so it doesn't get in conflict with your other bots
5. See a list of the current reminders
  
</details>

<details>
<summary><b>Future features:</b></summary>

1. Alarms (recurrent reminders)
2. Delete reminders and alarms
3. More settings for reminders (e.g. to specify the amount of time left rather than the date and time, to allow more date formats like YYYY-MM-DD)
4. Server configuration for server roles with permissions (now available for server creator only)
5. Multiple broadcast channels
6. Assign different time zones for the multiple broadcast channels (if you have a friend in a different time zone this will be very helpful :smile:)
</details>

# Help

## **Set up** 🛠️

To set up Scheduler, first you need to set a time zone for the server using ```>>chtimezone YourTimeZone```. It is set to UTC+0 by default.
For the moment, you only can set a time zone by using its full name (e.g. Atlantic/Canary, Europe/Madrid, etc...).

Check out [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of time zones if you don\'t know yours. You can always see the current time zone of the server using `>>timezone` and the time using `>>time`.

:warning: Be careful, as having the expected time on your server does not mean that you got the correct time zone.
Not all time zones accomplish [DST](https://en.wikipedia.org/wiki/Daylight_saving_time), so having an incorrect time zone might cause an unexpected time offset on spring and summer.

## **Command prefix** ❕

The default command prefix is `>>`. 

You can change it by using
```>>chprefix```

## Broadcast channel :loudspeaker:

Every time a reminder is sent, it'll be throught the *default* channel. By default, the *default* channel will be set to 'general'.

This can be modified using

`>>chchannel newchannel`

## Reminders :calendar:

A reminder is used when you need to remember something once on a concrete date and time.
In the current version, you can create a reminder by specifying time, date, and a title.

`>>reminder dd-mm-yyyy hh-mm "title"`

Also, you can add a description, so you or your friends have some context on what you wanted to remind.

`>>reminder dd-mm-yyyy hh-mm "title" "description"`

These reminders will be sent by default through `general`. You can [change it](https://github.com/Chgv99/Scheduler/blob/main/README.md#broadcast-channel) to whichever you want.
If you want to send a reminder through a different channel from the default you can specify it too. Just like this:

`>>reminder dd-mm-yyyy hh-mm "title" "description" channel`

:warning: Time must be specified using ISO 8601 format (24h).

:warning: The title and description of a reminder have to be enclosed in double quotes.

<!--## :alarm_clock:-->
