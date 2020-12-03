import React from 'react';

export const MainContext = React.createContext({
    username: "",
    setUsername: () => {},
    auth: false,
    setAuth: () => {}
})
