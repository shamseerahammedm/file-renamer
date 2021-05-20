
import { dataBase } from 'dexie.config';
import HomePage from 'pages/HomePage/HomePage';
import './App.css';

// Initializing DB
const db = new dataBase('fileZipper');

function App() {
  return (
    <HomePage/>
  );
}

export default App;

export {
  db
};
