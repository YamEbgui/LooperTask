import "./App.css";
import Raw from "./components/Raw";

function App() {
  return (
    <div className="App">
      <Raw
        sound={`${process.env.PUBLIC_URL}/loopFiles/_tambourine_shake_higher.mp3`}
      ></Raw>
    </div>
  );
}

export default App;
