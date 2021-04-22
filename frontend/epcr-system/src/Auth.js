import React from 'react';

export const MainContext = React.createContext({
    username: "",
    auth: false,
    privilege: "",
    language: "es",
    setUsername: () => {},
    setLanguage: () => {},
    setAuth: () => {},
    setPrivilege: () => {}
})
