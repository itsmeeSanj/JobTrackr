export interface User {
  id: string;
  name: string;
  email: string;
  isAccountVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  backendUrl: string;
}
