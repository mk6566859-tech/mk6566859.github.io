import { makeSendContactMessage } from "../../application/use-cases/SendContactMessage.js";
import { resendContactRepository } from "../../infrastructure/repositories/resendContactRepository.js";

const sendContactMessage = makeSendContactMessage(resendContactRepository);

export async function sendContactController(req, res, next) {
  try {
    const result = await sendContactMessage(req.body);
    res.status(202).json({
      message: "Your message was accepted.",
      ...result
    });
  } catch (error) {
    next(error);
  }
}
