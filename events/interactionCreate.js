const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });



module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		client.commands = new Collection();
		const commandsPath = path.join(path.join(__dirname, '../', 'commands'));
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			client.commands.set(command.data.name, command);
		}

		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        	// console.log(interaction.user.role);
	    // console.log(interaction.user.username);
	    // console.log(interaction.user.id);
	    if (!interaction.isChatInputCommand()) return;


	    const command = client.commands.get(interaction.commandName);

	    if (!command) return;

	    try {
		await command.execute(interaction);
	    } catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	},
};