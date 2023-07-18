import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

export const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    
    const handleNewAnecdote = async (event) => {
        event.preventDefault();
        const content = inputRef.current.value;
        console.log('newAnecdote:', content);
/*         //tämä luo id:n anekdooteille backendiin
        await anecdoteService.createNew(content);
        //anekdooteille luodaan toinen id frontendissä newAnecdotessa */
        dispatch(createAnecdote(content));
        displayNotification(`You created '${content}'`, 5, dispatch);
/*         setTimeout(() => {
            dispatch(nullNotification())
          }, 5000) */
        inputRef.current.value = '';
    };
    
    return (
        <div>
        <h2>create new</h2>
        <form>
            <div><input ref={inputRef} name="anecdote" /></div>
            <button onClick={handleNewAnecdote}>create</button>
        </form>
        </div>
    );
}