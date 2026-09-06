import { httpRequest } from "../http/httpClient";

export const contactRepository = {
  async sendMessage(payload) {
    return httpRequest("/contact", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};
