import { Dispatch, SetStateAction } from "react";
import { Badge, Button } from "react-bootstrap";
import Language from "../types/Language";

interface TargetLanguageSelectorProps {
  targetLanguage: Language;
  setTargetLanguage: Dispatch<SetStateAction<Language>>;
}

const TargetLanguageSelector = ({
  targetLanguage,
  setTargetLanguage,
}: TargetLanguageSelectorProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
      <Badge
        pill
        className="fs-5 fw-normal opacity-75"
        style={{ width: "7.5rem" }}
      >
        {targetLanguage === "polish" ? "English" : "Polish"}
      </Badge>
      <Button
        className="rounded-pill"
        onClick={() =>
          setTargetLanguage((targetLanguage) =>
            targetLanguage === "polish" ? "english" : "polish",
          )
        }
      >
        ⇄
      </Button>
      <Badge
        pill
        className="fs-5 fw-normal opacity-75"
        style={{ width: "7.5rem" }}
      >
        {targetLanguage === "polish" ? "Polish" : "English"}
      </Badge>
    </div>
  );
};

export default TargetLanguageSelector;
