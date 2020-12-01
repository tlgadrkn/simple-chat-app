const { request } = require('express');
const fetchTest = require('./fetchTest');

test('server should return status code 200', () => {
  fetchTest().then((data) => {
    expect(data).toEqual(200);
  });
});
