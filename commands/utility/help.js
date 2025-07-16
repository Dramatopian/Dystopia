const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List all available commands by category'),

	async execute(interaction) {
		const categories = {};

		for (const [name, command] of interaction.client.commands) {
			const folder = path.basename(path.dirname(require.resolve(`./${command.data.name}.js`)));
			if (!categories[folder]) {
				categories[folder] = [];
			}
			categories[folder].push(`</${command.data.name}:${command.data.name}> - ${command.data.description}`);
		}

		const embed = new EmbedBuilder()
			.setTitle('🛠 Help Menu')
			.setDescription('Here are all available commands grouped by category:')
			.setColor(0x00AE86);

		for (const [category, commands] of Object.entries(categories)) {
			const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
			embed.addFields({ name: `📁 ${capitalized}`, value: commands.join('\n') });
		}

		await interaction.reply({ embeds: [embed], ephemeral: true });
	}
};