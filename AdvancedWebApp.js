/*
Filename: AdvancedWebApp.js

Description:
This code is an advanced web application that demonstrates various concepts and techniques in JavaScript. It includes a custom object-oriented architecture, DOM manipulation, asynchronous programming, error handling, and more.

Author: John Doe
Date: November 1, 2022
*/

// ==========================================
// DECLARATION OF MAIN APPLICATION OBJECT
// ==========================================
class WebApp {
  constructor() {
    this.url = 'https://api.example.com/data';
    this.data = null;
    this.error = null;
  }

  initialize() {
    this.fetchData(); // Fetch data from API
    this.renderUI();  // Render initial UI

    // Attach event handlers
    const button = document.getElementById('btnSubmit');
    button.addEventListener('click', this.handleSubmit.bind(this));
  }

  fetchData() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.renderData();
      })
      .catch(error => {
        this.error = error;
        this.renderError();
      });
  }

  renderUI() {
    // Create and append UI elements
    const container = document.createElement('div');
    container.innerHTML = `
      <h1>Advanced Web App</h1>
      <form>
        <input type="text" id="inputData" placeholder="Enter data">
        <button type="button" id="btnSubmit">Submit</button>
      </form>
      <div id="outputContainer"></div>
    `;
    document.body.appendChild(container);
  }

  handleSubmit() {
    const input = document.getElementById('inputData');
    const inputValue = input.value;

    this.processData(inputValue)
      .then(result => this.renderOutput(result))
      .catch(error => {
        this.error = error;
        this.renderError();
      });
  }

  processData(inputValue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inputValue.length > 0) {
          resolve(this.data + inputValue);
        } else {
          reject(new Error('Input is empty.'));
        }
      }, 1000);
    });
  }

  renderData() {
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `<p>Data: ${this.data}</p>`;
  }

  renderOutput(result) {
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `<p>Output: ${result}</p>`;
  }

  renderError() {
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `<p>Error: ${this.error.message}</p>`;
  }
}

// ==========================================
// MAIN PROGRAM
// ==========================================
const app = new WebApp();
app.initialize();
