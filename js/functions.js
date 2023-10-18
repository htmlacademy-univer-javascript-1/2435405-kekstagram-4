const stringLength = (string, length)=> string.length <= length;
stringLength('строкаменьше20', 20);
stringLength('строкаменьше18', 18);
stringLength('строкадлиннее10', 10);

const isStringPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = newString.length - 1; i >= 0; i--)
  {
    reverseString += newString[i];
  }
  if (reverseString === newString)
  {
    return true;
  }
  return false;

};
isStringPalindrome('А роза упала на лапу Азора');
