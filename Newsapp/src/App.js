import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App =()=> {
  const pageSize=9;
  const apiKey=process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
        <LoadingBar
            height={3}
            color="#f11946"
            progress={progress}
        />
          <Navbar/>
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} key="general"  apiKey={apiKey} pageSize={pageSize} category="general" />} />
            <Route path="/business" element={<News setProgress={setProgress} key="business" apiKey={apiKey} pageSize={pageSize} category="business" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey} pageSize={pageSize} category="entertainment" />} />
            <Route path="/general" element={<News setProgress={setProgress} key="general" apiKey={apiKey} pageSize={pageSize} category="general" />} />
            <Route path="/health" element={<News setProgress={setProgress} key="health" apiKey={apiKey} pageSize={pageSize} category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress} key="science" apiKey={apiKey} pageSize={pageSize} category="science" />} />
            <Route path="/sports" element={<News setProgress={setProgress} key="sports" apiKey={apiKey} pageSize={pageSize} category="sports" />} />
            <Route path="/technology" element={<News setProgress={setProgress} key="technology" apiKey={apiKey} pageSize={pageSize} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;
