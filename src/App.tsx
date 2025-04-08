import { useState } from "react";
import { Badge, Button, Card, CardBody, ProgressBar } from "react-bootstrap";
import "./App.scss";

type Language = "english" | "polish";

type Word = { [language in Language]: string };

const getShuffledArray = <T,>(array: T[]) => {
  return array
    .map((item) => ({ item, sortKey: Math.random() }))
    .sort((item1, item2) => item1.sortKey - item2.sortKey)
    .map(({ item }) => item);
};

const chooseRandomDecoyWord = (words: Word[], targetWord: Word) => {
  const wordsWithoutTargetWord = words.filter((word) => word !== targetWord);
  const randomIndex = Math.floor(wordsWithoutTargetWord.length * Math.random());
  return wordsWithoutTargetWord[randomIndex];
};

const translations: Word[] = [
  {
    english: "Monday",
    polish: "poniedziałek",
  },
  {
    english: "Tuesday",
    polish: "wtorek",
  },
  {
    english: "Wednesday",
    polish: "środa",
  },
  {
    english: "Thursday",
    polish: "czwartek",
  },
  {
    english: "Friday",
    polish: "piątek",
  },
  {
    english: "Saturday",
    polish: "sobota",
  },
  {
    english: "Sunday",
    polish: "niedziela",
  },
];

function App() {
  const [shuffledWords] = useState<Word[]>(getShuffledArray(translations));
  const [targetLanguage, setTargetLanguage] = useState<Language>("polish");
  const [targetWordIndex, setTargetWordIndex] = useState<number>();
  const [wordOptions, setWordOptions] = useState<Word[]>();
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [isChecking, setChecking] = useState<boolean>(false);

  return (
    <>
      {/* Show target language selector */}
      <Card>
        <CardBody>
          <Badge pill>
            {targetLanguage === "polish" ? "English" : "Polish"}
          </Badge>
          <Button
            onClick={() =>
              setTargetLanguage((targetLanguage) =>
                targetLanguage === "polish" ? "english" : "polish",
              )
            }
          >
            ⇄
          </Button>
          <Badge pill>
            {targetLanguage === "polish" ? "Polish" : "English"}
          </Badge>
        </CardBody>
      </Card>

      {targetWordIndex !== undefined && (
        <>
          {/* Show target word in source language */}
          <h2>
            {targetLanguage === "polish"
              ? shuffledWords[targetWordIndex].english
              : shuffledWords[targetWordIndex].polish}
          </h2>
          {/* Show the target and decoy words in target language */}
          {wordOptions!.map((word) => (
            <Button
              variant={
                isChecking && word === shuffledWords[targetWordIndex]
                  ? "success"
                  : isChecking && word === selectedWord
                    ? "danger"
                    : word === selectedWord
                      ? "info"
                      : "secondary"
              }
              onClick={() => {
                setSelectedWord(word);
              }}
            >
              {targetLanguage === "polish" ? word!.polish : word!.english}
            </Button>
          ))}
        </>
      )}

      {/* Start/Check/Next button */}
      {targetWordIndex === undefined && (
        <Button
          onClick={() => {
            const index = 0;
            setTargetWordIndex(index);
            const newDecoyWord = chooseRandomDecoyWord(
              shuffledWords,
              shuffledWords[index],
            );
            setWordOptions(
              getShuffledArray([shuffledWords[index], newDecoyWord]),
            );
          }}
        >
          Start
        </Button>
      )}
      {targetWordIndex !== undefined && !isChecking && (
        <Button
          onClick={() => {
            setChecking(true);
          }}
          disabled={!selectedWord}
        >
          Check
        </Button>
      )}
      {targetWordIndex !== undefined &&
        isChecking &&
        targetWordIndex < shuffledWords.length - 1 && (
          <Button
            onClick={() => {
              const index = targetWordIndex + 1;
              setTargetWordIndex((targetWordIndex) => targetWordIndex! + 1);
              const newDecoyWord = chooseRandomDecoyWord(
                shuffledWords,
                shuffledWords[index],
              );
              setWordOptions(
                getShuffledArray([shuffledWords[index], newDecoyWord]),
              );
              setSelectedWord(undefined);
              setChecking(false);
            }}
          >
            Next
          </Button>
        )}
      {targetWordIndex !== undefined &&
        isChecking &&
        targetWordIndex === shuffledWords.length - 1 && (
          <Button onClick={() => {}}>Finish</Button>
        )}
      <ProgressBar
        now={
          (100 * ((targetWordIndex ?? 0) + (isChecking ? 1 : 0))) /
          shuffledWords.length
        }
      />
    </>
  );
}

export default App;
