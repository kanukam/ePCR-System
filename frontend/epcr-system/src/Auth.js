import React from 'react';

export const MainContext = React.createContext({
    username: "",
    id: "",
    auth: false,
    language: "es",
    setUsername: () => {},
    setId: () => { },
    setLanguage: () => {},
    setAuth: () => {}
})
