const { SlashCommandBuilder } = require('discord.js');
const { owner_ids, owner_ids1 } = require('../config.json');
var JSONbig = require('json-bigint');
const fs = require('node:fs');
const path = require('node:path');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Only for testing purposes....')
        .addIntegerOption(option =>
			option.setName('number')
				.setDescription('How Many messages you wanna purge?')
				.setRequired(true)),
	async execute(interaction) {

        var file = '../config.json'
        var path_ = path.join(__dirname, file);
        var ids = []

		async function operation() {
        if (ids.includes(interaction.user.id)){
            const messages_size = interaction.options.getInteger('number');
            await interaction.channel.bulkDelete(messages_size)
            console.log(`Bulk deleted ${messages_size} messages`)
            await interaction.reply({content: 'Roger that!', ephemeral: true});}
            
        else await interaction.reply({content: 'Are you Sure can access this Command :P?', ephemeral: true});}

        fs.readFile(path_, (err, dataa) => {
            if (err) {console.log(err);}
            var listt = JSONbig.parse(dataa);
            ids = listt.owner_ids.toString()

            operation()

        })
	},
};