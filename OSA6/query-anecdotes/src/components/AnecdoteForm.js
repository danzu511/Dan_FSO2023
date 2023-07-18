import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const { dispatch } = useNotification();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
    },
  });
  
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
  
    if (content.length < 5) {
      dispatch({ type: 'SET_NOTIFICATION', notification: 'Anecdote must be at least 5 letters long.' });
      return; // Exit early if the anecdote is too short
    }
  
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, important: true });
    dispatch({ type: 'SET_NOTIFICATION', notification: `you created '${content}'` });
  };
  

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
