// Program's purpose is to allow the user to make notes and save them in a persistent state
const apiUrl = "http://localhost5000/api/notes"

async function getNotes(){
    const response = await fetch(apiUrl);
    const notes = await response.json();
    renderNotes(notes);
}

function renderNotes(notes) {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = ''; //Clear the list

    notes.forEach(note => {
        // const li = document.createElement('li');
        // li.classList.toggle('completed',note.completed);

        // Create span for the title
        const span = document.createElement('span');
        span.textContent = note.title

        //Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note._id);

        //Append elements to the list item
        li.appendChild(span);
        li.appendChild(deleteButton);

        //Append the list item to the todo list
        todoList.appendChild(li);
    });
}

async function addNote(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try{
        if (title && description) {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({title, description})
            });
            if (!response.ok){
                const errorData = await response.json();
                if(errorData){
                    throw new Error(errorData.error)
                }
            }
            await response.json();
            title.value = '';
            description.value = '';
            getNotes();
        }
    } catch (error) {
        window.alert(error.message)
    }
}

async function deleteNote(id) {
    await fetch('${apiUrl}/${id}', {method : 'DELETE'});
    getNotes();
}

window.onload = getNotes();
