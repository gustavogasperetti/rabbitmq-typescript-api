import amqp from 'amqplib';
import axios from 'axios';
import { config } from './config';

const startConsumer = async () => {
  const conn = await amqp.connect(config.RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(config.EXCHANGE, 'direct', { durable: true });

  await channel.assertQueue(config.QUEUE, {
    durable: true,
    messageTtl: 30000,
    deadLetterExchange: '',
    deadLetterRoutingKey: config.DLQ
  });

  await channel.assertQueue(config.DLQ, { durable: true });

  await channel.bindQueue(config.QUEUE, config.EXCHANGE, config.ROUTING_KEY);

  channel.consume(config.QUEUE, async (msg) => {
    if (msg) {
      try {
        const content = JSON.parse(msg.content.toString());
        console.log('Recebido:', content);

        const response = await axios.post(config.REST_API_URL, content, {
          headers: { 'x-gaek-token': 'segredo' }
        });
        console.log('API resposta:', response.status);
        channel.ack(msg);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Erro no processamento:', err.message);
        } else {
          console.error('Erro desconhecido no processamento:', err);
        }
        channel.nack(msg, false, false);
      }
    }
  }, { noAck: false });
};

startConsumer();
