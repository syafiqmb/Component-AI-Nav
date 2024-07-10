const formatSourceToString = (string) => {
    var queryKey = string.replace(/_/g, " ").replace(/[^a-zA-Z& ]/g, "");
  
    if (queryKey.includes("deloitte curation")) {
      var result = String(queryKey).split("deloitte curation");
      queryKey = result[1];
    }
  
    return queryKey;
  };
  
  export default formatSourceToString;