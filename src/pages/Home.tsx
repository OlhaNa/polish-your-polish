import { Link } from "react-router-dom";
import Dictionary from "../types/Dictionary";
import LoadingStatus from "../types/LoadingStatus";

interface HomeProps {
  dictionaryLoadingStatus: LoadingStatus;
  dictionary?: Dictionary;
}

const Home = ({ dictionaryLoadingStatus, dictionary }: HomeProps) => {
  return (
    <>
      <h1 className="display-4">Polish your Polish</h1>
      <p className="lead">Practise your vocabulary on the go</p>
      <h2>Available topics</h2>
      {dictionary &&
        Object.entries(dictionary).map(([topic, subtopics]) => (
          <>
            <h3>{topic}</h3>
            <ul>
              {Object.keys(subtopics).map((subtopic) => (
                <li>
                  <Link to={`/flashcards/${topic}/${subtopic}`}>
                    {subtopic}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ))}
      {dictionaryLoadingStatus === "loading" && "Topics loading"}
      {dictionaryLoadingStatus === "error" &&
        "Couldn't load topics at this time"}
    </>
  );
};

export default Home;
