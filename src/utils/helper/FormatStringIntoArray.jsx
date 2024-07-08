import CapitalizedFirstLetter from "./CapitalizedFirstLetter";

const formatStringIntoArray = (string) => {
  var result = [];

  let queryKey = String(string).split(",");

  queryKey.forEach((data) => {
    var splitted = data.replace(/[^a-zA-Z ]/g, "");
    splitted = CapitalizedFirstLetter(splitted);

    result.push(splitted);
  });

  return result;
};

export default formatStringIntoArray;
