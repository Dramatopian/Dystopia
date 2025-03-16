const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmutes a user in a voice channel.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to unmute')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for unmuting the user')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
			return interaction.reply({ content: "You don't have permission to unmute members.", ephemeral: true });
		}

		if (!target.voice.channel) {
			return interaction.reply({ content: "User is not in a voice channel.", ephemeral: true });
		}

		await target.voice.setMute(false);

		if (reason) {
			await interaction.reply({ content: `<@${target.user.id}> has been unmuted for the reason: ${reason}.` });
		} else {
			await interaction.reply({ content: `<@${target.user.id}> has been unmuted.` });
		}
	},
};
