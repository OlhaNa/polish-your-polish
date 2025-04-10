import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeButton from "./components/HomeButton";
import { getDictionary } from "./data/WordData";
import Flashcards from "./pages/Flashcards";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dictionary from "./types/Dictionary";
import LoadingStatus from "./types/LoadingStatus";
import "./App.scss";

const App = () => {
  const [dictionaryLoadingStatus, setDictionaryLoadingStatus] =
    useState<LoadingStatus>("loading");
  const [dictionary, setDictionary] = useState<Dictionary>();

  useEffect(() => {
    getDictionary()
      .then((data) => {
        setDictionary(data);
        setDictionaryLoadingStatus("success");
      })
      .catch(() => {
        setDictionaryLoadingStatus("error");
      });
  }, []);

  return (
    <Router>
      <Container className="App position-relative">
        <HomeButton />
        <Routes>
          <Route
            index
            element={
              <Home
                dictionaryLoadingStatus={dictionaryLoadingStatus}
                dictionary={dictionary}
              />
            }
          />
          <Route
            path="/flashcards/:topic/:subtopic"
            element={
              <Flashcards
                dictionaryLoadingStatus={dictionaryLoadingStatus}
                dictionary={dictionary}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
