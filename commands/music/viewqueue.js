const { SlashCommandBuilder } = require('discord.js');
const { queues } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('viewqueue')
		.setDescription('View the current music queue.'),
	async execute(interaction) {
		const queue = queues.get(interaction.guildId);
		if (!queue || queue.length === 0) {
			return interaction.reply({ content: 'The queue is empty.', ephemeral: true });
		}

		const list = queue.map((song, i) => `${i + 1}. ${song.title}`).join('\n');
		await interaction.reply(`Current Queue:\n${list}`);
	}
};
