const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Provides information about the bot.'),
	async execute(interaction) {
		const timestamp = Math.floor(interaction.createdTimestamp / 1000);

		const embed = new EmbedBuilder()
			.addFields(
				{ name: 'Bot Name', value: interaction.client.user.username },
				{ name: 'Bot Owner', value: '<@620229764996923402>' },
				{ name: 'No. of Servers', value: interaction.client.guilds.cache.size.toString() },
				{ name: 'Uptime', value: interaction.client.uptime.toString() },
				{ name: 'Last Updated', value: `<t:${timestamp}:F>` }
			)
			.setColor('Grey');

		await interaction.reply({ embeds: [embed] });
	},
};