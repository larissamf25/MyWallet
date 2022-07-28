const fetchAPI = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(url)
    .then((response) => (response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};

export default fetchAPI;
