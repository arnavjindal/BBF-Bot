const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { bbf_family_role_id } = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch_ck_bba')
		.setDescription('know who has got builds placed!'),
	async execute(interaction) {

		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bbf_family_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only BBF Family can Execute This');
		}

		var path_ = path.join(__dirname, '../bba/');
		// var message1 = '__**Player	|	Buildings	|	Free/Repairing Builds:**__\n\n';
		// var message2 = '__**Building		|		Players:**__\n\n';
		var buildings_list = [];
		var building1_players = { building_name : '', players : [] };
		var building2_players = { building_name : '', players : [] };
		var building3_players = { building_name : '', players : [] };
		var building4_players = { building_name : '', players : [] };
		var building5_players = { building_name : '', players : [] };
		var building6_players = { building_name : '', players : [] };
		var message1_nickname_list = '';
		var message1_number_of_freebuilds_list_orderwise = '';
		var message1_building_list_orderwise = '';
		var message2_building_list_orderwise = '';
		var message2_nickname_list = '';




		var operationsCompleted = 0;

		async function getsomeshit_done() {
			await interaction.reply('there are more than 6 types of building... which is impossible\nOr dumb ass dev made a mistake in code..apologies in advance.');

		}

		async function operation() {
			++operationsCompleted;
			if (operationsCompleted == jsonFiles.length) {
				// await interaction.reply(message1);
				const Message1_embed = {
					color: 0x0099ff,
					title: 'CK Stats',
					fields: [
						{
							name: 'Player',
							value: `${message1_nickname_list}`,
							inline: true,
						},
						{
							name: 'Building',
							value: `${message1_building_list_orderwise}`,
							inline: true,
						},
						{
							name: 'Free/Repairing Builds',
							value: `${message1_number_of_freebuilds_list_orderwise}`,
							inline: true,
						},
					],
				};
				await interaction.reply({ embeds: [Message1_embed] });

				for (const i of buildings_list) {
					if (building1_players.building_name == i) {
						// message2 += `${i}	**|**	${building1_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building1_players.players}\n`;

					}
					if (building2_players.building_name == i) {
						// message2 += `${i}	**|**	${building2_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building2_players.players}\n`;
					}
					if (building3_players.building_name == i) {
						// message2 += `${i}	**|**	${building3_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building3_players.players}\n`;
					}
					if (building4_players.building_name == i) {
						// message2 += `${i}	**|**	${building4_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building4_players.players}\n`;
					}
					if (building5_players.building_name == i) {
						// message2 += `${i}	**|**	${building5_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building5_players.players}\n`;
					}
					if (building6_players.building_name == i) {
						// message2 += `${i}	**|**	${building6_players.players}\n`;
						message2_nickname_list += `${i}\n`;
						message2_building_list_orderwise += `${building6_players.players}\n`;
					}
				}
				const Message2_embed = {
					color: 0x0099ff,
					fields: [
						{
							name: 'Building',
							value: `${message2_nickname_list}`,
							inline: true,
						},
						{
							name: 'Player',
							value: `${message2_building_list_orderwise}`,
							inline: true,
						},
					],
					timestamp: new Date().toISOString(),
				};
				await interaction.followUp({ embeds: [Message2_embed] });
				// await interaction.followUp(message2);
			}}

		const files = await fs.promises.readdir(path_);
		if (files.length == 1) {return await interaction.reply('Nothing there yet you noob!');}
		const jsonFiles = files.filter(el => path.extname(el) === '.json');
		for (const file of jsonFiles) {
			fs.readFile(path.join(path_, file), (err, dataa) => {
				if (err) {console.log(err);}
				var obj = JSON.parse(dataa);
				// message1 = message1 + `${obj.nickname}	**|**	${obj.buildings}	**|**	${obj.free_builds}\n`;
				message1_nickname_list += `${obj.nickname}\n`;
				message1_building_list_orderwise += `${obj.buildings}\n`;
				message1_number_of_freebuilds_list_orderwise += `${obj.free_builds}\n`;
				for (const i of obj.buildings) {
					if (!buildings_list.includes(i)) {
						buildings_list.push(i);
					}

					if (building1_players.building_name == i) {
						building1_players.players.push(obj.nickname);
					}
					else if (!building1_players.building_name) {
						building1_players.building_name = i ;
						building1_players.players.push(obj.nickname);
					}
					else if (building2_players.building_name == i) {
						building2_players.players.push(obj.nickname);
					}
					else if (!building2_players.building_name) {
						building2_players.building_name = i ;
						building2_players.players.push(obj.nickname);
					}
					else if (building3_players.building_name == i) {
						building3_players.players.push(obj.nickname);
					}
					else if (!building3_players.building_name) {
						building3_players.building_name = i ;
						building3_players.players.push(obj.nickname);
					}
					else if (building4_players.building_name == i) {
						building4_players.players.push(obj.nickname);
					}
					else if (!building4_players.building_name) {
						building4_players.building_name = i ;
						building4_players.players.push(obj.nickname);
					}
					else if (building5_players.building_name == i) {
						building5_players.players.push(obj.nickname);
					}
					else if (!building5_players.building_name) {
						building5_players.building_name = i ;
						building5_players.players.push(obj.nickname);
					}
					else if (building6_players.building_name == i) {
						building6_players.players.push(obj.nickname);
					}
					else if (!building6_players.building_name) {
						building6_players.building_name = i ;
						building6_players.players.push(obj.nickname);
					}
					else {getsomeshit_done();}
				}

				operation();
			});}
	},
};