const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wait')
		.setDescription('wait test'),
	async execute(interaction) {
        function wait(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
          }
		await interaction.reply('ti si pepeka');
        await wait(5000)
        await interaction.channel.send('lol prešlo 5 s')
	},
};