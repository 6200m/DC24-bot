const commando = require('discord.js-commando');
const mysql     = require('mysql');
const fs        = require("fs");
const path      = require('path');
const config    = JSON.parse(fs.readFileSync("./Settings/config.json", "utf8"));

const client = new commando.Client({
	owner: config.bot.owner,
	commandPrefix: config.bot.prefix
});

var database = mysql.createConnection({
    host        : config.auth.database.host,
    user        : config.auth.database.user,
    password    : config.auth.database.password,
    database    : config.auth.database.database
});

client.on('ready', async function() {
    database.connect();
    console.log(`${bot.user.tag} is online and running!`);
    bot.user.setActivity(config.bot.status);
})

client.registry
    .registerGroup('code', 'Code')
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.auth.token);