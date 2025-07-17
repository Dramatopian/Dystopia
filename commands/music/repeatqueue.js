const { SlashCommandBuilder } = require('discord.js');
const { repeatFlags } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeatqueue')
		.setDescription('Toggle repeating the music queue.'),
	async execute(interaction) {
		const current = repeatFlags.get(interaction.guildId) ?? false;
		repeatFlags.set(interaction.guildId, !current);
		await interaction.reply(`Repeat queue is now ${!current ? 'enabled' : 'disabled'}.`);
	}
};
