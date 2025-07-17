const { createAudioPlayer, createAudioResource, entersState, AudioPlayerStatus, joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queues = new Map();
const repeatFlags = new Map();

async function playNext(guildId) {
	const queue = queues.get(guildId);
	if (!queue || queue.length === 0) return;

	const { connection, textChannel } = queue;
	const song = queue.shift();

	const stream = ytdl(song.url, { filter: 'audioonly' });
	const resource = createAudioResource(stream);
	const player = createAudioPlayer();

	connection.subscribe(player);
	player.play(resource);

	player.on(AudioPlayerStatus.Idle, () => {
		if (repeatFlags.get(guildId)) queue.push(song);
		playNext(guildId);
	});

	player.on('error', error => console.error('Audio player error:', error));

	textChannel.send(`Now playing: **${song.title}**`);
}

async function play(interaction, query) {
	const vc = interaction.member.voice.channel;
	if (!vc) return interaction.reply({ content: 'You must be in a voice channel.', ephemeral: true });

	const results = await ytSearch(query);
	const video = results.videos.length > 0 ? results.videos[0] : null;

	if (!video) return interaction.reply({ content: 'No results found.', ephemeral: true });

	let queue = queues.get(interaction.guildId);
	if (!queue) {
		const connection = joinVoiceChannel({
			channelId: vc.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});
		await entersState(connection, VoiceConnectionStatus.Ready, 20_000);

		queue = { connection, textChannel: interaction.channel, songs: [] };
		queues.set(interaction.guildId, queue);
	}

	queue.push({ title: video.title, url: video.url });
	if (queue.length === 1) {
		playNext(interaction.guildId);
	}

	await interaction.reply(`Added to queue: **${video.title}**`);
}

module.exports = {
	queues,
	repeatFlags,
	play,
	playNext,
};
