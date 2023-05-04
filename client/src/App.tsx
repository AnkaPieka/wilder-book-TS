import "./App.css";
import WildersBook from "./pages/WildersBook/WildersBook";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <WildersBook />
      <Footer />
    </div>
  );
}

export default App;
