const fetchData = async () => {
  const res = await fetch('http://localhost:3000/messages');
  const data = await res.json();

  return data;
};

module.exports = fetchData;
