import { useMemo, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import AdvanceButton from "./components/AdvanceButton";
import TargetLanguageSelector from "./components/TargetLanguageSelector";
import TargetWordInSourceLanguage from "./components/TargetWordInSourceLanguage";
import WordOptionsInTargetLanguage from "./components/WordOptionsInTargetLanguage";
import { words } from "./data/WordData";
import Language from "./types/Language";
import Word from "./types/Word";
import { getShuffledArray } from "./utils/ArrayUtils";
import { computeProgress } from "./utils/ProgressUtils";
import "./App.scss";

function App() {
  const shuffledWords = useMemo(() => getShuffledArray(words), []);
  const [targetLanguage, setTargetLanguage] = useState<Language>("polish");
  const [targetWordIndex, setTargetWordIndex] = useState<number>();
  const targetWord = useMemo(
    () =>
      targetWordIndex !== undefined
        ? shuffledWords[targetWordIndex]
        : undefined,
    [shuffledWords, targetWordIndex],
  );
  const [wordOptions, setWordOptions] = useState<Word[]>();
  const [selectedWord, setSelectedWord] = useState<Word>();
  const [isChecking, setChecking] = useState<boolean>(false);

  return (
    <>
      <TargetLanguageSelector
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
      />

      {targetWord !== undefined && wordOptions !== undefined && (
        <>
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

      <ProgressBar
        now={computeProgress(
          targetWordIndex ?? 0,
          isChecking,
          shuffledWords.length,
        )}
      />
    </>
  );
}

export default App;
