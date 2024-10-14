export interface PropsUser {
  name: string;
  role: "client" | "employee";
}

export interface PropsUseAuth {
  state: {
    isAuthenticated: boolean;
    user: PropsUser | null;
  }
  actions: {
    login: (email: string, password: string) => void;
    logout: () => void;
  }
}
