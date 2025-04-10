import { Accordion, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dictionary from "../types/Dictionary";
import LinkTypeForButton from "../types/LinkTypeForButton";
import LoadingStatus from "../types/LoadingStatus";

interface HomeProps {
  dictionaryLoadingStatus: LoadingStatus;
  dictionary?: Dictionary;
}

const Home = ({ dictionaryLoadingStatus, dictionary }: HomeProps) => {
  return (
    <>
      <h1>Polish your Polish</h1>
      <p>Practise your vocabulary on the go</p>
      <h2>Available topics</h2>
      {dictionary && (
        <Accordion>
          {Object.entries(dictionary).map(([topic, subtopics]) => (
            <Accordion.Item eventKey={topic}>
              <Accordion.Header as="h3">{topic}</Accordion.Header>
              <Accordion.Body>
                <ul className="row g-3 list-unstyled">
                  {Object.keys(subtopics).map((subtopic) => (
                    <li className="col-6 col-sm-4">
                      <Button
                        as={Link as LinkTypeForButton}
                        to={`/flashcards/${topic}/${subtopic}`}
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "6rem" }}
                      >
                        {subtopic}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      {dictionaryLoadingStatus === "loading" && (
        <Spinner animation="border" variant="primary" />
      )}
      {dictionaryLoadingStatus === "error" && (
        <>
          <h3>Couldn't load topics at this time.</h3>
          <p>Please try refreshing the page.</p>
        </>
      )}
    </>
  );
};

export default Home;
