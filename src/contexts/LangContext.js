import React, { createContext, useState } from 'react';

export const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const switchLang = (l) => setLang(l);
  return (
    <LangContext.Provider value={{ lang, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}
