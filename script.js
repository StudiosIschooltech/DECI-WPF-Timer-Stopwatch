class Timer {
    constructor() {
        this.startTime = null;    // To store the start time
        this.elapsedTime = 0;     // Time passed since start
        this.timerInterval = null; // For managing the interval that updates time
        this.running = false;     // Tracks if the timer is running
    }

    start() {
        if (!this.running) {
            // Capture the current time, adjusted for any previously elapsed time
            this.startTime = Date.now() - this.elapsedTime;
            this.running = true;

            // Update the display every second using setInterval
            this.timerInterval = setInterval(() => this.updateTime(), 1000);  // Calls updateTime every second
        }
    }

    stop() {
        if (this.running) {
            this.restInterval();   // Stop the timer from updating
            this.elapsedTime = Date.now() - this.startTime;  // Capture elapsed time
            this.running = false;
        }
    }

    reset() {
        this.restInterval();  // Stop the interval
        this.startTime = null;
        this.elapsedTime = 0;  // Reset elapsed time
        this.running = false;
        this.displayTime(0, 0, 0);  // Reset display
    }

    updateTime() {
        // Calculate how much time has passed since the timer started
        this.elapsedTime = Date.now() - this.startTime;

        // Convert elapsed time (milliseconds) into seconds, minutes, and hours
        const seconds = Math.floor((this.elapsedTime / 1000) % 60);
        const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
        const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);

        // Display the updated time on the webpage
        this.displayTime(hours, minutes, seconds);
    }

    displayTime(hours, minutes, seconds) {
        // Display formatted time on the webpage
        document.getElementById("timerDisplay").innerText = 
            `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    pad(number) {
        // Ensure double digits (e.g. 09 instead of 9)
        return number < 10 ? '0' + number : number;
    }


    restInterval() {
        clearInterval(this.timerInterval);  // Stop the timer from updating
    }
}

// Instantiate the Timer class
const timer = new Timer();

// Hook up buttons with their respective methods
document.getElementById("startButton").addEventListener("click", () => timer.start());
document.getElementById("stopButton").addEventListener("click", () => timer.stop());
document.getElementById("resetButton").addEventListener("click", () => timer.reset());
