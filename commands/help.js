const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Looks like you are stucked in day-night cycle! I will help you out.'),
	async execute(interaction) {
        const profileModel = require('../models/profileSchema')
        const data = await profileModel.findOne({ userID: interaction.user.id });

        const pfp = interaction.user.displayAvatarURL()
        let user;
        try{
            user = data.username
        }catch{
            user = interaction.user.tag
        }
		const embed = new MessageEmbed()
        .setColor('#fdd835')
        .setTitle('Help menu')
        .setAuthor({ name: 'Until Sunrise', iconURL: 'https://i.imgur.com/iqPeFux.png'})
        .setDescription("Hey! I am until sunrise bot. I am cool text rpg based on game Until Sunrise which was never released :cry: I really miss my friend however, if you want to do some cool stuff and you want to know how you can check list of commands! My prefix is `/`!")
        .addFields(
            { name: 'You are maybe looking for one of these things:', value: `\n \n [EULA](https://discord.com/404 'end-user license agreement') \n [Commands](https://discord.com/404 'Do you really want to know everything?') \n [Support](https://discord.com/404 'I am so sad because i can not help you out.') \n [About](https://discord.com/404 'I am glad because you want to know more about me :) .')`},
        )
        .setTimestamp()
        .setAuthor({ name: user, iconURL: pfp})
        .setFooter({ text: `Until sunrise 2022 ${interaction.user.tag}`, iconURL: pfp });



        await interaction.reply({
            embeds: [embed]
        })
    }
};