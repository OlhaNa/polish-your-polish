import Word from "./Word";

type Dictionary = {
  [topic: string]: {
    [subtopic: string]: Word[];
  };
};

export default Dictionary;
