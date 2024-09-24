export interface PropsUser {
  name: string;
  role: "client" | "employee";
}

export interface PropsAuthContext {
  isAuthenticated: boolean;
  user: PropsUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
