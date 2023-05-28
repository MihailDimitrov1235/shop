import React, { useState, useCallback, useEffect } from 'react';

export const MessageContext = React.createContext({
    message: null,
    addMessage: () => { },
    removeMessage: () => { }
});

export default function MessageProvider({ children }) {
    const [message, setMessage] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (!message) {
            clearTimeout(timeoutId);
        }
    }, [message, timeoutId]);

    const removeMessage = () => setMessage(null);

    const addMessage = (text, status) => {
        setMessage({ text, status })
        const id = setTimeout(() => setMessage(null), 3000);
        setTimeoutId(id);
    };

    const contextValue = {
        message,
        addMessage: useCallback((text, status) => addMessage(text, status), []),
        removeMessage: useCallback(() => removeMessage(), [])
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
}