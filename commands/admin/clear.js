const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clear a number of messages from the current channel.')
		.addIntegerOption(option => 
			option.setName('amount')
				.setDescription('Number of messages to clear')
				.setRequired(true)
		),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			return interaction.reply({ content: "You don't have permission to manage messages.", ephemeral: true });
		}

		if (amount < 1 || amount > 100) {
			return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
		}

		await interaction.channel.bulkDelete(amount, true);
		await interaction.reply({ content: `Cleared ${amount} messages.`, ephemeral: true });
	},
};
