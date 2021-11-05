function attachEvents () {
  document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
  document.getElementById('btnViewPost').addEventListener('click', display);
}

attachEvents();

async function display () {
  const selectedId = document.getElementById('posts').value;

  const [post, comments] = await Promise.all([
    getPostById(selectedId),
    getCommentsByPostId(selectedId)
])

  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-body').textContent = post.body;

  const ulElement = document.getElementById('post-comments');
  ulElement.replaceChildren();

  comments.forEach(c => {
    const liElement = document.createElement('li');
    liElement.textContent = c.text;
    ulElement.appendChild(liElement);
  });

}

async function getAllPosts () {
  const url = `http://localhost:3030/jsonstore/blog/posts`;
  const res = await fetch(url);
  const data = await res.json();

  const selectElement = document.getElementById('posts');

  selectElement.replaceChildren();

  Object.values(data).forEach(p => {
    const optionElement = document.createElement('option');
    optionElement.textContent = p.title;
    optionElement.value = p.id;

    selectElement.appendChild(optionElement);
  });

}

async function getPostById (postId) {
  const url = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function getCommentsByPostId (postId) {
  const url = `http://localhost:3030/jsonstore/blog/comments`;
  const res = await fetch(url);
  const data = await res.json();

  const comments = Object.values(data).filter(c => c.postId === postId);

  return comments;
}