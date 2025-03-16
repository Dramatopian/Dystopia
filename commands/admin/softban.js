const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('softban')
		.setDescription('Softban a user (ban and immediately unban to delete all messages).')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to softban')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Reason for the softban')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';
		const member = interaction.guild.members.cache.get(target.id);n
		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply({ content: "You don't have permission to ban members.", ephemeral: true });
		}
		if (!member.bannable) {
			return interaction.reply({ content: `I can't softban ${target.tag}.`, ephemeral: true });
		}
		await interaction.guild.members.ban(target.id, { days: 7, reason });
		await interaction.guild.members.unban(target.id);
		await interaction.reply({ content: `${target.tag} has been softbanned. Their messages have been deleted from all channels.` });
	},
};