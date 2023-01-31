const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const fs = require('fs');
const path = require('path');
const { direct } = require('./helper/direct');
const { dl } = require('./helper/dl');
const { getTotalSize } = require('./helper/size');
const { isUrl } = require('./helper/url');
const { perm } = require('./helper/permission');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log(ctx.message.message_id)
  ctx.reply(`Hi ${ctx.from
  .first_name}`);
});

bot.command('status', async(ctx) => {
  const files = await fs.readdirSync(process.env.DOWNLOAD_LOCATION);
  if (files.length == 0) return ctx.telegram.sendMessage(ctx.chat.id, 'No files');
  const totalSize = await getTotalSize(process.env.DOWNLOAD_LOCATION);
  ctx.telegram.sendMessage(ctx.chat.id, `<b>STATUS</b>\n\n<b>Url:</b> ${process.env.DOMAIN}\n<b>Total File:</b> ${files.length}\n<b>Total Size:</b> ${totalSize}`, { parse_mode: 'HTML' });
});

bot.on(message('text'), async(ctx) => {
  console.log(ctx)
  const url = ctx.message.text;
  if(!isUrl(url)) {
    return true;
  };
  const reMsg = await ctx.telegram.sendMessage(ctx.chat.id, 'Wait');
  const data = await direct(url)
  if (data.status == false) {
    return ctx.telegram.editMessageText(ctx.chat.id, reMsg.message_id, 0, data.result.message);
  };
  const name = data.result.name || decodeURI(path.basename(data.result.link));
  await dl(data.result.link, name, ctx.from.first_name);
  return ctx.telegram.editMessageText(ctx.chat.id, reMsg.message_id, 0, 'Download successfully');
});

bot.launch();
console.log('Bot run..');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));