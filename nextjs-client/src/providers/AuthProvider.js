import { useState, useEffect, createContext, useCallback } from 'react';
import userService from '../services/user';

export const AuthContext = createContext({
    user: null,
    setUser: () => {}
});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.profile()
        .then((res) => {
            setUser(res.data);
        })
        .catch((error) => {
            setUser(null)
        })
    }, [])

    const contextValue = {
        user,
        setUser: useCallback((data) => setUser(data), [])
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}