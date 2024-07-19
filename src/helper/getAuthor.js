import axios from 'axios'
import { BASE_URL, token } from '@/helper/globalVariable'

export default async function getAuthor() {
  try {
    const response = await axios.get(BASE_URL + 'user', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.status === 200) {
      return response.data
    } else {
      console.error('API request failed:', response.status, response.statusText)
      throw new Error('Failed to get user data')
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}