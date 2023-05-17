export const parseSearchString = (queryStr) => {
  if (queryStr?.length > 0) {
    const wordsArray = queryStr.match(/("[^"]+"|[^"\s]+)/g);
    let resStr = "";
    wordsArray?.forEach((element, index) => {
      resStr += element + (index < wordsArray.length - 1 ? "+" : "");
    });
    return resStr
  }
  return "";
}