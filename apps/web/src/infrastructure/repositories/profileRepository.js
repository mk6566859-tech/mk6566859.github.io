import { httpRequest } from "../http/httpClient";

export const profileRepository = {
  async getProfile() {
    return httpRequest("/profile");
  }
};
