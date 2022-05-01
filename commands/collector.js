const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collector')
        .setDescription('collector test'),
    async execute(interaction) {
        // `m` is a message object that will be passed through the filter function
        await interaction.reply('testing collector...')


        const filter = m => m.content.includes('discord');
        const collector = interaction.channel.createMessageCollector({
            filter,
            time: 15000
        });

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
        });

        collector.on('end', collected => {
            interaction.channel.send(`Collected ${collected.size} items`);
        });
    },
};