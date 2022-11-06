export const isPeselNumberValid = (pesel: string) => {
  if (!pesel) {
    return false;
  }

  return pesel.length === 11;
};
