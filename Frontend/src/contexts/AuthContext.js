import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = useState(null);

    const login = (newTokens) => {
        setTokens(newTokens);
    };

    const logout = () => {
        setTokens(null);
    };

    return (
        <AuthContext.Provider value={{ tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để dễ dàng truy cập vào context
export const useAuth = () => {
    return useContext(AuthContext);
};
