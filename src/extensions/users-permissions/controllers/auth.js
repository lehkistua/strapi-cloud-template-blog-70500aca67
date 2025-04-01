'use strict';

module.exports = {
  async register(ctx) {
    const { firstName, lastName, phone, address, email, password } = ctx.request.body;

    // Находим роль "Покупатель"
    const customerRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { name: 'Покупатель' },
    });

    if (!customerRole) {
      return ctx.badRequest('Роль "Покупатель" не найдена');
    }

    const user = await strapi.plugins['users-permissions'].services.user.add({
      role: customerRole.id,
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      username: email, // Strapi требует username, можно использовать email
      confirmed: true, // Подтверждаем пользователя сразу (или настройте email-подтверждение)
    });

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
      id: user.id,
    });

    return {
      jwt,
      user,
    };
  },
};