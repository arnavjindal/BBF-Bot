const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Know about the bot!'),
	async execute(interaction) {
		data = 0;


		const exampleEmbed = new EmbedBuilder()
		// .setColor(0x0099FF)
		.setColor('Random')
		.setTitle('About')
		.setFooter({ text: `Made with 💖 with discord.js` });
		interaction.reply({ embeds: [exampleEmbed] });

	},
};