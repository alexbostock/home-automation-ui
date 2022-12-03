import './App.css';
import HueStatus from './HueStatus';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home automation</h1>
        <HueStatus></HueStatus>
      </header>
      <main>
        <p>Main content here</p>
      </main>
    </div>
  );
}

export default App;
