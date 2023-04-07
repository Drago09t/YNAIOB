const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Gets a users server invite count.')
    .addUserOption(option => option.setName('user').setDescription('The user you want to check invites of').setRequired(true)),
    async execute(interaction, message) {
        const user = interaction.options.getUser('user');

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark: ${user.tag} has **${i}** invites.`)

        await interaction.reply({embeds: [embed]});
    }
}