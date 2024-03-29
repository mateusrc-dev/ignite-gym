import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserSave,
  storageGetDataUser,
  storageUserRemove,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  tagUserSignInCreate,
  tagUserSignOutCreate,
} from "@notifications/notificationsTags";

export type AuthContextDataProps = {
  user: UserDTO;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
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

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setIsLoadingUserStorage(true);
      await storageUserSave(userData); // persisting data of user
      await storageAuthTokenSave({ token, refresh_token }); // persisting token
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
      tagUserSignInCreate();
      await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
      userAndTokenUpdate(data.user, data.token);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      tagUserSignOutCreate();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    // we let's save the data of user in storage and state here
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageGetDataUser();
      const { token } = await storageAuthTokenGet();

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

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut); // we let's send signOut in this function
    return () => {
      // we let's delete this function of memory, because the function is save   in memory in code above
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
