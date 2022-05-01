const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('suggest your suggestion to developers')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('what is your suggestion')
                .setRequired(true)),
    async execute(interaction) {
        //935170276952514640
        const suggestion = interaction.options.getString('suggestion')
        const username = interaction.user.tag
        const id = interaction.user.id
        const idBan = interaction.user.id
        const bannedModel = require('../models/bannedSchema')
        var bannedData = await bannedModel.findOne({ userID: idBan });

        if (!bannedData) {
            module.exports.suggestion = suggestion
            module.exports.username = username
            module.exports.id = id
            await interaction.reply('your suggestion was succesfully posted :)');
        }
        else {
            await interaction.reply('oh no! Looks like your discord account has been banned please conntact our support!')
        }


    },
};