import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import Language from "../types/Language";
import Word from "../types/Word";

interface WordOptionInTargetLanguageProps {
  word: Word;
  targetLanguage: Language;
  targetWord: Word;
  selectedWord: Word | undefined;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
  isChecking: boolean;
}
const WordOptionInTargetLanguage = ({
  word,
  targetLanguage,
  targetWord,
  selectedWord,
  setSelectedWord,
  isChecking,
}: WordOptionInTargetLanguageProps) => {
  return (
    <Button
      size="lg"
      variant={
        isChecking && word === targetWord
          ? "success"
          : isChecking && word === selectedWord
            ? "danger"
            : isChecking
              ? "secondary"
              : word === selectedWord
                ? "primary"
                : "info"
      }
      className="d-flex justify-content-center align-items-center"
      style={{ width: "8.75rem", height: "5rem" }}
      disabled={isChecking}
      onClick={() => {
        setSelectedWord(word);
      }}
    >
      {targetLanguage === "polish" ? word.polish : word.english}
    </Button>
  );
};

interface WordOptionsInTargetLanguageProps {
  wordOptions: Word[];
  targetLanguage: Language;
  targetWord: Word;
  selectedWord: Word | undefined;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
  isChecking: boolean;
}
const WordOptionsInTargetLanguage = ({
  wordOptions,
  targetLanguage,
  targetWord,
  selectedWord,
  setSelectedWord,
  isChecking,
}: WordOptionsInTargetLanguageProps) => {
  return (
    <div className="d-flex justify-content-center gap-3 mt-3 mb-3">
      {wordOptions.map((word) => (
        <WordOptionInTargetLanguage
          word={word}
          targetLanguage={targetLanguage}
          targetWord={targetWord}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
          isChecking={isChecking}
        />
      ))}
    </div>
  );
};

export default WordOptionsInTargetLanguage;
