var socket = io('http://localhost:3000');

var messages = document.getElementById('messages');
var form = document.getElementById('my-form');
var input = document.getElementById('text-input');

var alertsClasses = [
  'alert-light',
  'alert-primary',
  'alert-secondary',
  'alert-success',
  'alert-danger',
  'alert-warning',
  'alert-info',
  'alert-dark',
];

function createAlert(text, alertIndex) {
  var div = document.createElement('div');
  var t = document.createTextNode(text);
  var classIndex =
    alertIndex || Math.floor(Math.random() * alertsClasses.length);
  div.appendChild(t);
  div.classList.add('alert');
  div.classList.add(alertsClasses[classIndex]);
  div.setAttribute('role', 'alert');
  return div;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = input.value;
  if (message.length) {
    socket.send(message);
    input.value = '';
  }
});

localStorage.debug = '*';<

socket
  .on('greeting-from-server', function (message) {
    messages.appendChild(createAlert(message.greeting, 4));

    socket.emit('greeting-from-client', {
      greeting: 'Hello Server',
    });
  })
  .on('message', function (message) {
    messages.appendChild(createAlert(message, 1));
  });
