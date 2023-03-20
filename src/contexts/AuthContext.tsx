import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps); // this is initial value, let's set a type for the value initial

// we let's join the parts of provider and created context in this file

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) { // we let's get the children component of file 'App.tsx'
  return (
    <AuthContext.Provider
    value={{
      user: {
        name: "Mateus",
        id: "1",
        avatar: "mateus.png",
        email: "mateus@hotmail.com",
      }
    }}
  >
    {children}
  </AuthContext.Provider>
    )
}