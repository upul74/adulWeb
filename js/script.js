// JavaScript to handle basic functionality on the website

// Display a welcome message when the page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Your Website!");
});

// Handle navigation link clicks
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default behavior
        alert(`You clicked on ${link.textContent}`);
    });
});

// Example: Handle video play events
const videos = document.querySelectorAll("video");
videos.forEach((video) => {
    video.addEventListener("play", () => {
        console.log(`Playing video: ${video.currentSrc}`);
    });

    video.addEventListener("pause", () => {
        console.log(`Paused video: ${video.currentSrc}`);
    });
});

// Add a click event to videos
videos.forEach((video) => {
    video.addEventListener("click", () => {
        alert("You clicked on a video!");
    });
});

// Function to fetch and display uploaded videos
async function loadUploadedVideos() {
    try {
        const response = await fetch("http://localhost:3000/videos");
        const videoFiles = await response.json();

        const videoList = document.getElementById("videoList");
        videoList.innerHTML = ""; // Clear any existing videos

        videoFiles.forEach(fileName => {
            const videoUrl = `http://localhost:3000/${fileName}`; // Full video link
            const videoElement = `
                <div class="video-card">
                    <h3>${fileName}</h3>
                    <video width="320" height="240" controls>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>Video Link: <a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
                </div>
            `;
            videoList.innerHTML += videoElement;
        });
    } catch (error) {
        console.error("Error loading videos:", error);
    }
}

// Function to handle form submission
document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Get the form data

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result); // Log the success message
            document.getElementById("uploadStatus").textContent = result; // Show success message

            // Refresh the list of uploaded videos
            loadUploadedVideos();
        } else {
            console.error("Upload failed:", response.statusText);
            document.getElementById("uploadStatus").textContent = "Upload failed. Please try again.";
        }
    } catch (error) {
        console.error("Error uploading video:", error);
        document.getElementById("uploadStatus").textContent = "An error occurred during upload.";
    }
});

// Load videos when the page loads
window.onload = loadUploadedVideos;
async function loadUploadedVideos() {
    const videoList = document.getElementById("videoList");
    videoList.innerHTML = "<p>Loading videos...</p>"; // Show loading message

    try {
        const response = await fetch("http://localhost:3000/videos");
        const videoFiles = await response.json();

        videoList.innerHTML = ""; // Clear loading message

        videoFiles.forEach(fileName => {
            const videoUrl = `http://localhost:3000/${fileName}`;
            const videoElement = `
                <div class="video-item">
                    <video width="320" height="240" controls>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>${fileName}</p>
                </div>
            `;
            videoList.innerHTML += videoElement;
        });
    } catch (error) {
        console.error("Error loading videos:", error);
        videoList.innerHTML = "<p>Failed to load videos.</p>"; // Show error message
    }
}