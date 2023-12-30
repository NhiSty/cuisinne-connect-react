import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchUser, login, logout, register } from "../api/user";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useUser() {
  return useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: async () => {
      try {
        return await fetchUser();
      } catch (error) {
        return null;
      }
    },
    retry: 0,
    // should be refetched in the background every 4 hours
    staleTime: 1000 * 60 * 60 * 4,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.user]);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.user],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.user]);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.user],
    mutationFn: ({ email, password, password_confirmation, username }) =>
      register(username, email, password, password_confirmation),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.user]);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
