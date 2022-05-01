const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Use this command to create your account!')
        .addStringOption(option =>
            option.setName('password')
            .setDescription('You need to create password to edit danger zone')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
            .setDescription('How should we call you?')
            .setRequired(true)),
    async execute(interaction) {
        const profileData = await profileModel.findOne({ userID: interaction.user.id });
        const pfp = interaction.user.displayAvatarURL()
        const username = interaction.options.getString('username')
        const password = interaction.options.getString('password')
        let user;
        try{
            user = data.username
        }catch{
            user = interaction.user.tag
        }
        var done;
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('yes')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('no')
                .setLabel('Decline')
                .setStyle('DANGER'),
            );
            const allow = new MessageEmbed()
            .setColor('#8bc34a')
            .setTitle(`Welcome`)
            .setDescription(`Hey nice to meet you **${username}**!`)
            .setThumbnail('https://i.imgur.com/iqPeFux.png')
            .setTimestamp()
            .setAuthor({ name: user, iconURL: pfp})

            const decline = new MessageEmbed()
            .setColor('#d50000')
            .setTitle(`Declined`)
            .setDescription(`${user}! Process to create your account has been stopped!`)
            .setThumbnail('https://i.imgur.com/iqPeFux.png')
            .setTimestamp()
            .setAuthor({ name: user, iconURL: pfp})

        const idBan = interaction.user.id
        const bannedModel = require('../models/bannedSchema')
        var bannedData = await bannedModel.findOne({ userID: idBan });

        if (!bannedData) {
            try {
                
                if (!profileData) {
                    const embed = new MessageEmbed()
                            .setColor('#fdd835')
                            .setTitle(`Login`)
                            .setDescription(`In order to create account you need to accept ELUA first! (If you want to reed EULA you can use "/help" command :) )`)
                            .setThumbnail('https://i.imgur.com/iqPeFux.png')
                            .setTimestamp()
                            .setAuthor({ name: user, iconURL: pfp})
                    
                    await interaction.reply({embeds: [embed], components: [row]})
                    

                    const collector = interaction.channel.createMessageComponentCollector({
                        componentType: 'BUTTON',
                        time: 15000
                    });
            
                    collector.on('collect', async i => {
                        if (i.user.id === interaction.user.id) {
                            if (i.customId === 'yes') {
                                let profile = await profileModel.create({
                                    userID: interaction.user.id,
                                    serverID: interaction.guild.id,
                                    moons: 100,
                                    suns: 10,
                                    energy: 30,
                                    specialMessage: 'false',
                                    stringSpecialMessage: 'none / error',
                                    version: 1,
                                    password: password,
                                    username: username,
                                    deleted: 'false',
                                });
                                profile.save();
                                await i.update({ embeds: [allow], components: []});
                                done = true
                            }
                            else if(i.customId === 'no'){
                                await i.update({ embeds: [decline], components: [] });
                                done = true
                            }
                        } else {
                            i.reply({
                                content: `These buttons aren't for you!`,
                                ephemeral: true
                            });
                        }
                    });
                    collector.on('end',async collected => {
                        if(done == true){
                            return
                        }else{
                            await interaction.channel.send({ embeds: [decline], components: [] });
                        }
                    });
                } else {
                    await interaction.reply('You alredy have an account')
                }
            } catch (err) {
                console.log(err)
            }
        }
        else {
            await interaction.reply('oh no! Looks like your discord account has been banned please conntact our support!')
        }


    },
};