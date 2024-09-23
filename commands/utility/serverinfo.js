const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Provides information about the server.'),
		async execute(interaction) {
			const timestamp = Math.floor(interaction.createdTimestamp / 1000);
			
			await interaction.reply(
				`Server Name: ${interaction.guild.name}\n` +
				`Member Count: ${interaction.guild.memberCount}\n` +
				`Owner: <@${interaction.guild.ownerId}>\n` + 
				`Requested By: <@${interaction.user}\n` +
				`Last Updated: <t:${timestamp}:F>`
			);
		},
};