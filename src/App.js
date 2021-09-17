import Album from "./_components/Album.js";
import Header from "./_components/Header.js";

class App {
  constructor($target) {
    const header = new Header($target);
    const album = new Album($target);
  }
}

export default App;
