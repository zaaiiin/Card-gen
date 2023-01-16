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

        <p>
          <span class="lightGreen">Birthday </span>
          <span class="darkGreen">Reminders</span> and
          <span class="lightGreen"> Greeting </span>
          <span class="darkGreen">Cards</span>
        </p>
      </header>
    </div>
  );
}

export default App;
