import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUsers = [
  {username:'dev', password:'dev123', role:'developer'},
  {username:'manager', password:'manager123', role:'manager'}
];

export function AuthProvider({children}){
  const [user, setUser] = useState(null);

  const login = (username, password)=>{
    const found = mockUsers.find(u=>u.username===username && u.password===password);
    if(found){ setUser(found); return true;}
    return false;
  }

  const logout = ()=> setUser(null);

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext);