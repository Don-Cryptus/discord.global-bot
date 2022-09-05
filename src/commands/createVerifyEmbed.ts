import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import type {
  APIEmbed,
  CacheType,
  CommandInteraction,
  Message,
  TextChannel,
} from 'discord.js';
import {
  BOT_ICON,
  RED_COLOR,
  VERIFY_CHANNEL,
  VERIFY_TEMPLATE,
} from '../utils/constants';

export default {
  data: new SlashCommandBuilder()
    .setName('create-verify-embed')
    .setDescription('verify all users in the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction: CommandInteraction<CacheType>) {
    // get text channel
    const channel = (await interaction.channel?.fetch()) as TextChannel;

    // if not verify channel, return
    if (channel.name !== VERIFY_CHANNEL) return;

    // create verify embed
    const embed: APIEmbed = {
      color: RED_COLOR,
      title: 'Verification process...',
      description: `**--- :flag_gb: Welcome to our Coding Server! :flag_gb: ---**

We are dedicated members, who are professionally and in their spare time engaged in programming and other IT topics.
Most of the programmers here are trainees, students, apprentices or have started their own business in IT. 

We are not an IT helpdesk, but we are happy to answer a serious and level-headed question in between.
We generally don't like it so much when the sole purpose of being here is to answer a question and then leave the server once the question has been answered.

------------------- 🙂 Happy Coding 🙂 -------------------

--- :flag_de: Herzlich Willkommen auf unserem Coding Server! :flag_de: ---

Wir sind engagierte Member, die sich beruflich und in ihrer Freizeit mit dem Programmieren und weiteren IT Themen beschäftigen.
Die meisten hier anzutreffenden Programmierenden sind Azubis, Studenten, Ausgelernte, oder haben sich in der IT selbstständig gemacht. 

Wir sind kein IT-Helpdesk, beantworten aber gerne zwischendurch eine ernst gemeinte und niveauvolle Frage.
Wir mögen es generell nicht so sehr, wenn der einzige Zweck des Aufenthalts der Beantwortung einer Frage dient und der Server danach wieder verlassen wird, sobald die Frage beantwortet wurde.

------------------- 🙂 Happy Coding 🙂 -------------------

add 👍 to get verified
`,
      timestamp: new Date().toISOString(),
      footer: {
        text: VERIFY_TEMPLATE,
        icon_url: BOT_ICON,
      },
    };

    // send embed & get message
    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    // add reactions for verify role
    (message as Message<boolean>).react('👍');
  },
};
