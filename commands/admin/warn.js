const { SlashCommandBuilder } = require('discord.js');
const warnings = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to warn')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Reason for the warning')
				.setRequired(false)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';

		// Add warning to the map
		if (!warnings.has(target.id)) {
			warnings.set(target.id, []);
		}
		const userWarnings = warnings.get(target.id);
		userWarnings.push({ reason, id: userWarnings.length + 1 });

		await interaction.reply({ content: `${target.tag} has been warned. Reason: ${reason}.` });
	},
};
