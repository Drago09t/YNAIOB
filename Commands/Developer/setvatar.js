const { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, ActivityType } = require('discord.js')
const { } = require('../../config.json')

module.exports = {
  adminOnly: true,
  data: new SlashCommandBuilder()
    .setName("setavatar")
    .setDescription("Set custom avatar for your bot")

    .addStringOption(
      option =>
        option.setName("link")
          .setDescription("Avatar link")
          .setRequired(true)),

  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    const { options } = interaction;

    client.user.setAvatar(options.getString("link")).catch(err => console.log('❌ Please don\'t changing it too fast & make sure your avatar url is correct'))

    await interaction.reply({ content: "✅ Avatar updated successfully (Check Console)", ephemeral: true })
  },
  developer: true
}
