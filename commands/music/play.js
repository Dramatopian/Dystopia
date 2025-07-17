const { SlashCommandBuilder } = require('discord.js');
const { play } = require('../../music/player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from YouTube.')
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
