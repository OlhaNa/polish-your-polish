import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LinkTypeForButton from "../types/LinkTypeForButton";
import Word from "../types/Word";
import {
  chooseRandomItemExcluding,
  getShuffledArray,
} from "../utils/ArrayUtils";

interface StartButtonProps {
  shuffledWords: Word[];
  setTargetWordIndex: Dispatch<SetStateAction<number | undefined>>;
  setWordOptions: Dispatch<SetStateAction<Word[] | undefined>>;
}
const StartButton = ({
  shuffledWords,
  setTargetWordIndex,
  setWordOptions,
}: StartButtonProps) => {
  return (
    <Button
      size="lg"
      onClick={() => {
        const startIndex = 0;
        const firstTargetWord = shuffledWords[startIndex];
        const firstDecoyWord = chooseRandomItemExcluding(
          shuffledWords,
          firstTargetWord,
        );
        setTargetWordIndex(startIndex);
        setWordOptions(getShuffledArray([firstTargetWord, firstDecoyWord]));
      }}
    >
      Start
    </Button>
  );
};

interface CheckButtonProps {
  setChecking: Dispatch<SetStateAction<boolean>>;
  selectedWord: Word | undefined;
}
const CheckButton = ({ setChecking, selectedWord }: CheckButtonProps) => {
  return (
    <Button
      size="lg"
      onClick={() => setChecking(true)}
      disabled={!selectedWord}
    >
      Check
    </Button>
  );
};

interface NextButtonProps {
  targetWordIndex: number;
  setTargetWordIndex: Dispatch<SetStateAction<number | undefined>>;
  shuffledWords: Word[];
  setWordOptions: Dispatch<SetStateAction<Word[] | undefined>>;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
  setChecking: Dispatch<SetStateAction<boolean>>;
}
const NextButton = ({
  targetWordIndex,
  setTargetWordIndex,
  shuffledWords,
  setWordOptions,
  setSelectedWord,
  setChecking,
}: NextButtonProps) => {
  return (
    <Button
      size="lg"
      onClick={() => {
        const nextIndex = targetWordIndex + 1;
        const nextTargetWord = shuffledWords[nextIndex];
        const nextDecoyWord = chooseRandomItemExcluding(
          shuffledWords,
          nextTargetWord,
        );
        setTargetWordIndex((targetWordIndex) => targetWordIndex! + 1);
        setWordOptions(getShuffledArray([nextTargetWord, nextDecoyWord]));
        setSelectedWord(undefined);
        setChecking(false);
      }}
    >
      Next
    </Button>
  );
};

const FinishButton = () => {
  return (
    <Button size="lg" as={Link as LinkTypeForButton} to="/">
      Finish
    </Button>
  );
};

interface AdvanceButtonProps {
  shuffledWords: Word[];
  targetWordIndex: number | undefined;
  setTargetWordIndex: Dispatch<SetStateAction<number | undefined>>;
  targetWord: Word | undefined;
  setWordOptions: Dispatch<SetStateAction<Word[] | undefined>>;
  selectedWord: Word | undefined;
  setSelectedWord: Dispatch<SetStateAction<Word | undefined>>;
  isChecking: boolean;
  setChecking: Dispatch<SetStateAction<boolean>>;
}

const AdvanceButton = ({
  shuffledWords,
  targetWordIndex,
  setTargetWordIndex,
  targetWord,
  setWordOptions,
  selectedWord,
  setSelectedWord,
  isChecking,
  setChecking,
}: AdvanceButtonProps) => {
  if (targetWord === undefined) {
    return (
      <StartButton
        shuffledWords={shuffledWords}
        setTargetWordIndex={setTargetWordIndex}
        setWordOptions={setWordOptions}
      />
    );
  }
  if (targetWord !== undefined && !isChecking) {
    return (
      <CheckButton setChecking={setChecking} selectedWord={selectedWord} />
    );
  }
  if (
    targetWord !== undefined &&
    isChecking &&
    targetWordIndex! < shuffledWords.length - 1
  ) {
    return (
      <NextButton
        targetWordIndex={targetWordIndex!}
        setTargetWordIndex={setTargetWordIndex}
        shuffledWords={shuffledWords}
        setWordOptions={setWordOptions}
        setSelectedWord={setSelectedWord}
        setChecking={setChecking}
      />
    );
  }
  return <FinishButton />;
};

export default AdvanceButton;
