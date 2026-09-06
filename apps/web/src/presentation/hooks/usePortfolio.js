import { useEffect, useState } from "react";
import { makeGetPortfolioData } from "../../application/use-cases/getPortfolioData";
import { profileRepository } from "../../infrastructure/repositories/profileRepository";
import { projectRepository } from "../../infrastructure/repositories/projectRepository";
import { profile as fallbackProfile, projects as fallbackProjects } from "../data/profile";

const getPortfolioData = makeGetPortfolioData(
  profileRepository,
  projectRepository
);

export function usePortfolio() {
  const [state, setState] = useState({
    loading: true,
    profile: fallbackProfile,
    projects: fallbackProjects,
    error: null
  });

  useEffect(() => {
    let active = true;

    const isLocalDev = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (!isLocalDev) {
      setState({ loading: false, profile: fallbackProfile, projects: fallbackProjects, error: null });
      return () => {
        active = false;
      };
    }

    getPortfolioData()
      .then((data) => {
        if (active) setState({ loading: false, ...data, error: null });
      })
      .catch((error) => {
        if (active) {
          setState((current) => ({
            ...current,
            loading: false,
            error
          }));
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
