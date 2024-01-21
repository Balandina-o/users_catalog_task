import React, { createContext } from "react";
import ReactDOM from 'react-dom/client';
import UsersStore from "./store/UsersStore";
import App from './App';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      users: new UsersStore()
    }}
  >
    <App />
  </Context.Provider>
);