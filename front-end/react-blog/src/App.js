import Navbar from './components/Navbar';
import Home from './routes/Home';
import Create from './routes/Create';
import BlogsDetails from './routes/BlogsDetails';
import NotFound from './routes/NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/create" exact={true} element={<Create />} />
            <Route path="/blogs/:id" exact={true} element={<BlogsDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
