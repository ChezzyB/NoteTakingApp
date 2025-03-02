// Program's purpose is to allow the user to make notes and save them in a persistent state
const apiNoteUrl = "http://localhost:5000/api/notes/";
const apiAuthUrl = 'http://localhost:5000/api/auths';
let editNoteID = "";

async function getNotes(){
    
    if(document.title === 'Note')
    {
        //Fetch all the notes from the database
        const response = await fetch(apiNoteUrl);
        const notes = await response.json();

        //Display all notes found in the database
        renderNotes(notes);
    }
}

function renderNotes(notes) {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = ''; //Clear the list

    //Clear the input fields:
    document.getElementById("title").value = ``;
    document.getElementById("contents").value = ``;

    //Show the Add Note button and hide the Save Note button
    document.getElementById('addNoteButton').hidden = false;
    document.getElementById('saveNoteButton').hidden = true;

    //Go through all notes
    notes.forEach(note => {
        const li = document.createElement('li');

        // Create span for the title
        const spanTitle = document.createElement('span');
        spanTitle.textContent = note.title

        // Create span for the title
        const spanContents = document.createElement('span');
        spanContents.textContent = note.contents


        //Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note._id);

        //Create the delete button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(note._id, note.title, note.contents);

        //Append elements to the list item
        li.appendChild(spanTitle);
        li.appendChild(spanContents);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        //Append the list item to the note list
        noteList.appendChild(li);
    });
}

async function addNote(event) {
    event.preventDefault();

    //Get the Title and Contents of the new note to be added from the form's input fields
    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

    //Saving this new note's Title and Contents in the Database
    try{
        if (title && contents) {
            const response = await fetch(apiNoteUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({title, contents})
            });
            if (!response.ok){
                const errorData = await response.json();
                if(errorData){
                    throw new Error(errorData.error)
                }
            }
            await response.json();
            title.value = '';
            contents.value = '';

            //Render all the notes after the note above has been added
            getNotes();
        }
    } catch (error) {
        window.alert(error.message)
    }
}

async function deleteNote(id) {
    //Delete the selected note in the database using the given ID
    await fetch(`${apiNoteUrl}/${id}`, {method : 'DELETE'});
    getNotes();
}

async function editNote(id, title, contents) {
    //Hiding the Add Note button and showing the Save Note button
    const addNoteButton = document.getElementById('addNoteButton');
    addNoteButton.hidden = true;
    const saveNoteButton = document.getElementById('saveNoteButton');
    saveNoteButton.hidden = false;

    //Giving the note id to be edited to the global variable editNoteID
    editNoteID = id;

    //Setting the input fields to the selected note's title and contents to allow for user editing
    document.getElementById("title").value = `${title}`;
    document.getElementById("contents").value = `${contents}`;
}

async function saveEditedNote(event){
    //Use the editNoteID global variable to save the note
    event.preventDefault();
    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

    //Use the current note's ID to update it in the database
    try{
        if (title && contents && editNoteID) {
            const response = await fetch(`${apiNoteUrl}/${editNoteID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({title, contents})
            });
            if (!response.ok){
                const errorData = await response.json();
                if(errorData){
                    throw new Error(errorData.error)
                }
            }
            await response.json();
            title.value = '';
            contents.value = '';
            
            //Set global note id to empty again as the edit is now saved
            editNoteID = "";

            //Render all the notes after the update to the note above
            getNotes();
        }
    } catch (error) {
        window.alert(error.message)
    }
    
}

// Check if token exists
const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };
  
  // Render buttons dynamically on the home page
  if (document.title === 'Home') {
    const authButtons = document.getElementById('auth-buttons');
    if (checkAuth()) {
      authButtons.innerHTML = `
        <button onclick="logout()">Logout</button>
      `;
      fetchWelcomeMessage()
      //Send the user to the notes page as they are now logged in
      window.location.href = 'note.html';
    } else {
      authButtons.innerHTML = `
        <a href="login.html"><button>Login</button></a>
        <a href="register.html"><button>Register</button></a>
      `;
    }
  }
  
  // Login functionality
  if (document.title === 'Login') {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Replace with your backend API endpoint
      const response = await fetch(`${apiAuthUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      const message = document.getElementById('message');
      if (response.ok) {
        localStorage.setItem('token', data.token);
        message.textContent = 'Login successful! Redirecting...';
        setTimeout(() => (window.location.href = 'index.html'), 1500);
      } else {
        message.textContent = data.error || 'Login failed.';
      }
    });
  }
  
  // Register functionality
  if (document.title === 'Register') {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
  
      // Add a new user to the database
      const response = await fetch(`${apiAuthUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
  
      const data = await response.json();
      const message = document.getElementById('message');
      if (response.ok) {
        message.textContent = 'Registration successful! Redirecting to login...';
        setTimeout(() => (window.location.href = 'login.html'), 1000);
      } else {
        message.textContent = data.error || 'Registration failed.';
      }
    });
  }
  
  // Function to fetch the welcome message from the server and log the user in
  async function fetchWelcomeMessage() {
    
    //Get the token from the client side storage
    const token = localStorage.getItem('token');
    
    //Get the user's username to display in the welcome message
    try {
      const response = await fetch(`${apiAuthUrl}/welcome`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      //Bad fetch/Missing user will prevent the user from logging in
      if (!response.ok) {
        throw new Error('Authentication failed. Please log in again.');
      }
  
      const data = await response.json();
      alert(data.message); // Display the welcome message
    } catch (error) {
      alert(error.message);
      // Redirect to login page if the token is invalid or expired
      window.location.href = 'login.html';
    }
  };
  
  // Client-side logout function
  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
  
    // Optionally show a success message
    alert('Logged out successfully!');
  
    // Redirect to the home or login page
    window.location.href = 'index.html'; 
  };


window.onload = getNotes();