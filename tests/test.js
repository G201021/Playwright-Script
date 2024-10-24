// Create a new Date object with the given date
const dateString = "8/26/1995";
const date = new Date(dateString);

// Get the milliseconds since the Unix epoch
const milliseconds = date.getTime();

console.log(milliseconds);
