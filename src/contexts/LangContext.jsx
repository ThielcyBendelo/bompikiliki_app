import React, { useState } from 'react';
import { LangContext } from './LangContextDef.js';

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const switchLang = (l) => setLang(l);
  return (
    <LangContext.Provider value={{ lang, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}
