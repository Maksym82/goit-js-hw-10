import {
    BASE_URL,
    API_KEY,
    ALLBREEDS_ENDPOINT,
    SEARCH_ENDPOINT,
  } from './references-api';
  
  const myHeaders = new Headers();
  myHeaders.append('x-api-key', API_KEY);
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  
  function fetchBreeds() {
    return fetch(`${BASE_URL}${ALLBREEDS_ENDPOINT}`, requestOptions).then(
      resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      }
    );
  }
  
  function fetchCatByBreed(breedId) {
    return fetch(
      `${BASE_URL}${SEARCH_ENDPOINT}?breed_ids=${breedId}`,
      requestOptions
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
  }
  
  export { fetchBreeds, fetchCatByBreed };