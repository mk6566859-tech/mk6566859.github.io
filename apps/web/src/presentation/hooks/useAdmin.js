import { useAdmin as useAdminContext } from "../providers/AdminProvider";

export function useAdmin() {
  return useAdminContext();
}
