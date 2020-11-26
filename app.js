const messageBody = document.querySelector('#messagesBody');
const senderInput = document.querySelector('#sender');
const messageTextarea = document.querySelector('#message');
const sendMessageBtn = document.querySelector('#sendMessageBtn');

const socket = io();

const getData = async () => {
  let response = await fetch('http://localhost:3000/messages');
  let data = await response.json();
  console.log(data);

  if (data.length === 0) {
    console.log('no messages yet');
  }

  messageBody.innerHTML = ``;
  createElements('li', data, 'list-group-item');
};

const createElements = (tag, textContent = '', className = '') => {
  const text = [...textContent];

  if (!tag) {
    throw new Error('Please provide a tag name to create element.');
  }

  for (t of text) {
    const element = document.createElement(tag);
    element.textContent = `${t.sender}: ${t.message}`;
    if (className) element.setAttribute('class', className);
    messageBody.appendChild(element);
  }
};

const postData = async (data) => {
  const response = await fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  getData();
};

function validateForm() {
  const senderVal = senderInput.value;
  if (!senderVal.trim()) {
    alert('Please enter your name to send message');
    return;
  }
  console.log('validate success');
}

window.addEventListener('load', () => {
  getData();
});
socket.on('message', getData);

sendMessageBtn.addEventListener('click', () => {
  const senderVal = senderInput.value;
  const messageVal = messageTextarea.value;
  const data = {
    sender: senderVal,
    message: messageVal,
  };

  validateForm();
  console.log(JSON.stringify(data));
  postData(data);
  senderInput.value = '';
  messageTextarea.value = '';
});
