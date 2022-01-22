import {TodoForm} from "../components/todosForm";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {TodoList} from "../components/todoList";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


export const TodosPage = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [todos, setTodos] = useState([])
    const saveTodo = todoText => {
        const trimmedText = todoText.trim();
        if (trimmedText.length > 0) {
            setTodos([...todos, trimmedText]);
        }
    }
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/login')
    }

    return (
        <div>
        <nav>
            <Box sx={{
                height: 50,
                padding: 2.5,
                display: 'flex',
                justifyContent: "right",
                bgcolor: 'info.main'
            }}>
            <li> <a href="/login" onClick={logoutHandler}>Log out</a></li>
            </Box>
        </nav>

        <div>
            <Box sx={{
                margin: 5,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Typography variant="h3">Todos</Typography>
            </Box>
            <Box sx={{
                margin: 5,
                display: 'flex',
                justifyContent: 'center'

            }}>
                <TodoForm saveTodo={saveTodo}/>
            </Box>
            <Box sx={{
                margin: 5,
                display: 'flex',
                justifyContent: 'center'

            }}>
                <TodoList todos={todos}
                          deleteTodo={todoIndex => {
                              const newTodos = todos.filter((_, index) => index !== todoIndex);
                              setTodos(newTodos)
                          }}
                />
            </Box>
        </div>
        </div>
    )
}