const { SlashCommandBuilder } = require('discord.js');
const warnings = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delwarn')
		.setDescription('Delete a warning from a user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to delete the warning from')
				.setRequired(true)
		)
		.addIntegerOption(option => 
			option.setName('warnid')
				.setDescription('The ID of the warning to delete')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const warnId = interaction.options.getInteger('warnid');
		if (!warnings.has(target.id)) {
			return interaction.reply({ content: `${target.tag} has no warnings.`, ephemeral: true });
		}
		const userWarnings = warnings.get(target.id);
		const warningIndex = userWarnings.findIndex(w => w.id === warnId);
		if (warningIndex === -1) {
			return interaction.reply({ content: `Warning ID ${warnId} not found for ${target.tag}.`, ephemeral: true });
		}
		userWarnings.splice(warningIndex, 1);
		await interaction.reply({ content: `Warning ID ${warnId} for ${target.tag} has been deleted.` });
	},
};