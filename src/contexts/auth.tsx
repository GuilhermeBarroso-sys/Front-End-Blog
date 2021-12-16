import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
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
type AuthContextData = {
  user: User|null;
  signOut: () => void;
  signIn: ({email,password}:ISignIn) => Promise<void>
  isAuthenticated: () => void;
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
  async function signIn({email,password}: ISignIn) : Promise<void> {
    
    const {data} = await api.post<AuthResponse>('login', {
      email,
      password
    });
    
    const {token,user} = data;
    localStorage.setItem('@dolphinBlog:token', token);
    localStorage.setItem('@dolphinBlog:userId', user.id);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dolphinBlog:token');
    localStorage.removeItem('@dolphinBlog:userId')
    window.location.href = '/';
  }
  function isAuthenticated() {
    const token = localStorage.getItem('@dolphinBlog:token');
    api.defaults.headers.common.authorization = `Bearer ${token}`;
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