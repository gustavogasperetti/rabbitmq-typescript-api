import dotenv from 'dotenv';
dotenv.config();

export const config = {
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
  EXCHANGE: 'direct_exchange',
  ROUTING_KEY: 'mail.send',
  QUEUE: 'main_queue',
  DLQ: 'dlq_queue',
  REST_API_URL: 'https://unirecog.gaek.com.br/api/iot/register'
};
