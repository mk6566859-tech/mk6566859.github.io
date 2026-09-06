import { makeGetProfile } from "../../application/use-cases/GetProfile.js";
import { inMemoryProfileRepository } from "../../infrastructure/repositories/inMemoryProfileRepository.js";

const getProfile = makeGetProfile(inMemoryProfileRepository);

export async function getProfileController(_req, res, next) {
  try {
    res.json(await getProfile());
  } catch (error) {
    next(error);
  }
}
