// Utility function for error handling
function displayError(message) {
    document.getElementById('error').innerText = message;
    document.getElementById('result').innerText = '';
}

// Fetch Data with fetch()
document.getElementById('fetchFetch').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
            displayError('');
        })
        .catch(err => displayError(err.message));
});

// Fetch Data with XHR
document.getElementById('fetchXHR').addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('result').innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
            displayError('');
        } else {
            displayError(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    };
    xhr.onerror = () => displayError('Network Error');
    xhr.send();
});

// POST Request
document.getElementById('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML = `<h3>Post Created</h3><p>ID: ${data.id}, Title: ${data.title}</p>`;
            displayError('');
        })
        .catch(err => displayError(err.message));
});

// PUT Request
document.getElementById('putForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('postId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('result').innerHTML = `<h3>Post Updated</h3><p>ID: ${data.id}, Title: ${data.title}</p>`;
            displayError('');
        } else {
            displayError(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    };
    xhr.onerror = () => displayError('Network Error');
    xhr.send(JSON.stringify({ title, body }));
});

// DELETE Request
document.getElementById('deleteForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('deletePostId').value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                document.getElementById('result').innerHTML = `<
