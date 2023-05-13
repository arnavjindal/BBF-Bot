const { Client, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // clinetID is bot ID 
// // guildId is the ID of the server you want commands else you can deploy commands globally.
// // token is the secret key. 


// client.commands = new Collection();
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	client.commands.set(command.data.name, command);
// }


// client.once('ready', () => {
// 	console.log('Ready!');
// 	client.user.setStatus('dnd');
// 	client.user.setActivity('your whereabouts', { type: ActivityType.Watching });

// });


// client.on('interactionCreate', async interaction => {
// 	// console.log(interaction.user.role);
// 	// console.log(interaction.user.username);
// 	// console.log(interaction.user.id);
// 	if (!interaction.isChatInputCommand()) return;

	
// 	// interaction.guild.members.fetch('293762661311709186').then(console.log).catch(console.error);

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// });





const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}




client.login(token);