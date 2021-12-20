import { createContext, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";
import {Navigate} from 'react-router-dom';
type User = {
  id:string;
  name:string;
  email:string;
  permission: number;
}
type AuthResponse = {
  token: string;
  user: User;
}
interface signInResponse {
  success: boolean,
  text?: string,
}
type AuthContextData = {
  user: User|null;
  signOut: () => void;
  signIn: ({email,password}:ISignIn) => Promise<signInResponse>
  isAuthenticated: () =>  Boolean;
}
interface ISignIn {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthContextData);
type AuthProvider = {
  children: ReactNode;
}

export function AuthProvider(props : AuthProvider) {
  const [user, setUser] = useState<User|null>(null);
  async function signIn({email,password}: ISignIn)  {
    try {
      const response = await api.post<AuthResponse>('login', {
        email,
        password
      })
      const {token,user} = response.data;
      localStorage.setItem('@dolphinBlog:token', token);
      localStorage.setItem('@dolphinBlog:userId', user.id);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setUser(user);
      return {success: true};
    } catch(err) {
      return {
        success: false, 
        text: err.response.data
      }
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dolphinBlog:token');
    localStorage.removeItem('@dolphinBlog:userId');
  }
  function isAuthenticated() {
    const token = localStorage.getItem('@dolphinBlog:token');
    if(!token) {
      return false;
    }
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    return true;
  }
  useEffect(() => {
    const token = localStorage.getItem('@dolphinBlog:token');
    const id = localStorage.getItem('@dolphinBlog:userId');
    if(token && id) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>(`/listOne/${id}`).then(({data}) => {
        setUser(data);
      })
    }
  },[])

  return (
    <AuthContext.Provider value ={{user, signOut, signIn, isAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
  )
}