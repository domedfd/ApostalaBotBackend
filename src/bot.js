const Telegraf = require("telegraf");
const bot = new Telegraf("1169686321:AAHHUa7wRWB5YYX9zHVeq7Ok3MARk4PaxJM");

bot.start((ctx) => {
  console.log(ctx.message.text);
  ctx.reply("Bienvenido");
});

bot.help((ctx) => {
  ctx.reply("Hola " + ctx.from.first_name + " en que le puede ayudar?");
});

bot.settings((ctx) => {
  ctx.reply("Configuraciones");
});

bot.command("validar1", (ctx) => {
  ctx.reply("ya esta valido el codigo!!");
});

const email = new RegExp(/test (.+)/i);

bot.hears(/\bvalidar \d/i, (ctx) => {
  console.log(ctx);
  let me = ctx.message.text;
  let name = ctx.from.first_name;
  ctx.reply(
    "Hola " +
      name +
      ", el codigo " +
      me.replace(/\D/g, "") +
      " sera validado luego. 😉👍"
  );
  ctx.reply("Entregado a la base de datos!");
});

//bot.hears(/test/, () => console.log(ctx.match));
//bot.hears(/^test$/, () => console.log('success 2'));
//bot.hears(/\/test/, () => console.log('success 3'));
//bot.hears(/^\/test$/, () => console.log(ctx.match));

//bot.on('text', ctx => {
//        ctx.reply('ya esta valido el codigo!!')
//})

module.exports = bot;
