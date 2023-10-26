import axios from 'axios';

export async function shortenUrl(originalUrl) {
  const encodedParams = new URLSearchParams();
  encodedParams.set('url', originalUrl);

  const options = {
    method: 'POST',
    url: 'https://url-shortener-service.p.rapidapi.com/shorten',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'a79a8dd0b6mshd9e6447d2854e78p110946jsncdb0b0d5aaf0',
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    },
    data: encodedParams,
  };

  const response = await axios.request(options);

  return response.data;
}
