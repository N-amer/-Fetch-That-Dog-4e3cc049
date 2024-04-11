// Get the like and dislike buttons
const likeBtn = document.querySelector('.btn-like');
const dislikeBtn = document.querySelector('.btn-dislike');
const dogImage = document.querySelector('.dog-image');
const dogName = document.querySelector('.dog-name');
const dogBreed = document.querySelector('.dog-breed');
const likeCount = document.querySelector('.like-count span');
const dislikeCount = document.querySelector('.dislike-count span');

// Retrieve previous counts from local storage or initialize them to 0
let likes = parseInt(localStorage.getItem('likes')) || 0;
let dislikes = parseInt(localStorage.getItem('dislikes')) || 0;

// Update the counters
likeCount.textContent = likes;
dislikeCount.textContent = dislikes;

// Generate a random dog name (you can replace this with your own logic)
const dogNames = ['Buddy', 'Charlie', 'Max', 'Bailey', 'Lucy', 'Sadie', 'Cooper', 'Daisy'];

// Generate a random dog breed (you can replace this with your own logic)
const dogBreeds =
    ['Golden Retriever', 'Labrador Retriever', 'German Shepherd',
        'Bulldog', 'Poodle', 'Beagle', 'Rottweiler'];

// Add event listeners to the buttons
likeBtn.addEventListener('click', () => {
    // Handle the like action here
    likes++;
    likeCount.textContent = likes;
    saveCountsToLocalStorage();
    fetchDogImage();
});

dislikeBtn.addEventListener('click', () => {
    // Handle the dislike action here
    dislikes++;
    dislikeCount.textContent = dislikes;
    saveCountsToLocalStorage();
    fetchDogImage();
});

// Fetch random dog image from the API
function fetchDogImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            dogImage.src = imageUrl;

            // Extract dog breed from the image URL
            const breed = extractBreed(imageUrl);
            dogBreed.textContent = breed;

            // Generate a random dog name
            const randomName = dogNames[Math.floor(Math.random() * dogNames.length)];
            dogName.textContent = randomName;
        })
        .catch(error => {
            console.log('Error fetching dog image:', error);
        });
}

// Extract the breed name from the image URL
function extractBreed(imageUrl) {
    const regex = /breeds\/(.+)\//;
    const match = imageUrl.match(regex);
    if (match && match[1]) {
        return capitalizeFirstLetter(match[1]);
    }
    return 'Unknown';
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Save the counts to local storage
function saveCountsToLocalStorage() {
    localStorage.setItem('likes', likes);
    localStorage.setItem('dislikes', dislikes);
}

// Fetch the initial dog image and counts on page load
fetchDogImage();
