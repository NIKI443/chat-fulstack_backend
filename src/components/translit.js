export const rusTranslitToEng = function (str, isLowerCase, wordSeparator) {
  str = str || "";
  isLowerCase = isLowerCase || true;
  wordSeparator = wordSeparator || "-";

  let translitToEng = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "YO",
    Ж: "ZH",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "KH",
    Ц: "TS",
    Ч: "CH",
    Ш: "SH",
    Щ: "SCH",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "YU",
    Я: "YA",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  if (isLowerCase) {
    str = str.toLowerCase();
  }

  str = str.replace(/[^a-zA-Zа-яёА-ЯЁ0-9_]+/g, wordSeparator);

  let regex = new RegExp("^" + wordSeparator + "|" + wordSeparator + "$", "g");
  str = str.replace(regex, "");

  // Обработка исключений
  str = str.replace(/ъе/g, "ye");

  regex = new RegExp("ый" + wordSeparator + "|ий" + wordSeparator, "g");
  str = str.replace(regex, "iy" + wordSeparator);
  str = str.replace(/ый$|ий$/g, "iy");

  str = str.replace(/ь([аоуыиэеАОУЫИЭЕ])/g, "y$1");

  if (!isLowerCase) {
    str = str.replace(/ЪЕ/g, "YE");
    str = str.replace(/ъЕ/g, "yE");
    str = str.replace(/Ъе/g, "Ye");

    regex = new RegExp("ЫЙ" + wordSeparator + "|ИЙ" + wordSeparator, "g");
    str = str.replace(regex, "IY" + wordSeparator);

    regex = new RegExp("ыЙ" + wordSeparator + "|иЙ" + wordSeparator, "g");
    str = str.replace(regex, "iY" + wordSeparator);

    regex = new RegExp("Ый" + wordSeparator + "|Ий" + wordSeparator, "g");
    str = str.replace(regex, "Iy" + wordSeparator);

    str = str.replace(/ЫЙ$|ИЙ$/g, "IY");
    str = str.replace(/ыЙ$|иЙ$/g, "iY");
    str = str.replace(/Ый$|Ий$/g, "Iy");

    str = str.replace(/Ь([аоуыиэеАОУЫИЭЕ])/g, "Y$1");
  }

  str = str.replace(/[а-яёА-ЯЁ]/g, function (a) {
    return translitToEng[a];
  });
  return str;
};

export const setUserID = function (name, surname) {
  let UserID = name + " " + surname;
  
  UserID = rusTranslitToEng(UserID, false, "_");

  return UserID;
};
