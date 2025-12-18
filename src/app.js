// Main application file
class App {
  constructor() {
    this.name = "Team Collaboration App";
    this.version = "1.0.0";
  }

  init() {
    console.log(`Welcome to ${this.name} v${this.version}`);
  }
}

const app = new App();
app.init();

