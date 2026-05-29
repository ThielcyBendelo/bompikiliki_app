import React, { createContext, useState, useEffect } from 'react';
import { users } from '../mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setTimeout(() => setUser(JSON.parse(stored)), 0);
    }
  }, []);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('authUser', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}



export { AuthContext };
