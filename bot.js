const { Snake } = require('tgsnake');
const fs = require('fs');
const path = require('path');
const { direct } = require('./helper/direct');
const { dl } = require('./helper/dl');
const { getTotalSize } = require('./helper/size');
const { isUrl } = require('./helper/url');
require('dotenv').config();

const bot = new Snake({
    apiHash: process.env.API_HASH,
    apiId: process.env.API_ID,
    botToken: process.env.BOT_TOKEN
});

bot.command('start', async(ctx) => {
  await ctx.telegram.sendMessage(ctx.chat.id, `Hi ${ctx.chat.firstName}`);
});

bot.command('status', async(ctx) => {
  const files = await fs.readdirSync(process.env.DOWNLOAD_LOCATION);
  if (files.length == 0) return ctx.telegram.sendMessage(ctx.chat.id, 'No files');
  const totalSize = await getTotalSize(process.env.DOWNLOAD_LOCATION);
  await ctx.telegram.sendMessage(ctx.chat.id, `<b>STATUS</b>\n\n<b>Url:</b> ${process.env.DOMAIN}\n<b>Total File:</b> ${files.length}\n<b>Total Size:</b> ${totalSize}`, { parseMode: 'HTML' });
});

bot.on('message', async(ctx) => {
  const url = ctx.text;
  console.log(isUrl(url))
  if(!isUrl(url)) {
    return true;
  };
 const msg = await ctx.telegram.sendMessage(ctx.chat.id, 'Wait');
  const data = await direct(url);
  if (data.status == false) {
    return ctx.telegram.editMessage(msg.chat.id, msg.message.id, data.result.message);
  };
  const name = data.result.name || decodeURI(path.basename(data.result.link));
  await dl(data.result.link, name);
  return ctx.telegram.editMessage(ctx.chat.id, msg.message.id, 'Download successfully');
});

bot.run();
console.log('Bot running...')