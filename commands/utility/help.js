const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays information for each command'),
    
    async execute(interaction) {

        const commandFolders = fs.readdirSync(path.join(__dirname, '..'));
        const buttons = [];
        for (const folder of commandFolders) {
            const commandsPath = path.join(__dirname, `../${folder}`);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(path.join(commandsPath, file));
                if ('data' in command) {
                    buttons.push(new ButtonBuilder()
                        .setCustomId(command.data.name)
                        .setLabel(`/${command.data.name}`)
                        .setStyle(ButtonStyle.Primary)
                    );
                }
            }
        }
        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            const row = new ActionRowBuilder().addComponents(buttons.slice(i, i + 5));
            rows.push(row);
        }

        await interaction.reply({
            content: 'Here are the available commands:',
            components: rows,
        });
    },
};
