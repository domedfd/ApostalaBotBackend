const Telegraf = require("telegraf");
const TaskModel = require("../model/TaskModel");

const bot = new Telegraf("1169686321:AAHHUa7wRWB5YYX9zHVeq7Ok3MARk4PaxJM");

//REGEX CODE
let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
let validar = /validar/gi;
let desbloquear = /desbloquear/gi;
let activar = /\b([A-F0-9]{13})\b/g;
let autorizar = /\b([0-9]{7})\b/g;

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

// ACTIVAR - HASH
bot.hears(activar, (ctx) => {
  let message = ctx.message.text;
  let user_name = ctx.from.first_name;
  let id_user = ctx.from.id;
  let id_task = ctx.match[0];

  create(
    {
      macaddress: "01:02:03:04:05:06",
      type: 1,
      user_name,
      id_user,
      id_task,
      message,
    },
    ctx
  );
  ctx.replyWithMarkdown(
    `Hola ***${user_name}***, parece que enviaste un codigo para ***activacion***!

El codigo: ***${id_task}*** fue enviado a Soporte Avanzado para ser*** activado***. 😉`
  );
});

// AUTORIZAR - NUMBER
bot.hears(autorizar, (ctx) => {
  let message = ctx.message.text;
  let user_name = ctx.from.first_name;
  let id_user = ctx.from.id;
  let id_task = ctx.match[0];

  create(
    {
      macaddress: "01:02:03:04:05:06",
      type: 2,
      user_name,
      id_user,
      id_task,
      message,
    },
    ctx
  );
  ctx.replyWithMarkdown(
    `Hola ***${user_name}***, parece que enviaste un codigo para ***autorizar***!

Fue solicitada una ***autorizacion*** a Soporte Avanzado para el codigo: ***${id_task}***. 😉`
  );
});
// VALIDAR AND DESBLOQUEAR - EMAIL
bot.hears(emailRegex, (ctx) => {
  let message = ctx.message.text;
  let user_name = ctx.from.first_name;
  let id_user = ctx.from.id;
  let id_task = ctx.match[0];
  let matchValidar = message.match(validar);
  let matchDesbloquear = message.match(desbloquear);

  if (matchValidar == validar) {
    create(
      {
        macaddress: "01:02:03:04:05:06",
        type: 3,
        user_name,
        id_user,
        id_task,
        message,
      },
      ctx
    );
    ctx.replyWithMarkdown(
      `Hola ***${user_name}***, parece que enviaste un ***correo*** para ***validar***!
    
    El correo: ***${id_task}*** fue enviado a Soporte Avanzado para ser ***validado***. 😉`
    );
  } else if (matchDesbloquear == desbloquear) {
    create(
      {
        macaddress: "01:02:03:04:05:06",
        type: 4,
        user_name,
        id_user,
        id_task,
        message,
      },
      ctx
    );
    ctx.replyWithMarkdown(
      `Hola ***${user_name}***, parece que enviaste un ***correo*** para ***desbloquear***!
    
El correo: ***${id_task}*** fue enviado a Soporte Avanzado para ser ***desbloqueado***. 😉`
    );
  } else {
    ctx.replyWithMarkdown(
      `Ops!!😱😱 ***${user_name}*** no entendi lo que deseas hacer con el ***correo ${id_task}***.
    
                     ⚠️ ATENCION ⚠️

Intenta escribirme la palabra ***desbloquear*** o ***validar*** seguida del
***correo ${id_task}***. En el caso que desees hacer algo distinto puedes etiquetar a un funcionario del ***Soporte Avanzado*** o escribir a un del los administradores del grupo. 😌`
    );
  }
});

module.exports = bot;
