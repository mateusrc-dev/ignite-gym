import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { createContext, ReactNode, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>; // we let's insert the data of user in this function - this function is async
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
); // this is initial value, let's set a type for the value initial

// we let's join the parts of provider and created context in this file

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  // we let's get the children component of file 'App.tsx'
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    // we let's centralize this logic of update the state of user here in context
    try {
      const { data } = await api.post("/sessions", { email, password }); // we let's fetch the data of user in backend

      if (data.user) {
        // if return data of user of backend, then this user exist in backend
        setUser(data.user);
      }
    } catch (error) {
      throw error; // pushing this error to where this function was called
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
