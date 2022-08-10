import { useState } from 'react';
import './App.css';

import StartScreen from './components/startScreen';
import QuestionScreen from './components/questionScreen';
import blobBottom from './blob-bottom.svg';
import blobTop from './blob-top.svg';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div className='App'>
      {!gameStarted ? <StartScreen setGameStarted={setGameStarted} /> : <QuestionScreen />}
      <img src={blobBottom} alt='' className='blob-bottom' />
      <img src={blobTop} alt='' className='blob-top' />
    </div>
  );
}

export default App;
