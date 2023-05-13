const { ActivityType } = require('discord.js');


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Ready!');
		client.user.setStatus('dnd');
		client.user.setActivity('your whereabouts', { type: ActivityType.Watching });	},
};