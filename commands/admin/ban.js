const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user from the server.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to ban')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Reason for the ban')
				.setRequired(false)
		)
        .addIntegerOption(option => 
			option.setName('duration')
				.setDescription('Duration of the ban in minutes (leave blank for permanent)')
				.setRequired(false)
		),
	
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';
		const duration = interaction.options.getInteger('duration');

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply({ content: "You don't have permission to ban members.", ephemeral: true });
		}

		const member = interaction.guild.members.cache.get(target.id);
		if (!member) {
			return interaction.reply({ content: "That user is not in the server.", ephemeral: true });
		}

		if (!member.bannable) {
			return interaction.reply({ content: `I can't ban ${target.tag}.`, ephemeral: true });
		}

		await member.ban({ reason });

		await interaction.reply({ content: `${target.tag} has been banned.\n**Reason:** ${reason}${duration ? `\n**Duration:** ${duration} minute(s)` : ''}` });

		if (duration) {
			const durationMs = duration * 60 * 1000;
			setTimeout(async () => {
				try {
					await interaction.guild.members.unban(target.id, 'Temporary ban expired');
					const logChannel = interaction.channel;
					if (logChannel && logChannel.isTextBased()) {
						logChannel.send(`⏱️ ${target.tag} has been automatically unbanned after ${duration} minute(s).`);
					}
				} catch (error) {
					console.error(`❌ Failed to unban ${target.tag}:`, error);
				}
			}, durationMs);
		}
	}
};