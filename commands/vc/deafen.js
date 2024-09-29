const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deafen')
		.setDescription('Deafens a user in a voice channel.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to deafen')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Reason for deafening the user')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)) {
			return interaction.reply({ content: "You don't have permission to deafen members.", ephemeral: true });
		}

		if (!target.voice.channel) {
			return interaction.reply({ content: "User is not in a voice channel.", ephemeral: true });
		}

		await target.voice.setDeaf(true);

		if (reason) {
			await interaction.reply({ content: `<@${target.user.id}> has been deafened for the reason: ${reason}.` });
		} else {
			await interaction.reply({ content: `<@${target.user.id}> has been deafened.` });
		}
	},
};
