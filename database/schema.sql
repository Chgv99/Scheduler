CREATE DATABASE SchedulerBot;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    modLogId VARCHAR(100),
    cmdPrefix VARCHAR(10) DEFAULT '>>',
    outputChannel VARCHAR(100),
    timeZone TINYINT DEFAULT 0
);

CREATE TABLE Reminders (
    guildId VARCHAR(100) NOT NULL,
    date DATETIME NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(150),
    targetChannel VARCHAR(150)
);