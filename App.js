import './App.css';
import FormPractice from './Practice/FormPractice';
import PlayQuiz from './Practice/PlayQuiz';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FormPractice />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
