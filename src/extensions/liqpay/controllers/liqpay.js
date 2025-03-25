const LiqPay = require('liqpay-sdk');

const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

module.exports = {
  async createPayment(ctx) {
    const { amount, orderId } = ctx.request.body;

    const payment = liqpay.cnb_form({
      action: 'pay',
      amount: amount,
      currency: 'UAH',
      description: `Оплата за замовлення #${orderId}`,
      order_id: orderId,
      version: '3',
      language: 'uk',
    });

    ctx.send({ payment });
  },
};