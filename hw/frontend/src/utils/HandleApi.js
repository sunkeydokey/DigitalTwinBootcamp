import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getAllToDo = (setToDo) => {
  axios.get(baseUrl).then(({ data }) => {
    setToDo(data);
  });
};

const addToDo = (author, text, setAuthor, setText, setToDo) => {
  axios
    .post(`${baseUrl}/save`, { author, text })
    .then((data) => {
      setText('');
      setAuthor('');
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .post(`${baseUrl}/update`, { _id: toDoId, text })
    .then((data) => {
      setText('');
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
