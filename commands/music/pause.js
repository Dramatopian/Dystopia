const { SlashCommandBuilder } = require('discord.js');
const { queues } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the current song.'),
	async execute(interaction) {
		const queue = queues.get(interaction.guildId);
		if (!queue || !queue.connection) {
			return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });
		}

		const subscription = queue.connection.state.subscription;
		if (subscription && subscription.player) {
			subscription.player.pause();
			await interaction.reply('Playback paused.');
		} else {
			await interaction.reply({ content: 'No active player found.', ephemeral: true });
		}
	}
};
