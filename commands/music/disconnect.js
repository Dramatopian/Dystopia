const { SlashCommandBuilder } = require('discord.js');
const { queues, repeatFlags } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnect the bot and clear the queue.'),
	async execute(interaction) {
		const queue = queues.get(interaction.guildId);
		if (!queue) return interaction.reply({ content: 'Bot is not in a voice channel.', ephemeral: true });

		queue.connection.destroy();
		queues.delete(interaction.guildId);
		repeatFlags.delete(interaction.guildId);

		await interaction.reply('Bot disconnected and queue cleared.');
	}
};
