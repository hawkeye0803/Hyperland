import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin, Game, Home } from "./pages";
import { ChatBox } from "./components";
import { useStore } from "./hooks/useStore";

function App() {
  const [chatBar] = useStore((state) => [state.chatBar]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/land/:id" exact element={<Game />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
      {chatBar && <ChatBox />}
    </div>
  );
}

export default App;
