import Language from "../types/Language";
import Word from "../types/Word";

interface TargetWordInSourceLanguageProps {
  targetLanguage: Language;
  targetWord: Word;
}
const TargetWordInSourceLanguage = ({
  targetLanguage,
  targetWord,
}: TargetWordInSourceLanguageProps) => {
  return (
    <h2>
      {targetLanguage === "polish" ? targetWord.english : targetWord.polish}
    </h2>
  );
};

export default TargetWordInSourceLanguage;
