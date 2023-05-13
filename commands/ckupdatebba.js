const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { bba_role_id } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ckupdatebba')
		.setDescription('Updates CK status')
		.addIntegerOption(option =>
			option.setName('heals')
				.setDescription('How Many heals do you have left?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('building1')
				.setDescription('Where is your build 1 placed?')
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('building2')
				.setDescription('Where is your build 2 placed?')
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('building3')
				.setDescription('Where is your build 3 placed?')
				.setRequired(false),
		),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
		// if (!member.roles.cache.some(role => role.id == bba_role_id)) {
		if (!member.roles.cache.some(role => role.id == '1020763951002304593')) {
			return await interaction.reply('Only Gang Members can Execute This');
		}

		const healss = interaction.options.getInteger('heals');
		const Account_name_alt = interaction.options.getString('accountname');
		const build1 = interaction.options.getString('building1');
		const build2 = interaction.options.getString('building2');
		const build3 = interaction.options.getString('building3');

		var freebuild = 0;
		let db_username_tobeupdated = interaction.user.username;
		if (!build3) {
			freebuild = freebuild + 1;}
		if (!build2) {
			freebuild = freebuild + 1;}
		if (!build1) {
			freebuild = freebuild + 1;}

		if (Account_name_alt) {
			db_username_tobeupdated = Account_name_alt;
		}
		var buildings_occupied = [];

		if (build1 != null) buildings_occupied.push(build1.toUpperCase());
		if (build2 != null) buildings_occupied.push(build2.toUpperCase());
		if (build3 != null) buildings_occupied.push(build3.toUpperCase());

		let objj = {};
		objj = {
			username: db_username_tobeupdated,
			buildings: buildings_occupied,
			user_id : interaction.user.id,
			heals_left : healss,
			free_builds: freebuild,
			nickname: interaction.member.displayName,

		};
		var path_ = `${path.join(__dirname, `../bba/${interaction.user.id}.json`)}`;

		if (fs.existsSync(path_))
		{
			fs.unlink(path_, (err) => {
				if (err) {console.log(err);}});
		}

		fs.writeFile(path_, JSON.stringify(objj), (err) => {
			if (err) throw err;
		});


		const exampleEmbed = {
			color: 0x00FF00,
			description: `Updated!\n\nFree/Repairing builds: ${freebuild}`,
		};
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};