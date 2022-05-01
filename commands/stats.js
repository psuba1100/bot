const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows your stats'),
    async execute(interaction) {
        const support = require('../index.js')
        let Data1;
        const idBan = interaction.user.id
        const bannedModel = require('../models/bannedSchema')
        var bannedData = await bannedModel.findOne({ userID: idBan });

        if (!bannedData) {
            Data1 = await profileModel.findOne({ userID: interaction.user.id });
            const pfp = interaction.user.displayAvatarURL()
            let user;
            try{
                user = Data1.username
            }catch{
                user = interaction.user.tag
            }
            if (!Data1) {
                const error = new MessageEmbed()
                .setColor('#d50000')
                .setAuthor({ name: user, iconURL: pfp})
                .setTitle('Oh no! I see an error on the horizon!')
                .setDescription("Looks like you don't have an account. Please use `/login`. If you need list of commands or support, feel free to use `/help`.")
                .setTimestamp()
                await interaction.reply({embeds: [error]})
            } else {
                const pfp = interaction.user.displayAvatarURL()
                const embed = new MessageEmbed()

                    .setColor('#fdd835')
                    .setTitle(`Balance`)
                    .setAuthor({ name: user, iconURL: pfp})
                    //.setURL('https://www.google.com/search?q=calc&oq=calc&aqs=chrome.0.69i59j0i131i433i512j0i433i512j0i512l2j46i10i199i291i512j0i512l2j0i433i512j0i512.1184j0j7&sourceid=chrome&ie=UTF-8')
                    .setDescription(`Váš balanc je: \n \n Moons: ${Data1.moons} \n Suns: ${Data1.suns} \n Energy: ${Data1.energy} <:energy:934456469540208772>`)
                    .setThumbnail('https://i.imgur.com/iqPeFux.png')
                    .setTimestamp()
                await interaction.reply({
                    embeds: [embed]
                })
            }
        }
        else {
            await interaction.reply('oh no! Looks like your discord account has been banned please conntact our support!')
        }


    },
};