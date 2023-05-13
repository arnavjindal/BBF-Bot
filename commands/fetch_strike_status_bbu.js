const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const { bbu_manager_role_id } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch_strike_status_bbu')
		.setDescription('Fetch the status of who has how many strikes!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('For whom would you like to fetch details?')),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bbu_manager_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only Managers can Execute This');
		}
		let operationsCompleted = 0;
		var message_to_send = '';
		const targett = interaction.options.getUser('user');
		async function operation(messagee, files) {
			++operationsCompleted;
			if (operationsCompleted == files.length) {
				const exampleEmbed = {
					color: 0x00FF00,
					title: 'Strike List:',
					description: messagee,
				};

				await interaction.reply({ embeds: [exampleEmbed] });
				// console.log(messagee)

			}
		}

		if (targett) {
			var path_ = `${path.join(__dirname, `../bbu/strike/${targett.id}.json`)}`;
			if (fs.existsSync(path_)) {
				fs.readFile(path_, (err, dataa) => {
					if (err) {console.log(err);}
					var obj = JSON.parse(dataa);
					const exampleEmbed = {
						color: 0x00FF00,
						description: `<@${obj.target_id}> has **${obj.number_of_strikes}** Strike/s`,
					};
					return interaction.reply({ embeds: [exampleEmbed] });

				});
			}
			else {const exampleEmbed = {
				color: 0x00FF00,
				description: 'No Player Found!',
			};
			return interaction.reply({ embeds: [exampleEmbed] });

			}
		}


		else {
			path_ = `${path.join(__dirname, '../bbu/strike/')}`;

			const files = await fs.promises.readdir(path_);
			if (files.length == 0) {return await interaction.reply('Nothing there yet you noob!');}
			for (const file of files) {
				fs.readFile(path.join(path_, file), (err, dataa) => {
					if (err) {console.log(err);}
					var objec = JSON.parse(dataa);
					message_to_send = message_to_send + `<@${objec.target_id}> : ${objec.number_of_strikes}\n`;
					// console.log('i am')
					operation(message_to_send, files);
				});
			}



			// console.log(message_to_send)
			// console.log('here')
		}
	},
};