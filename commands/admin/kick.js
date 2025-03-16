const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user from the server.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to kick')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Reason for the kick')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';
		const member = interaction.guild.members.cache.get(target.id);
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
			return interaction.reply({ content: "You don't have permission to kick members.", ephemeral: true });
		}
		if (!member.kickable) {
			return interaction.reply({ content: `I can't kick ${target.tag}.`, ephemeral: true });
		}
		await member.kick(reason);
		await interaction.reply({ content: `${target.tag} has been kicked for: ${reason}.` });
	},
};