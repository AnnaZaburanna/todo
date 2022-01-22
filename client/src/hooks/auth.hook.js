import {useCallback, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

const storageName = "userToken";

export const useAuth = () => {
    const [token, setToken] = useState( null);
    const navigate = useNavigate();
    const login = useCallback( (jwtToken) => {
        setToken(jwtToken);

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken
            }
        ))
        navigate("/")
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token)
        } else {
            navigate('/login')
        }

    }, [login]);

    return [login, token, logout]
}

