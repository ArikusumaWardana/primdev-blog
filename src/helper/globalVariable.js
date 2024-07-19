// Function to truncate text
export function truncateText(text, length) {
  return text.length > length ? text.substring(0, length) + '...' : text;
}


// Variable for get the API 
export const BASE_URL = 'https://primdev.alwaysdata.net/api/'

// Variable for get the token from local storage
export const token = localStorage.getItem('token')
  