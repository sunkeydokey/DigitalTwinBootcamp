import { useEffect, useState } from 'react';
import ToDo from './components/ToDo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from './utils/HandleApi';

function App() {
  const [toDo, setToDo] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState('');

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, author, text) => {
    setIsUpdating(true);
    setAuthor(author);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input
            className="author"
            type="text"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="text"
            type="text"
            placeholder="할일"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(author, text, setText, setToDo)
            }
          >
            {isUpdating ? 'Update' : 'Add'}
          </div>
        </div>

        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              author={item.author}
              text={item.text}
              updateMode={() => updateMode(item._id, item.author, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
