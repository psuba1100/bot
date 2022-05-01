const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageActionRow,
    MessageButton,
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('test buttons using this command'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('secondary')
                .setLabel('Secondary')
                .setStyle('SECONDARY'),
                new MessageButton()
                .setCustomId('success')
                .setLabel('Success')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('danger')
                .setLabel('Danger')
                .setStyle('DANGER'),
                new MessageButton()
                .setLabel('Link')
                .setStyle('LINK')
                .setURL('http://simonstudios.ga/'),
            );


        const embed1 = new MessageEmbed()
            .setColor('#fdd835')
            .setTitle('Calculation')
            .setURL('http://simonstudios.ga/')
            .setDescription(`tgucv `);
        //`Calculation ${n} + ${n1} by ${a}`
        //.setAuthor({ name: user, iconURL: pfp})({text: }); 

        await interaction.reply({
            embeds: [embed1],
            components: [row]
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 15000
        });

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if (i.customId === 'primary') {
                    await i.update({ content: 'A button was clicked!', components: [], embeds: [] });
                }
            } else {
                i.reply({
                    content: `These buttons aren't for you!`,
                    ephemeral: true
                });
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};