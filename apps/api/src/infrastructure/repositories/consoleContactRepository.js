export const consoleContactRepository = {
  async sendMessage(message) {
    console.log("New portfolio contact:", {
      ...message,
      receivedAt: new Date().toISOString()
    });

    return { accepted: true };
  }
};
