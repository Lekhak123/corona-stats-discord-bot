const Discord = require('discord.js');
const client = new Discord.Client();



const api = require('novelcovid');
api.settings({
    baseUrl: 'https://api.caw.sh'
})




let token = "";

client.on("message", async (message) => {
    if (!message.content.toLowerCase().startsWith(">>covid") || message.author.bot) return;
    let country_ = message.content.replace(">>covid", "");
    
    const result = await api.countries({
        country: `${country_}`
    })

    if (result) {
        var err = result.message;
        if (err === "Country not found or doesn't have any cases") {
            message.reply("Invalid country name")
            return;
        }

        var {
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            todayRecovered,
            active,
            critical,
            tests,
            continent,
            population,
            country
        } = result;
        
        const corona = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`CORONA INFO FOR: ${country}`)
            .setAuthor(`REQUESTED BY:${message.author.username}`)
            .addFields({
                name: 'Cases (TOTAL):',
                value: `${cases}`
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: 'Cases (TODAY)',
                value: `${todayCases}`,
                inline: true
            }, {
                name: 'Deaths (TODAY)',
                value: `${todayDeaths}`,
                inline: true
            }, {
                name: 'Recovered (TODAY)',
                value: `${todayRecovered}`,
                inline: true
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: 'Deaths total:',
                value: `${deaths}`
            }, {
                name: 'ACTIVE',
                value: `${active}`,
                inline: true
            }, {
                name: 'CRITICAL',
                value: `${critical}`,
                inline: true
            }, {
                name: 'Recovered (TOTAL)',
                value: `${recovered}`,
                inline: true
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: 'TESTS (TOTAL):',
                value: `${tests}`
            }, {
                name: 'CONTINENT:',
                value: `${continent}`
            }, {
                name: 'POPULATION:',
                value: `${population}`
            }, )
            .setTimestamp()

        await message.channel.send(corona);

    }

});


client.login(token);
