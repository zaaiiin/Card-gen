import confetti from "./assets/logowithconfetti.png";
import title from "./assets/CardGen.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={title} alt="title" id="title" />
        <div className="mainImg">
          <img src={confetti} alt="confettiwithlogo" id="confettiwithlogo" />
        </div>

        <div id="container">
          <div id="center">
            <p>
              <span className="lightGreen">Birthday </span>&nbsp;
              <span className="darkGreen">Reminders</span>&nbsp;and&nbsp;
              <span className="lightGreen"> Greeting </span>&nbsp;
              <span className="darkGreen">Cards.</span>
            </p>
          </div>
        </div>
        <div>
          <button type="button">---></button>
        </div>
      </header>
    </div>
  );
}

export default App;
