const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Displays information about the server.'),
	async execute(interaction) {
		const timestamp = Math.floor(interaction.createdTimestamp / 1000);

		const embed = new EmbedBuilder()
			.setTitle(`${interaction.guild.name} Information`)
			.addFields(
				{ name: 'Server Name', value: interaction.guild.name, inline: true },
				{ name: 'Member Count', value: interaction.guild.memberCount.toString(), inline: true },
				{ name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true },
				{ name: 'Last Updated', value: `<t:${timestamp}:F>`, inline: false }
			)
			.setColor('Blue');

		await interaction.reply({ embeds: [embed] });
	},
};