const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a user for a specified duration.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to timeout')
				.setRequired(true)
		)
		.addIntegerOption(option => 
			option.setName('duration')
				.setDescription('Duration of timeout in minutes')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const duration = interaction.options.getInteger('duration');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
			return interaction.reply({ content: "You don't have permission to timeout members.", ephemeral: true });
		}

		const timeoutDuration = duration * 60 * 1000;
		await target.timeout(timeoutDuration);
		await interaction.reply({ content: `${target.user.tag} has been timed out for ${duration} minutes.` });
	},
};
