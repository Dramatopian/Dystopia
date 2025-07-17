const { SlashCommandBuilder } = require('discord.js');
const { play } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Add a song to the queue.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('Song name or URL')
				.setRequired(true)
		),
	async execute(interaction) {
		const query = interaction.options.getString('query');
		await play(interaction, query);
	}
};
