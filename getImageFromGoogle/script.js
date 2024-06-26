const apiKey = '';
let query = document.getElementById('input');
const gallery = document.getElementById('gallery');
let page = 1;
let queryText = 'welcome';
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
    fetchImages(queryText, page);
});

function fetchImages(query, page) {
    isLoading = true;
    fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${page}&client_id=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo.urls.regular;
            imgElement.className = 'image';
            gallery.appendChild(imgElement);
        });
        isLoading = false;
    })
    .catch(error => {
        console.error('Error fetching images:', error);
        isLoading = false;
    });
}

function getImage() {
    let q1 = query.value;
    if (q1.trim() !== '') {
        queryText = q1;
        gallery.innerHTML = '';  // Clear the gallery
        page = 1;  // Reset page count
        fetchImages(queryText, page);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        page++;
        fetchImages(queryText, page);
    }
});
