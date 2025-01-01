interface PropsUser {
  username: string;
  role: "client" | "employee";
}

export interface PropsStorageAuth {
  isAuthenticated: boolean;
  user: PropsUser | null;
  loginInState: (user: PropsUser) => void;
  logoutInState: () => void;
}
