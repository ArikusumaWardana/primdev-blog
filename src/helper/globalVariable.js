// Function to truncate text to a specified length
export const truncateText = (text, length) => {
    // If the text is shorter than or equal to the desired length, return the original text
    if (text.length <= length) return text;
    // Otherwise, truncate the text to the desired length and add an ellipsis
    return text.slice(0, length) + '...';
  }
  