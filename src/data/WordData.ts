import Dictionary from "../types/Dictionary";

const dictionary: Dictionary = {
  time: {
    days: [
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
    ],
  },
};

export const getDictionary = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return dictionary;
};
