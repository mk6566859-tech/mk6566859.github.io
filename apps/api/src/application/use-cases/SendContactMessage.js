export function makeSendContactMessage(contactRepository) {
  return async function sendContactMessage(input) {
    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name is required.");
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error("A valid email is required.");
    }

    if (!input.message || input.message.trim().length < 10) {
      throw new Error("Message must be at least 10 characters.");
    }

    const subject = (input.subject || "Portfolio inquiry").trim();

    return contactRepository.sendMessage({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      subject: subject || "Portfolio inquiry",
      message: input.message.trim()
    });
  };
}
