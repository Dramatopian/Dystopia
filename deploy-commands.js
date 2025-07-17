require('dotenv').config();
const { REST, Routes } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const ownerId = process.env.OWNER_ID;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

function loadCommands(dir) {
	const files = fs.readdirSync(dir, { withFileTypes: true });

	for (const file of files) {
		const fullPath = path.join(dir, file.name);

		if (file.isDirectory()) {
			loadCommands(fullPath);
		} else if (file.isFile() && file.name.endsWith('.js')) {
			const command = require(fullPath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${fullPath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}

loadCommands(path.join(__dirname, 'commands'));

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
