const timestamp = document.getElementById('timestamp');
const currentDate = document.getElementById('current-date');

timestamp.innerText = dayjs().format('h:mm A');
currentDate.innerText = dayjs().format('MMMM D, YYYY');