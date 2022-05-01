const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('You can travel anywhere you want!'),
	async execute(interaction) {
        const data = await profileModel.findOne({ userID: interaction.user.id });
        const pfp = interaction.user.displayAvatarURL()
        var done = false;
        let user;
        try{
            user = data.username
        }catch{
            user = interaction.user.tag
        }
        const embed = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle('Map')
            .setAuthor({ name: user, iconURL: pfp})
            .setDescription('Send message with name of place in which you want to travel!')
            .setImage('https://i.imgur.com/z5z3uF5.png')
            .setTimestamp()

        const error = new MessageEmbed()
            .setColor('#d50000')
            .setAuthor({ name: user, iconURL: pfp})
            .setTitle('Oh no! I see an error on the horizon!')
            .setDescription("Looks like you don't have an account. Please use `/login`. If you need list of commands or support, feel free to use `/help`.")
            .setTimestamp()
        
        if(!data){
            await interaction.reply({embeds: [error]})
        }
        else{
            await interaction.reply({embeds: [embed]})
            const collector = interaction.channel.createMessageCollector({
                time: 15000
            });
    
            collector.on('collect', async m => {
                if(m.author == interaction.user.id){
                    if(m.content == 'Grocery store'){
                        if(done == false){
                            done = true
                            await interaction.channel.send('UwU')
                        }
                        else if(done == true){
                            return
                        }
                        else{
                            await interaction.channel.send(':warning:')
                        }
                    }
                    else if(m.content == 'Town hall'){
                        await interaction.channel.send('OvO')
                    }
                    else{
                        await interaction.channel.send('Error! Unknow operation')
                    }
                }
                console.log(`Collected ${m.content}`);
            });
    
            collector.on('end', collected => {
                interaction.channel.send(`Collected ${collected.size} items`);
            });
        }
	},
};