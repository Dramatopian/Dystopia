const { SlashCommandBuilder } = require('discord.js');
const { queues, playNext } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song.'),
	async execute(interaction) {
		const queue = queues.get(interaction.guildId);
		if (!queue) return interaction.reply({ content: 'There is no song playing.', ephemeral: true });

		playNext(interaction.guildId);
		await interaction.reply('Skipped the current song.');
	}
};
