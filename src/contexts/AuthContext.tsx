import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserSave,
  storageGetDataUser,
  storageUserRemove,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>; // we let's insert the data of user in this function - this function is async
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
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
  const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // inserting token in header the requests - the backend fetch by 'Authorization' for find our token - 'Bearer' is the type of token

    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true);
      await storageUserSave(userData); // persisting data of user
      await storageAuthTokenSave(token); // persisting token
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signIn(email: string, password: string) {
    // we let's centralize this logic of update the state of user here in context
    const { data } = await api.post("/sessions", { email, password }); // we let's fetch the data of user in backend
    if (data.user && data.token) {
      // if return data of user of backend, then this user exist in backend
      await storageUserAndTokenSave(data.user, data.token);
      userAndTokenUpdate(data.user, data.token);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageGetDataUser();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
