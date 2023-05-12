import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          {/* <Route path="/menu" exact component={Menu} /> */}
          {/* <Route path="/about" exact component={About} /> */}
          <Route path="/contact" exact component={Contact} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
