const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const warnings = new Map(); // Assuming you're using the same warnings Map as in the warn command.

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Displays information about a user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to get information about')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const member = await interaction.guild.members.fetch(target.id);
		const accountCreationDate = Math.floor(target.createdTimestamp / 1000);
		const joinedDate = Math.floor(member.joinedTimestamp / 1000);

		const embed = new EmbedBuilder()
			.setTitle(`${target.tag}'s Information`)
			.setThumbnail(target.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Discord ID', value: target.id, inline: true },
				{ name: 'Account Created', value: `<t:${accountCreationDate}:F> (<t:${accountCreationDate}:R>)`, inline: true },
				{ name: 'Joined Server', value: `<t:${joinedDate}:F> (<t:${joinedDate}:R>)`, inline: true },
			)
			.setColor('Blue');

		await interaction.reply({ embeds: [embed] });
	},
};