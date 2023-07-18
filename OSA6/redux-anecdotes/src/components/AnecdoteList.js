import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification} from '../reducers/notificationReducer';
import { useState } from 'react';

export const AnectodeList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);

    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    //state for notification timeout so when old votes setTimeout won't clear new vote notification prematurely
    const [notificationTimeout, setNotificationTimeout] = useState(null);

    const handleVote = (anecdote) => {

        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }

        displayNotification(`You voted '${anecdote.content}'`, 5, dispatch);

        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote.id));
    };
    
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    );
}