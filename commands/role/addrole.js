const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Add role(s) to a user.')
		.addUserOption(option => 
			option.setName('target')
				.setDescription('The user to assign the roles to')
				.setRequired(true)
		)
		.addStringOption(option => 
			option.setName('roles')
				.setDescription('The roles to add (mention or ID, separate by space)')
				.setRequired(true)
		),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const rolesInput = interaction.options.getString('roles').split(' ');
		const member = await interaction.guild.members.fetch(target.id);

		const addedRoles = [];
		const failedRoles = [];

		for (const roleIdOrMention of rolesInput) {
			const roleId = roleIdOrMention.replace(/[<@&>]/g, ''); 
			const role = interaction.guild.roles.cache.get(roleId);
			
			if (role) {
				if (!member.roles.cache.has(role.id)) {
					await member.roles.add(role);
					addedRoles.push(role.name);
				} else {
					failedRoles.push(`${role.name} (already has this role)`);
				}
			} else {
				failedRoles.push(roleIdOrMention);
			}
		}

		const addedMsg = addedRoles.length ? `Added roles: ${addedRoles.join(', ')}.` : '';
		const failedMsg = failedRoles.length ? `Failed to add roles: ${failedRoles.join(', ')}.` : '';

		await interaction.reply({ content: `${addedMsg} ${failedMsg}`.trim() });
	},
};