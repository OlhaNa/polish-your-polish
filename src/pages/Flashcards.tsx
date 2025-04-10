import { useMemo, useState } from "react";
import { Card, ProgressBar, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdvanceButton from "../components/AdvanceButton";
import TargetLanguageSelector from "../components/TargetLanguageSelector";
import TargetWordInSourceLanguage from "../components/TargetWordInSourceLanguage";
import WordOptionsInTargetLanguage from "../components/WordOptionsInTargetLanguage";
import Dictionary from "../types/Dictionary";
import Language from "../types/Language";
import LoadingStatus from "../types/LoadingStatus";
import Word from "../types/Word";
import { getShuffledArray } from "../utils/ArrayUtils";
import { computeProgress } from "../utils/ProgressUtils";
import { capitalise } from "../utils/WordUtils";
import NotFound from "./NotFound";

interface FlashcardsProps {
  dictionaryLoadingStatus: LoadingStatus;
  dictionary?: Dictionary;
}
const Flashcards = ({
  dictionaryLoadingStatus,
  dictionary,
}: FlashcardsProps) => {
  const { topic, subtopic } = useParams();
  const shuffledWords = useMemo(
    () =>
      topic &&
      subtopic &&
      dictionary &&
      dictionary[topic] &&
      dictionary[topic][subtopic]
        ? getShuffledArray(dictionary[topic][subtopic])
        : undefined,
    [topic, subtopic, dictionary],
  );
  const [targetLanguage, setTargetLanguage] = useState<Language>("polish");
  const [targetWordIndex, setTargetWordIndex] = useState<number>();
  const targetWord = useMemo(
    () =>
      shuffledWords !== undefined && targetWordIndex !== undefined
        ? shuffledWords[targetWordIndex]
        : undefined,
    [shuffledWords, targetWordIndex],
  );
  const [wordOptions, setWordOptions] = useState<Word[]>();
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [isChecking, setChecking] = useState<boolean>(false);

  if (!shuffledWords) {
    if (dictionaryLoadingStatus === "loading") {
      return <Spinner animation="border" variant="primary" />;
    }

    if (dictionaryLoadingStatus === "error") {
      return (
        <>
          <h3>Couldn't load topic at this time.</h3>
          <p>Please try refreshing the page.</p>
        </>
      );
    }
    return <NotFound />;
  }

  return (
    <>
      <h1>
        {topic}: {subtopic}
      </h1>
      <Card>
        <Card.Body>
          <TargetLanguageSelector
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
          />

          {targetWord !== undefined && wordOptions !== undefined && (
            <>
              <p className="mb-0">
                Select the {capitalise(targetLanguage)} word for
              </p>
              <TargetWordInSourceLanguage
                targetLanguage={targetLanguage}
                targetWord={targetWord}
              />

              <WordOptionsInTargetLanguage
                wordOptions={wordOptions}
                targetLanguage={targetLanguage}
                targetWord={targetWord}
                selectedWord={selectedWord}
                setSelectedWord={setSelectedWord}
                isChecking={isChecking}
              />
            </>
          )}

          <div className="mb-2">
            <AdvanceButton
              shuffledWords={shuffledWords}
              targetWordIndex={targetWordIndex}
              setTargetWordIndex={setTargetWordIndex}
              targetWord={targetWord}
              setWordOptions={setWordOptions}
              selectedWord={selectedWord}
              setSelectedWord={setSelectedWord}
              isChecking={isChecking}
              setChecking={setChecking}
            />
          </div>

          <p className="mb-1">
            Progress:{" "}
            {computeProgress(
              targetWordIndex ?? 0,
              isChecking,
              shuffledWords.length,
            )}
            %
          </p>

          <ProgressBar
            now={computeProgress(
              targetWordIndex ?? 0,
              isChecking,
              shuffledWords.length,
            )}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Flashcards;
