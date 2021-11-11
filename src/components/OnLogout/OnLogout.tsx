import React, { useEffect } from 'react';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const OnLogout = () => {
  const { fetchUser, handleLogout } = useCurrentUser();

  useEffect(() => {
    const logout = async() => {
      try {
        handleLogout();
        await fetchUser();
      } catch (e) {
        console.error(e);
      }
    };
    logout().catch();
  }, []);

  return null;
};

export default OnLogout;
