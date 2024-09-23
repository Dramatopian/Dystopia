const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Provides information about the bot.'),
	async execute(interaction) {
		const timestamp = Math.floor(interaction.createdTimestamp / 1000);

		await interaction.reply(
			`Bot Name: ${interaction.client.user.username}\n` +
			`Bot Owner: <@620229764996923402>\n` + 
			`No. of Servers: ${interaction.client.guilds.cache.size}\n` +
			`Uptime: ${interaction.client.uptime}\n` +
			`Last Updated: <t:${timestamp}:F>`
		);
	},
};