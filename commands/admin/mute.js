const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a user in a voice channel.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to mute')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getMember('target');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
			return interaction.reply({ content: "You don't have permission to mute members.", ephemeral: true });
		}

		if (!target.voice.channel) {
			return interaction.reply({ content: "User is not in a voice channel.", ephemeral: true });
		}

		await target.voice.setMute(true);
		await interaction.reply({ content: `${target.user.tag} has been muted.` });
	},
};
