const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(
      `Status: ${res.status} StatusText: ${res.status.text}`
    );
  }
  return res.json();
};

const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => checkResponse(response));
};

const postUrl = (bodyData) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData),
  })
    .then(response => checkResponse(response));
};

export { getUrls, postUrl };