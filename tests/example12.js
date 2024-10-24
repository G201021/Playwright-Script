const { chromium } = require("playwright"); // Import the Playwright library, specifically for Chromium.

async function sortHackerNewsArticles() {
  // Launch the browser in non-headless mode (headless: false means you'll see the browser).
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext(); // Create a new browser context (like a new session).
  const page = await context.newPage(); // Open a new tab or page in the browser.

  // Define the list of URLs to visit (these are the "newest" pages on Hacker News).
  const links = [
    "https://news.ycombinator.com/newest",
    "https://news.ycombinator.com/newest?next=41213281&n=31",
    "https://news.ycombinator.com/newest?next=41212570&n=61",
    "https://news.ycombinator.com/newest?next=41212118&n=91",
  ];

  let listDates = []; // Initialize an empty array to store the dates.

  // Loop through each URL in the "links" array.
  for (const i of links) {
    await page.goto(i); // Navigate to the current link.
    await page.waitForSelector("td.subtext span.age"); // Wait until the "age" element is present on the page.

    // Extract the "title" attribute from all elements matching "td.subtext span.age".
    const dates = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll("td.subtext span.age")
      );
      return elements
        .map((el) => el.getAttribute("title")) // Get the "title" attribute, which contains the date and time.
        .filter((date) => date); // Filter out any null or undefined values (though unlikely here).
    });

    listDates = listDates.concat(dates); // Concatenate the extracted dates into the "listDates" array.
  }

  listDates = listDates.slice(0, 100); // Ensure that only the first 100 dates are kept.

  // Sort the dates from newest to oldest.
  listDates.sort((a, b) => new Date(b) - new Date(a));

  console.log(listDates); // Output the sorted list of dates to the console.

  // Check if the dates are correctly sorted from newest to oldest.
  const isSorted = listDates.every(
    (date, i) => i === 0 || new Date(date) <= new Date(listDates[i - 1])
  );
  
  await browser.close(); // Close the browser once done.
}

(async () => {
  await sortHackerNewsArticles(); // Call the function to run the script.
})();