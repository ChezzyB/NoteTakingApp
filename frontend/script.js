// Program's purpose is to allow the user to make notes and save them in a persistent state
const apiUrl = "http://localhost:5000/api/notes/"

async function getNotes(){
    const response = await fetch(apiUrl);
    const notes = await response.json();
    renderNotes(notes);
}

function renderNotes(notes) {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = ''; //Clear the list

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
    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

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
            getNotes();
        }
    } catch (error) {
        window.alert(error.message)
    }
}

async function deleteNote(id) {
    await fetch(`${apiUrl}/${id}`, {method : 'DELETE'});
    getNotes();
}

async function editNote(id, title, contents) {
    //Hiding the add button and showing the save button
    const addNoteButton = document.getElementById('addNoteButton');
    addNoteButton.hidden = true;
    const saveNoteButton = document.getElementById('saveNoteButton');
    saveNoteButton.hidden = false;

    //Giving the note id to the saveNoteButton so when it is pressed it can save that note
    //document.getElementById("saveNoteButton").id = note._id);

    //Setting the input fields to the selected note's title and contents to allow for user editing
    document.getElementById("title").value = `${title}`;
    document.getElementById("contents").value = `${contents}`;


}

async function saveNote(event){

    
}

window.onload = getNotes();
