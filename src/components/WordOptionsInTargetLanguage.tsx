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
      variant={
        isChecking && word === targetWord
          ? "success"
          : isChecking && word === selectedWord
            ? "danger"
            : word === selectedWord
              ? "info"
              : "secondary"
      }
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
  return wordOptions.map((word) => (
    <WordOptionInTargetLanguage
      word={word}
      targetLanguage={targetLanguage}
      targetWord={targetWord}
      selectedWord={selectedWord}
      setSelectedWord={setSelectedWord}
      isChecking={isChecking}
    />
  ));
};

export default WordOptionsInTargetLanguage;
