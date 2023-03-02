import { useEffect, useState } from 'react'
import './App.css'

/**
 * LOGIK
 * När sidan laddas, kontrollera om det finns sparat i localStorage ett datum för när djuret är matat
 * Om JA, kontrollera om det gått mer än 3 timmar sedan matning
 *  Om JA, aktivera matningsknappen
 *  Om NEJ, avaktivera matningsknappen
 * Om NEJ, aktivera matningsknappen
 * 
 * Vid klick på matningsknappen, avaktivera knappen och uppdatera datum i localStorage.
 */

function App() {
  const [isFed, setIsFed] = useState(false);
  const [fedTime, setFedTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check on load of component, if animal is fed
    const storedTime = localStorage.getItem('animal-1-feed-time'); // TODO: Same ID all the time now
    if (storedTime === null) {
      // Animal has never been fed
    } else {
      checkIfNeedsFood(storedTime);
    }
  }, []);

  function checkIfNeedsFood(lastFed: string) {
    const lastFedDate = new Date(lastFed);
    const rightNow = new Date();

    // TODO - Handle if day has changed too
    // tip: https://bfy.tw/TsVk
    if (lastFedDate.getHours() + 3 < rightNow.getHours()) {
      // Time to feed again
      setIsFed(false);
    } else {
      setIsFed(true);
    }
  }

  function feedAnimal() {
    setIsFed(true);
    localStorage.setItem('animal-1-feed-time', new Date().toString());  // TODO: Same ID all the time now
  }

  return (
    <div className="App">
      <button onClick={feedAnimal} disabled={isFed}>Mata</button>
    </div>
  )
}

export default App
