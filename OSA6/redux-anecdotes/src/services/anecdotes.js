import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
    const anecdotes = await getAll();
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id);
    const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
    };
    const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
    return response.data;
};


const anecdoteService = { getAll, createNew, vote };

export default anecdoteService;
