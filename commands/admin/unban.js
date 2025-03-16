const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unban a user from the server.')
		.addStringOption(option => 
			option.setName('userid')
				.setDescription('The ID of the user to unban')
				.setRequired(true)
		),
	async execute(interaction) {
		const userId = interaction.options.getString('userid');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply({ content: "You don't have permission to unban members.", ephemeral: true });
		}

		try {
			await interaction.guild.members.unban(userId);
			await interaction.reply({ content: `User with ID ${userId} has been unbanned.` });
		} catch (error) {
			await interaction.reply({ content: `Failed to unban user with ID ${userId}.`, ephemeral: true });
		}
	},
};