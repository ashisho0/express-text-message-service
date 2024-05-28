const Joi = require("joi");
const { queueMessage } = require("../services/message.service");
const calculateSegments = require("../helpers/calculateSegments.helper");
const { isGSM7Encoding } = require("../helpers/encoding.helper");

const messageSchema = Joi.object({
  to: Joi.array()
    .items(
      Joi.string().regex(/^\+?1[ -]?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})$/)
    )
    .required()
    .min(1),
  message: Joi.string().required(),
});

const queueMessageHandler = async (req, res) => {
  const { error } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { to, body } = req.body;
    const encoding = isGSM7Encoding(body) ? "GSM-7" : "UCS-2";
    const segments = calculateSegments(body, encoding).length;

    for (const number of to) {
      const messageData = { to: number, body, encoding, segments };
      await queueMessage(messageData);
    }

    res.status(200).send("Messages queued successfully");
  } catch (err) {
    console.log("err-->", err);
    res.status(500).send("Error queuing messages");
  }
};

module.exports = { queueMessageHandler };
