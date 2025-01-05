interface PropsUser {
  username: string;
  role: "client" | "employee";
}

export interface PropsStorageAuth {
  state: {
    isAuthenticated: boolean;
    user: PropsUser | null;
  };
  actions: {
    loginInState: (user: PropsUser) => void;
    logoutInState: () => void;
  };
}
