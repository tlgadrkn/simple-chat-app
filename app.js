const messageBody = document.querySelector('#messagesBody');
const senderInput = document.querySelector('#sender');
const messageTextarea = document.querySelector('#message');
const sendMessageBtn = document.querySelector('#sendMessageBtn');

const messages = [];

async function getData() {
  let response = await fetch('http://localhost:3000/messages');
  let data = await response.json();
  console.log(data);

  if (data.length === 0) {
    console.log('no messages yet');
    return;
  }

  for (message of data) {
    console.log(message);
    const element = document.createElement('p');
    element.textContent = `${message.sender}: ${message.message} `;
    messageBody.appendChild(element);
  }
}
async function postData(data) {
  const response = await fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const d = await response;
  console.log(d);
}

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
});
