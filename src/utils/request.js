export default (url, method, body) => fetch(url, {
  method,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
  .then(response => {
    if (response.status == 200) {
      return response.json();
    }
    throw new Error(response.statusText);
  }).then(data => {
    if(data.code != "0") {
      throw new Error(data.msg);
    }
    return data;
  });
