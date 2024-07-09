const formatStringToTestId = (input) => {
    // Check if the input is a string, if not, convert it to a string
    const string = typeof input === "string" ? input : String(input);
  
    // Convert the string to lowercase
    const lowercaseStr = string.toLowerCase();
  
    // Remove special characters like &, ()
    const formattedStr = lowercaseStr.replace(/[&(),]/g, "");
  
    // Replace spaces with dashes
    const cleanedStr = formattedStr.replace(/\s+/g, "-");
  
    return cleanedStr;
  };
  
  export default formatStringToTestId;
  