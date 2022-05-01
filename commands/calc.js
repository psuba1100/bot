const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('number + number')
        .addNumberOption(option =>
            option.setName('číslo1')
                .setDescription('Zadajte číslo 1')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('operácia')
                .setDescription('Operácia')
                .addChoice('Sčítanie', '+')
                .addChoice('Odčítanie', '-')
                .addChoice('Násobenie', '*')
                .addChoice('Delenie', '/')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('číslo2')
                .setDescription('Zadajte číslo 2')
                .setRequired(true)),

    async execute(interaction) {
        const n = interaction.options.getNumber('číslo1') || 0
        const o = interaction.options.getString('operácia') || 0
        const n1 = interaction.options.getNumber('číslo2') || 0
        const a = interaction.user.tag
        const pfp = interaction.user.displayAvatarURL()
        const profileModel = require('../models/profileSchema')
        const data = await profileModel.findOne({ userID: interaction.user.id });
        let user;
        try{
            user = data.username
        }catch{
            user = interaction.user.tag
        }

        const embedp = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle(`= ${n + n1}`)
            .setURL('https://www.google.com/search?q=calc&oq=calc&aqs=chrome.0.69i59j0i131i433i512j0i433i512j0i512l2j46i10i199i291i512j0i512l2j0i433i512j0i512.1184j0j7&sourceid=chrome&ie=UTF-8')
            .setDescription(`${n} + ${n1} = ${n + n1}`)
            .setAuthor({ name: user, iconURL: pfp})
            .setFooter({ text: `Case ${n} + ${n1} = ${n + n1} by ${a}`, iconURL: pfp });

        const embedm = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle(`= ${n - n1}`)
            .setURL('https://www.google.com/search?q=calc&oq=calc&aqs=chrome.0.69i59j0i131i433i512j0i433i512j0i512l2j46i10i199i291i512j0i512l2j0i433i512j0i512.1184j0j7&sourceid=chrome&ie=UTF-8')
            .setDescription(`${n} - ${n1} = ${n - n1}`)
            .setAuthor({ name: user, iconURL: pfp})
            .setFooter({ text: `Case ${n} - ${n1} = ${n + n1} by ${a}`, iconURL: pfp });

        const embedn = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle(`= ${n * n1}`)
            .setURL('https://www.google.com/search?q=calc&oq=calc&aqs=chrome.0.69i59j0i131i433i512j0i433i512j0i512l2j46i10i199i291i512j0i512l2j0i433i512j0i512.1184j0j7&sourceid=chrome&ie=UTF-8')
            .setDescription(`${n} - ${n1} = ${n * n1}`)
            .setAuthor({ name: user, iconURL: pfp})
            .setFooter({ text: `Case ${n} * ${n1} = ${n + n1} by ${a}`, iconURL: pfp });

        const embedd = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle(`= ${n / n1}`)
            .setURL('https://www.google.com/search?q=calc&oq=calc&aqs=chrome.0.69i59j0i131i433i512j0i433i512j0i512l2j46i10i199i291i512j0i512l2j0i433i512j0i512.1184j0j7&sourceid=chrome&ie=UTF-8')
            .setDescription(`${n} / ${n1} = ${n / n1}`)
            .setAuthor({ name: user, iconURL: pfp})
            .setFooter({ text: `Case ${n} / ${n1} = ${n + n1} by ${a}`, iconURL: pfp });

        module.exports.o = o

        module.exports.embedp = embedp
        module.exports.embedm = embedm
        module.exports.embedn = embedn
        module.exports.embedd = embedd
        const idBan = interaction.user.id
        const bannedModel = require('../models/bannedSchema')
        var bannedData = await bannedModel.findOne({ userID: idBan });

        if (!bannedData) {
            if (o == '+') {
                await interaction.reply({
                    embeds: [embedp],
                });
            }
            else if (o == '-') {
                await interaction.reply({
                    embeds: [embedm],
                });
            }
            else if (o == '*') {
                await interaction.reply({
                    embeds: [embedn],
                });
            }
            else if (o == '/') {
                await interaction.reply({
                    embeds: [embedd],
                });
            }
            else {
                return
            }
        }
        else {
            await interaction.reply('oh no! Looks like your discord account has been banned please conntact our support!')
        }

    },
}