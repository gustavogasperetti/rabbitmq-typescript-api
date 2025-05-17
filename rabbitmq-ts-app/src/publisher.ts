import amqp from 'amqplib';
import { config } from './config';

const sendMessage = async (message: object) => {
  const conn = await amqp.connect(config.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(config.EXCHANGE, 'direct', { durable: true });

  const payload = Buffer.from(JSON.stringify(message));
  channel.publish(config.EXCHANGE, config.ROUTING_KEY, payload);

  console.log('Mensagem publicada:', message);

  await channel.close();
  await conn.close();
};

sendMessage({
  "deviceId": "esp-unimar-401",
  "devices": [
    {
      "mac": "D8:0D:17:F4:51:C6",
      "type": "wifi",
      "rssi": -59,
      "name": "WiFi Device"
    },
    {
      "mac": "DE:0D:17:F4:51:C6",
      "type": "wifi",
      "rssi": -58,
      "name": "WiFi Device"
    }
  ]
});
