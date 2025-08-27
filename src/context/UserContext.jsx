import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const storedUser = window.localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  })

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  }

  /*// Si hay user en localStorage, lo cargamos al iniciar
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); //actualizamos el estado con la informacion del usuario
    }
  }, []);*/


  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};