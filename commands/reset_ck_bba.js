const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('path');
const { bba_manager_role_id } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset_ck_bba')
		.setDescription('resets status for the CK'),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bba_manager_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only Managers can Execute This');
		}

		var path_ = path.join(__dirname, '../bba/');
		var path_strike = path.join(__dirname, '../bba/strike/');
		let message_to = '';
		var counter = 0;

		async function operation(messagee,filee) {
			counter++
			if (counter == filee){
			const exampleEmbed = {
				color: 0x00FF00,
				title: 'Players who got Strike!',
				description: messagee,
			};
			await interaction.reply({ embeds: [exampleEmbed] });
		}
		}

		fs.readdir(path_, (err, files) => {
			if (err)
				throw err;
			const jsonFiles = files.filter(el => path.extname(el) === '.json');
			fs.readdir(path_strike, (err, files__) => {
				if (err)
					throw err;
				for (const file of files__) {
					if (!(jsonFiles.includes(file))) {


						fs.readFile(path.join(path_strike, file), (err, dataa) => {
							if (err) { console.log(err); }
							var obj = JSON.parse(dataa);
							const strikees = obj.number_of_strikes;

							var objj = {
								doer_username: obj.doer_username,
								doer_user_id: obj.doer_user_id,
								number_of_strikes: obj.number_of_strikes,
								reason: obj.reason,
								// probation_status: probation,
								doer_nickname: obj.doer_nickname,
								target_username: obj.target_username,
								target_id: obj.target_id,
							};

							if (strikees >= 3) {
								message_to += `<@${objj.target_id}> got a Strike. Time to take action! Player now has more than 3 Strikes!`;
								objj.number_of_strikes++;
							}
							else if (strikees === 2) {
								message_to += `<@${objj.target_id}> got a Strike. Time to take action! Player now has 3 Strikes!`;
								objj.number_of_strikes++;
							}
							else {
								objj.number_of_strikes++;
								message_to += `<@${objj.target_id}> got a Strike. Player now has ${objj.number_of_strikes} Strikes!`;
							}
							fs.writeFile(path.join(path_strike, file), JSON.stringify(objj), (err) => {
								if (err)
									throw err;
							});
							operation(message_to,files__.length - jsonFiles.length)

						});

					}

				}

			});

			for (const file of jsonFiles) {
				fs.unlink(path.join(path_, file), err => {
					if (err)
						throw err;
				});
			}
		});
		// const exampleEmbed = {
		// 	color: 0x00FF00, // green color
		// 	description: 'Done!',
		// };
		// await interaction.followUp({ embeds: [exampleEmbed] });
	//// NO NEED OF CONFIRMATION MESSAGE.
	},
};