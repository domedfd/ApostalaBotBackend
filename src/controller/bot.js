const Telegraf = require("telegraf");
const TaskModel = require("../model/TaskModel");

const bot = new Telegraf("1169686321:AAHHUa7wRWB5YYX9zHVeq7Ok3MARk4PaxJM");

async function create(value, ctx) {
  const task = new TaskModel(value);
  await task
    .save()
    .then((response) => {
      return 0;
    })
    .catch((error) => {
      return ctx
        .replyWithMarkdown(
          `***Ops!***😱 Hubo algun inconveniente para enviar tu mensage al ***Soporte Avanzado***.

⚠️Comunicate con el administrador del grupo!⚠️`
        )
        .json();
    });
}

bot.start((ctx) => {
  ctx.reply("Bienvenido");
});

bot.help((ctx) => {
  ctx.replyWithMarkdown(
    `Hola ***${ctx.from.first_name}*** en que le puede ayudar?`
  );
});

bot.settings((ctx) => {
  ctx.reply("Configuraciones");
});

bot.command("validar1", (ctx) => {
  ctx.reply("ya esta valido el codigo!!");
});

bot.hears(/\b([A-F0-9]{13})\b|\b([0-9]{7})\b/g, (ctx) => {
  let msg = ctx.message.text;
  let user_name = ctx.from.first_name;
  let id_user = ctx.from.id;
  let id_task = ctx.match[0];

  create(
    {
      macaddress: "01:02:03:04:05:06",
      type: "Validar",
      user_name,
      id_user,
      id_task,
    },
    ctx
  );
  console.log(ctx.match[1]);
  ctx.replyWithMarkdown(
    `Hola ***${user_name}***, parece que enviaste un codigo!

El codigo: ***${id_task}*** fue enviado a Soporte Avanzado. 😉👍`
  );
});

//bot.hears(/test/, () => console.log(ctx.match));
//bot.hears(/^test$/, () => console.log('success 2'));
//bot.hears(/\/test/, () => console.log('success 3'));
//bot.hears(/^\/test$/, () => console.log(ctx.match));

//bot.on('text', ctx => {
//        ctx.reply('ya esta valido el codigo!!')
//})

module.exports = bot;
