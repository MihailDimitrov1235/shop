import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

function useAuth() {
    const { user, setUser } = useContext(AuthContext);

    return {
        user,
        setUser
    }
}

export default useAuth;