const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Description for every Command!'),
	async execute(interaction) {
        const exampleEmbed = {
			color: 0x0000FF, // green color
            title: 'Command List:',
            fields: [
                {
                    name: 'Strike_bba',
                    value: 'Add a Strike for a BBa Player',
                },
                {
                    name: 'Strike_bbu',
                    value: 'For a BBu Player',
                    inline: true,
                },
                {
                    name: 'Fetch_strike_status_bba',
                    value: 'Fetch the status of who has how many strikes for bba!',
                    inline: false,
                },
                {
                    name: 'Fetch_strike_status_bbu',
                    value: 'For bbu',
                    inline: true,
                },
                {
                    name: 'Clear_strike_bba',
                    value: 'Removes a Strike from a bba Player',
                    inline: false,
                },
                {
                    name: 'Clear_strike_bbu',
                    value: 'From bbu player',
                    inline: true,
                },
                {
                    name: 'Ckupdatebba',
                    value: 'Updates CK status for a bba player',
                    inline: false,
                },
                {
                    name: 'Ckupdatebbu',
                    value: 'For a bbu player',
                    inline: true,
                },
                {
                    name: 'Fetch_ck_bba',
                    value: 'Know who has got builds placed in bba!',
                    inline: false,
                },
                {
                    name: 'fetch_ck_bbu',
                    value: 'For bbu',
                    inline: true,
                },
                {
                    name: 'Purge',
                    value: 'Only meant to be used in development!',
                    inline: false,
                },
                {
                    name: 'Reset_ck_bba',
                    value: 'Resets All the info entered during the CK for bba!',
                    inline: false,
                },
                {
                    name: 'Reset_ck_bbu',
                    value: 'For bbu',
                    inline: true,
                },
                {
                    name: 'Ping',
                    value: 'Check the latency with the sever!',
                    inline: false,
                },
                {
                    name: 'About',
                    value: 'Know about the bot!',
                    inline: false,
                },
            ],
		};
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};