
# 📦 RabbitMQ TypeScript API

Este projeto simula uma arquitetura assíncrona com **RabbitMQ** e **TypeScript**, ideal para processar eventos de IoT com segurança e tolerância a falhas usando Dead Letter Queue (DLQ).

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/gustavogasperetti/rabbitmq-typescript-api.git
cd rabbitmq-typescript-api
```

2. Instale as dependências:

```bash
npm install
```

---

## 🚀 Execução

1. Inicie o consumidor (subscriber) que processa mensagens da fila principal:

```bash
npm run dev:subscriber
```

2. Em outro terminal, execute o publicador (publisher) que envia as mensagens:

```bash
npm run dev:publisher
```

---

## 📁 Estrutura dos Arquivos

- `config.ts`: Centraliza configurações como URL do RabbitMQ, nome da exchange, filas e chave de roteamento.
- `publisher.ts`: Envia mensagens com dados de dispositivos para a exchange.
- `subscriber.ts`: Consome mensagens, envia os dados para uma API REST e trata erros com DLQ.

---

## 🌱 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
RABBITMQ_URL=amqp://localhost:5672
```

Valores padrão utilizados se a variável não for definida:

- `RABBITMQ_URL`: `amqp://localhost:5672`
- `EXCHANGE`: `direct_exchange`
- `ROUTING_KEY`: `mail.send`
- `QUEUE`: `main_queue`
- `DLQ`: `dlq_queue`
- `REST_API_URL`: `https://unirecog.gaek.com.br/api/iot/register`

---

## 📨 Exemplo de Payload

```json
{
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
}
```

---

## 🔍 Visualizando a Exchange no RabbitMQ

1. Acesse o painel de administração: [http://localhost:15672](http://localhost:15672)
2. Login padrão:
   - **Usuário:** `guest`
   - **Senha:** `guest`
3. Vá até a aba **"Exchanges"**
4. Busque por `direct_exchange`
5. Clique nela para visualizar:
   - Bindings (ligações com filas)
   - Mensagens publicadas
   - Roteamento de mensagens

---

## 🛡️ Licença

Este projeto está licenciado sob a licença MIT.
