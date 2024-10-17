// Unoptimized JavaScript code example

function fetchData() {
  // Making an API call with hardcoded URL and no error handling
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data fetched:", data);

      // Rendering data directly into the DOM without sanitization
      document.getElementById("data-container").innerHTML = "";
      data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          `;
        document.getElementById("data-container").appendChild(div);
      });
    });
}

function processData(array) {
  // Inefficient sorting algorithm (O(n^2) complexity for large datasets)
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  console.log("Sorted array:", array);
  return array;
}

// Unnecessary global variable and no modularity
var numbers = [45, 12, 78, 34, 89, 11, 1, 56];
processData(numbers);

document.getElementById("fetch-button").addEventListener("click", function () {
  fetchData();
});

// Inline event listener with no debouncing or throttling
window.addEventListener("resize", function () {
  console.log("Window resized");
});
