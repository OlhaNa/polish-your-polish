import Papa from "papaparse";
import Dictionary from "../types/Dictionary";

interface DataRow {
  topic: string;
  subtopic: string;
  english: string;
  polish: string;
}

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmM7H1tdP4zJWOnXXOpFX4whJUrzvFZZLQ-asJ6kqdodG9hQTVfooKfNXGKNd67xnYPGBVAIe-HdNR/pub?gid=0&single=true&output=csv";

export const getDictionary = async () => {
  const response = await fetch(sheetUrl);
  const data = await response.text();
  const dataRows = Papa.parse<DataRow>(data, { header: true }).data;
  const dictionary: Dictionary = {};
  dataRows.forEach((dataRow) => {
    if (!(dataRow.topic in dictionary)) {
      dictionary[dataRow.topic] = {};
    }
    if (!(dataRow.subtopic in dictionary[dataRow.topic])) {
      dictionary[dataRow.topic][dataRow.subtopic] = [];
    }
    dictionary[dataRow.topic][dataRow.subtopic].push({
      english: dataRow.english,
      polish: dataRow.polish,
    });
  });

  return dictionary;
};
