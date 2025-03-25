const axios = require('axios');

module.exports = {
  async getNovaPoshtaBranches(city) {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
      apiKey: process.env.NOVA_POSHTA_API_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: { CityName: city },
    });
    return response.data.data;
  },
  async getUkrposhtaBranches(city) {
    // Аналогічна логіка для Укрпошти
    const response = await axios.get(`https://www.ukrposhta.ua/api/branches?city=${city}`, {
      headers: { Authorization: `Bearer ${process.env.UKRPOSHTA_API_KEY}` },
    });
    return response.data;
  },
};