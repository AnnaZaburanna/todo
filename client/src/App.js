import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {
    Route,
    Navigate,
    Routes, useNavigate
} from "react-router-dom";
import {TodosPage} from "./pages/todosPage";
import {AuthPage} from "./pages/authPage";

const theme = createTheme();
function RequireAuth({children}) {
    const navigate = useNavigate()
    const [token] = useAuth();

    return !!token
        ? children
        : navigate('/login');
}

function App() {
    const [login, token, logout] = useAuth();
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            login, token, logout, isAuthenticated
        }
        }>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<RequireAuth><TodosPage/></RequireAuth>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                </Routes>
            </ThemeProvider>
        </AuthContext.Provider>
    )
}

export default App