const link = "http://localhost:4000/admin/appointment/userData";
const blogsList = document.getElementById('blogslist');
const form = document.getElementById("blogForm");
form.addEventListener('submit', addPost);
blogsList.addEventListener('click', handlePostClick);

window.addEventListener("DOMContentLoaded", showPosts);

async function addPost(event) {
  event.preventDefault();
  let title = event.target.title.value;
  let author = event.target.author.value;
  let content = event.target.content.value;
  let postObj = {
    title: title,
    author: author,
    content: content
    
  };

  try {
    const response = await axios.post(link, postObj);
    displayPost(response.data);
    clearForm();
  } catch (err) {
    console.log(err);
  }
}

async function handlePostClick(event) {
  const target = event.target;
  if (target.classList.contains('toggle')) {
    const postId = target.closest("li").id.split("-")[1];
    toggleContent(postId);
  }
  
    else if (target.classList.contains('addcomment')) {
      const postId = target.closest("li").id.split("-")[1];
      addComment(postId);
  } else if (target.classList.contains('delete-comment')) {
    const postId = target.dataset.postId;
    const commentId = target.dataset.commentId;
    deleteComment(postId, commentId, target.parentElement);
  }
}

async function toggleContent(postId) {
  const postElement = document.getElementById(`post-${postId}`);
  const contentElement = postElement.querySelector('.post-content');
  const addButton = postElement.querySelector('.toggle');
  const isContentHidden = contentElement.classList.toggle('hidden'); // Toggle content visibility
  addButton.textContent = isContentHidden ? '+' : '-'; // Change button text based on content visibility
}

async function addComment(postId) {
  const commentTextArea = document.getElementById(`commentTextArea-${postId}`);
  const comment = commentTextArea.value.trim();
  console.log(commentTextArea);
  if (comment) {
    const commentObj = { comment };
    try {
      const response = await axios.post(`${link}/${postId}/comments`, commentObj);
      const updatedComments = await fetchComments(postId);
      displayComments(updatedComments, postId);
      commentTextArea.value = '';
    } catch (err) {
      console.log(err);
    }
  }
}

async function deleteComment(postId, commentId, commentElement) {
  try {
    await axios.delete(`${link}/${postId}/comments/${commentId}`);
    commentElement.remove();
  } catch (err) {
    console.error('Error deleting comment:', err);
  }
}

async function fetchComments(postId) {
  try {
    const response = await axios.get(`${link}/${postId}/comments`);
    return response.data;
  } catch (err) {
    return [];
  }
}

async function displayComments(comments, postId) {
  const commentSection = document.querySelector(`#comment-section-${postId}`);
  // Get the container for comments
  let commentsContainer = commentSection.querySelector('.comments-container');
  
  // If the container doesn't exist, create it
  if (!commentsContainer) {
    commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    commentSection.appendChild(commentsContainer);
  } else {
    // Clear previous comments before appending new ones
    commentsContainer.innerHTML = '';
  }
  
  // Append new comments to the container
  comments.forEach(commentObj => {
    const { id, comment } = commentObj;
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <p>${comment}</p>
      <button class="delete-comment" data-post-id="${postId}" data-comment-id="${id}">Delete</button>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

function displayPost(post) {
  const { id, title, author, content } = post;
  const li = document.createElement("li");
  li.id = `post-${id}`;
  li.innerHTML = `
    <h2>${title}</h2>
    <button class="toggle" id="${id}">+</button>
    <div class="post-content hidden">
      <h3 class="author">Author - ${author}</h3>
      <p class="content">${content}</p>
      <div class="comment-section" id="comment-section-${id}">
        <h3>Comments:</h3>
        <textarea class="commentTextArea" id="commentTextArea-${id}" rows="1" cols="2" required></textarea>
        <button class="addcomment" id="${id}">Add</button>
      </div>
    </div>
  `;
  blogsList.appendChild(li);
}
function displaylistItems(postId){
  const li = document.getElementById(`post-${postId}`);
  const div = document.createElement('div');
  div.className = "comment-section";
  div.id = `comment-section-${postId}`;
  div.innerHTML = `<h3>Author - ${author}</h3>
  <p>Content - ${content}</p>
  <h3>Comments:</h3>
  <textarea id="commentTextArea-${postId}" rows="4" cols="5" required ></textarea>
  <button id ="${postId}" class="addcomment">Add</button>
  `;
  li.appendChild(li);
}

async function showPosts() {
  try {
    const response = await axios.get(link);
    for (const post of response.data) {
      displayPost(post);
      const comments = await fetchComments(post.id);
      displayComments(comments, post.id);
    };
  } catch (err) {
    console.log(err);
  }
}

function clearForm() {
  document.getElementById("blogForm").reset();
}