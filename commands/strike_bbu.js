const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const { bbu_manager_role_id } = require('../config.json');
const { bbu_role_id } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('strike_bbu')
		.setDescription('Add a Strike for a BBu Player')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Player liable to strike?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('What is the reason of the strike? Currently this input does nothing...better to leave it blank!')),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bbu_manager_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only Managers can Execute This');
		}

		const targett = interaction.options.getUser('user');
		var path_ = `${path.join(__dirname, `../bbu/strike/${targett.id}.json`)}`;

		const target_member = interaction.guild.members.cache.get(targett.id);
		// if (!member.roles.cache.some(role => role.id == bbu_role_id)) {
		if (!target_member.roles.cache.somes(role => role.id == '1020763951002304593')) {
			return await interaction.reply('You can only strike a GangMate');
		}

		if (fs.existsSync(path_)) {
			fs.readFile(path_, (err, dataa) => {
				if (err) {console.log(err);}
				var obj = JSON.parse(dataa);
				const strikees = obj.number_of_strikes;

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


				if (strikees >= 3) {const exampleEmbed = {
					color: 0x00FF00,
					description: 'Time to take action! Player now has more than 3 Strikes!',
				};
				objj.number_of_strikes++;
				fs.writeFile(path_, JSON.stringify(objj), (err) => {
					if (err) throw err;
				});
				return interaction.reply({ embeds: [exampleEmbed] });}
				else if (strikees === 2) {const exampleEmbed = {
					color: 0x00FF00,
					description: 'Time to take action! Player now has 3 Strikes!',
				};
				objj.number_of_strikes++;
				fs.writeFile(path_, JSON.stringify(objj), (err) => {
					if (err) throw err;
				});
				return interaction.reply({ embeds: [exampleEmbed] });}
				else {
					objj.number_of_strikes++;
					const exampleEmbed = {
						color: 0x00FF00,
						description: `Player now has ${objj.number_of_strikes} Strikes!`,
					};
					fs.writeFile(path_, JSON.stringify(objj), (err) => {
						if (err) throw err;
					});
					return interaction.reply({ embeds: [exampleEmbed] });}

			});
		}
		else {
			const no_of_strikes = 1;
			const reason_ = 'Null';
			let objj = {};
			objj = {
				doer_username: interaction.user.username,
				doer_user_id : interaction.user.id,
				number_of_strikes : no_of_strikes,
				reason : reason_,
				// probation_status: probation,
				doer_nickname: interaction.member.displayName,
				target_username : targett.username,
				target_id : targett.id,
			};
			fs.writeFile(path_, JSON.stringify(objj), (err) => {
				if (err) throw err;
			});
			const exampleEmbed = {
				color: 0x00FF00,
				description: 'Sucess! Player now has 1 Strike!',
			};
			return await interaction.reply({ embeds: [exampleEmbed] });

		}
	},
};