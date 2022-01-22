import React, {useState} from 'react';
import TextField from "@mui/material/TextField";

export const TodoForm = (props) => {
    const { saveTodo } = props;
    const [value, setValue] = useState('')
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                saveTodo(value);
                setValue('')
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Add todo"
                margin="normal"
                onChange={event => {
                    setValue(event.target.value)
                }}
                value={value}
                />
        </form>
    );

};