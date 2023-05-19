import './Blank.css';

const Blank = ({ text, alphabets }) => {
  return (
    <div className="card">
      <p>{alphabets.includes(text) && text.toUpperCase()}</p>
    </div>
  );
};

export default Blank;
