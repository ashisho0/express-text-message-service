const amqp = require("amqplib");
const AWS = require("aws-sdk");
const TokenBucket = require("../helpers/tokenBucket.helper");
const calculateSegments = require("../helpers/calculateSegments.helper");
const logger = require("../helpers/logger.helper");
const bucket = new TokenBucket(process.env.RATE_LIMIT, process.env.RATE_LIMIT);

const queueMessage = async (messageData) => {
  logger.info("Queueing message", { messageData });

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const queue = process.env.QUEUE_NAME;
  await channel.assertQueue(queue, { durable: true });

  const messageSegments = calculateSegments(
    messageData.body,
    messageData.encoding
  );
  for (let i = 0; i < messageSegments.length; i++) {
    await channel.sendToQueue(
      queue,
      Buffer.from(
        JSON.stringify({ ...messageData, segment: messageSegments[i] })
      ),
      { persistent: true }
    );
  }

  await channel.close();
  await connection.close();

  logger.info("Message queued successfully", { messageData });
};

const sendMessage = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  const queue = process.env.QUEUE_NAME;
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      const segments = message.segments || 1;

      if (bucket.removeTokens(segments)) {
        try {
          // Logic to send message via SMS provider
          logger.info(`Sending message: ${message.segment}`);

          // Simulate SMS sending process
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second delay for sending SMS

          // After successful sending
          channel.ack(msg);
          logger.info("Message sent successfully", { message });
        } catch (err) {
          console.error("Message sending failed", { error: err, message });
          // Retry logic
          setTimeout(() => {
            channel.nack(msg, false, true);
          }, 1000);
        }
      } else {
        // If rate limit exceeded, requeue the message
        logger.warn("Rate limit exceeded, requeuing message", { message });
        setTimeout(() => {
          channel.nack(msg, false, true);
        }, 1000);
      }
    }
  });
};

module.exports = { queueMessage, sendMessage };
