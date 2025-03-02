// Program's purpose is to allow the user to make notes and save them in a persistent state
const apiUrl = "http://localhost:5000/api/notes/"
let editNoteID = "";

async function getNotes(){
    //Fetch all the notes from the database
    const response = await fetch(apiUrl);
    const notes = await response.json();

    //Display all notes found in the database
    renderNotes(notes);
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
            const response = await fetch(apiUrl, {
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
    await fetch(`${apiUrl}/${id}`, {method : 'DELETE'});
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
            const response = await fetch(`${apiUrl}/${editNoteID}`, {
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

if (document.title === 'Note') {
    apiUrl = "http://localhost:5000/api/notes/"
    window.onload = getNotes();
}
