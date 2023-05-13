const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const { bbu_manager_role_id } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear_strike_bbu')
		.setDescription('Removes a Strike from a Player')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Player liable to strike?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('reason for removal of strike? Use it when you wanna kick someone.PS: For now this input does nothing')
				.addChoices(
					{ name: 'Kick This Player', value: 'kick' },
				)),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bbu_manager_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only Managers can Execute This');
		}

		const targett = interaction.options.getUser('user');
		const reason_input = interaction.options.getString('reason');
		var path_ = `${path.join(__dirname, `../bbu/strike/${targett.id}.json`)}`;

		if (reason_input == 'kick') {
			if (fs.existsSync(path_)) {
				fs.unlink(path_, err => {
					if (err) throw err;
				});
				const exampleEmbed = {
					color: 0x00FF00,
					description: 'Success!',
				};
				return await interaction.reply({ embeds: [exampleEmbed] });
			}
			else {
				const exampleEmbed = {
					color: 0x00FF00,
					description: 'Are you sure files for this player exist? because they don\'t!',
				};
				return await interaction.reply({ embeds: [exampleEmbed] });

			}
		}

		if (fs.existsSync(path_)) {
			fs.readFile(path_, (err, dataa) => {
				if (err) {console.log(err);}
				var obj = JSON.parse(dataa);

				var objj = {
					doer_username: obj.doer_username,
					doer_user_id : obj.doer_user_id,
					number_of_strikes : obj.number_of_strikes,
					reason : obj.reason,
					// probation_status: probation,
					doer_nickname: obj.doer_nickname,
					target_username: obj.target_username,
					target_id: obj.target_id,
				};
				if (obj.number_of_strikes === 0) {
					const exampleEmbed = {
						color: 0x00FF00,
						description: 'Are you baka? there are 0 Strikes for the Player\n Are you tryna do underflow? xD',
					};
					return interaction.reply({ embeds: [exampleEmbed] });}
				objj.number_of_strikes--;
				const exampleEmbed = {
					color: 0x00FF00,
					description: `Player now has ${objj.number_of_strikes} Strike/s!`,
				};
				fs.writeFile(path_, JSON.stringify(objj), (err) => {
					if (err) throw err;
				});
				return interaction.reply({ embeds: [exampleEmbed] });

			});
		}
		else {
			const exampleEmbed = {
				color: 0x00FF00,
				description: 'Are you baka? there are 0 Strikes for the Player\n Are you tryna do underflow? xD',
			};
			await interaction.reply({ embeds: [exampleEmbed] });

		}
	},
};