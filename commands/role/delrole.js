const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delrole')
		.setDescription('Remove role(s) from a user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to remove the roles from')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('roles')
				.setDescription('The roles to remove (mention or ID, separate by space)')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const rolesInput = interaction.options.getString('roles').split(' ');
		const member = await interaction.guild.members.fetch(target.id);

		const removedRoles = [];
		const failedRoles = [];

		for (const roleIdOrMention of rolesInput) {
			const roleId = roleIdOrMention.replace(/[<@&>]/g, ''); 
			const role = interaction.guild.roles.cache.get(roleId);
			
			if (role) {
				if (member.roles.cache.has(role.id)) {
					await member.roles.remove(role);
					removedRoles.push(role.name);
				} else {
					failedRoles.push(`${role.name} (user doesn't have this role)`);
				}
			} else {
				failedRoles.push(roleIdOrMention);
			}
		}

		const removedMsg = removedRoles.length ? `Removed roles: ${removedRoles.join(', ')}.` : '';
		const failedMsg = failedRoles.length ? `Failed to remove roles: ${failedRoles.join(', ')}.` : '';

		await interaction.reply({ content: `${removedMsg} ${failedMsg}`.trim() });
	},
};