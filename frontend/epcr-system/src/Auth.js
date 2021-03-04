import React from 'react';

export const MainContext = React.createContext({
    username: "",
    auth: false,
    language: "es",
    setUsername: () => {},
    setLanguage: () => {},
    setAuth: () => {}
})
