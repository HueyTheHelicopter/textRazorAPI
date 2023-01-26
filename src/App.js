import './App.css';
import { useState } from 'react';
import { TextContext } from './context/Context';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={{text, setText}}>
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </header>
    </div>
    </TextContext.Provider>
  );
}

export default App;
