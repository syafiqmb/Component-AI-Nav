const CapitalizedFirstLetter = (sentence) => {
    var newWord = "";
    let words = sentence.split(" ");
  
    if (Array(words).length !== 0) {
      for (let i = 0; i < words.length; i++) {
        if (String(words[i]).length !== 0) {
          for (let j = 0; j < String(words[i]).length; j++) {
            if (j === 0) {
              newWord += String(words[i]).charAt(j).toUpperCase();
            } else {
              newWord += String(words[i]).charAt(j).toLowerCase();
            }
          }
          newWord += " ";
        }
      }
    }
  
    return newWord;
  };
  
  export default CapitalizedFirstLetter;
  