import { Dispatch, SetStateAction } from "react";
import { Badge, Button, Card, CardBody } from "react-bootstrap";
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
    <Card>
      <CardBody>
        <Badge pill>{targetLanguage === "polish" ? "English" : "Polish"}</Badge>
        <Button
          onClick={() =>
            setTargetLanguage((targetLanguage) =>
              targetLanguage === "polish" ? "english" : "polish",
            )
          }
        >
          ⇄
        </Button>
        <Badge pill>{targetLanguage === "polish" ? "Polish" : "English"}</Badge>
      </CardBody>
    </Card>
  );
};

export default TargetLanguageSelector;
