import './App.css';
import HueLights from './HueLights';
import HueStatus from './HueStatus';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home automation</h1>
        <HueStatus></HueStatus>
      </header>
      <main>
        <HueLights></HueLights>
      </main>
    </div>
  );
}

export default App;
