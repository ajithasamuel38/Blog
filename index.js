const link = "http://localhost:3000/admin/appointment/userData";
const form = document.getElementById("blogForm");
form.addEventListener('submit', addPost);

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
    } catch (err) {
        console.log(err);
    }
}

async function addComment(event) {
    let postId = event.target.closest("li").querySelector("button.add").id;
    
    // Access the comment text from the textarea
    let comment = event.target.closest("div.comment-section").querySelector("textarea#commentTextArea").value;

    console.log(postId);
    console.log(comment);
    
    let commentObj = {
        //id: postId, // Include the ID of the post in the comment object
        comment: comment
    };
    try {
        const response = await axios.post(`${link}/${postId}`, commentObj); // Assuming the server endpoint for posting comments is '/comments'
        // Optionally, you can handle the response if needed
    } catch (err) {
        console.log(err);
    }
}

function displayPost(post) {
    const { id, title, author, content } = post;
    const li = document.createElement("li");
    li.innerHTML = `<h2>${title}</h2>`;
    let AddButton = document.createElement("button");
    AddButton.id = id;
    AddButton.type = "click"; // Use 'button' type to prevent form submission
    AddButton.textContent = "+";
    AddButton.className = 'add';
    
    li.appendChild(AddButton);
    
    let blogList = document.getElementById('blogslist');
    blogList.appendChild(li);
    AddButton.addEventListener('click', function() {
        showcomment(post, li);
    });
    
}

function showcomment(post, li){
    const { id, title, author, content } = post;
    const authorheading = document.createElement('h3');
    const paracontent = document.createElement('p');
    authorheading.textContent = 'Author- '+author;
    paracontent.textContent = 'Content- '+content;
    var commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    commentSection.innerHTML = `
        <h3>Comments:</h3>
        <textarea id="commentTextArea" rows="4" cols="50"></textarea>
        <button onclick = "addComment(event)">Add</button>
    `;
    li.appendChild(authorheading);
    li.appendChild(paracontent);
    li.appendChild(commentSection);
    


}


async function showPosts() {
    try {
        const response = await axios.get(link);
        response.data.forEach(post => {
            displayPost(post);
        });
    } catch (err) {
        console.log(err);
    }
}

/*const blogsList = document.getElementById("blogslist");
blogsList.addEventListener('click', deleteComment);

// Function to handle delete comment operation
async function deleteComment(event) {
    if (event.target.classList.contains("comment-section")) {
        const parentElement = event.target.parentElement;
        console.log(parentElement);
        const postId = event.target.id;
        try {
            const response = await axios.delete(`${link}/${postId}`);
            console.log(response);
            parentElement.remove();
        } catch (err) {
            console.log(err);
        }
    }
}*/