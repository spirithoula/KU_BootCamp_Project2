const currentDate = window.location.href
  .split('/day/')
  .slice(-1)
  .toString()
  .replace(/[#]/g, '');
console.log(currentDate);

document.getElementById('title').innerHTML = currentDate;
