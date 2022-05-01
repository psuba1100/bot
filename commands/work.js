const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('pracuj'),
	async execute(interaction) {
		const profileModel = require('../models/profileSchema')
		const rn = Math.floor(Math.random() * 200) + 1;
		const data = await profileModel.findOne({ userID: interaction.user.id });
		const pfp = interaction.user.displayAvatarURL()
		let user;
        try{
            user = data.username
        }catch{
            user = interaction.user.tag
        }
		const idBan = interaction.user.id
		const bannedModel = require('../models/bannedSchema')
		var bannedData = await bannedModel.findOne({ userID: idBan });
		const error = new MessageEmbed()
		.setColor('#d50000')
		.setAuthor({ name: user, iconURL: pfp})
		.setTitle('Oh no! I see an error on the horizon!')
		.setDescription("Looks like you don't have an account. Please use `/login`. If you need list of commands or support, feel free to use `/help`.")
		.setTimestamp()
		let energy;

		if(rn < 100 && rn > 10 ){
			energy = 10
		}
		else if(rn < 200 && rn > 100){
			energy = 20
		}

		if (!bannedData) {
				if (!data) {
					await interaction.reply({embeds: [error]})
				} else {
					if (data.energy >= energy){
						const d = await profileModel.findOneAndUpdate({
							userID: interaction.user.id
						}, {
							$inc: {
								moons: rn,
								energy: -energy
							}
						}
						)
						await interaction.reply(`${interaction.user.username}, pracoval si, stálo ťa to ${energy} **enrgie** a získal si ${rn} **moonov**`)
					}
					else{
						await interaction.reply('Oh no! Looks like you dont have enought energy!')
					}
					

				}

			
		}

	},
};