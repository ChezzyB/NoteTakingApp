# Note Taking App Instructions

## Overview
This application allows you to create multiple users, login with a user's details and then save/edit/delete notes that are only accessible by that specific user. To get to the notes page, simply login or create a user from the main index.html page and then login with the newly created user's email and password. The app will then display the current notes for the user you have logged in, if any notes exist for that user. You can then add a new note, edit an existing note or delete a note

## Setup Instructions
1. Pull the main file from the following location: https://github.com/ChezzyB/NoteTakingApp.git
    - Create your own environment file in the backend folder called ".env" and enter the following information:
        - PORT=5000
        - MONGODB_URI=mongodb://localhost:27017/NoteTakingAppDB
        - JWT_SECRET=my_secret_key
        - JWT_EXPIRES_IN=8h
    - Save the above file
2. In the terminal, navigate to the backend folder.
3. Ensure that npm is installed on your device.
4. Run the "npm i" command in the terminal
    - The following dependencies should be observed in the package.json file:
        - "dependencies": {
            -    "bcryptjs": "^2.4.3",
            -   "cors": "2.8.5",
            -   "dotenv": "^16.4.7",
            -   "express": "4.21.2",
            -   "jsonwebtoken": "^9.0.2",
            -   "mongoose": "8.10.1",
            -   "nodemon": "^3.1.9"
            }
5. Ensure that the following line is in the scripts section of the package.json file:
    - "start": "nodemon server.js"
6. Ensure that MongoDB is installed on your device.

## How to start the program
1. In the terminal, navigate to the backend folder and execute the following terminal command:
    - nodemon server
        - Wait for the following text to appear in the terminal window before proceeding:
            - Server running on port 5000
            - MongoDB connected
2. Run the index.html file, once MongoDB is connected, using your preferred method.
    - Open with Live Server is the standard method.
3. An html page will display saying "Please log in to view your Notes" with 2 buttons:
    - Login
    - Register

## Step-by-Step User Instructions

1. **Registering a New User**  
    - On the main home-page (index.html) you should see text saying **Please log in to view your Notes** and two buttons:
        - **Login**
        - **Register**
    - Click on the **Register** button.
        - This will take you to (register.html)
    - You will now see text saying "Register" and the following text fields:
        - Username
        - Email
        - Password
    - Please enter the appropriate information and click on the **Register** button at the bottom of the form
        - The fields will only accept certain lengths and/or syntax.
            - The user will be prompted to correct this information before the system accepts and saves it to the database.
        - Once the information is acccepted it will redirect back to the main **Login** page.

2. **Logging in a User** 
    - Navigate to the **Login** page (login.html)
        - You will now see text saying **Login** and the below text fields:
            - Email
            - Password
        - Enter your email and password and click the **Login** button at the bottom of the form
            - This will redirect to a page with text saying **Note Taking App** if a successful login attempt is made
            - If the login is unsuccessful, you will remain on the same page in order to re-enter the information correctly

3. **Logging out a User**
    - Once logged in, a page will appear with text saying **Note Taking App** (note.html)
    - Click on the first button under this title on the left
        - This button is labelled **Logout**
    - This will log out the current user and erase client side stored data (token & email) and redirect to the main home page (index.html)

4. **Adding a New Note**
    - Once logged in, a page will appear with text saying **Note Taking App** (note.html)
    - Two text boxes will appear at the top of the page with the following text:
        - "Add a note title"
        - "Add the note's contents"
    - Add the appropriate information into the appropriate text boxes and then click on the button immediately under the text boxes on the left side
        - This button is labelled **Add Note**
    - Text limits are applied here and the user will be prompted appropriately to correct the information before the information is saved to the database
    - If the information has been added, the text fields will be cleared and the note will appear below the **Add Note** button in the following format:
        - From left to right:
            - Note's Title
            - Note's Content
            - A button to edit this note
            - A button to delete this note

4. **Deleting a Note**
    - Once logged in, a page will appear with text saying **Note Taking App** (note.html)
    - If any notes are owned by this user, they will be displayed below the **Add Note** button in the following format:
        - Each note will be on it's own row, with the following data organized from left to right:
            - Note's Title
            - Note's Content
            - A button to edit this note
            - A button to delete this note
    - To delete a specific note, click on the **Delete** button that is on the same row as the note you wish to delete
        - This note is now deleted and the page will be refreshed to show the note has been deleted

4. **Editing a Note**
    - Once logged in, a page will appear with text saying **Note Taking App** (note.html)
    - If any notes are owned by this user, they will be displayed below the **Add Note** button in the following format:
        - Each note will be on it's own row, with the following data organized from left to right:
            - Note's Title
            - Note's Content
            - A button to edit this note
            - A button to delete this note
    - To edit a specific note, click on the **Edit** button that is on the same row as the note you wish to edit
        - This note is now displayed in two text input fields at the top left of the page
            - The button below these two fields now says **Save Note**
        - Edit the text as necessary and then click on the **Save Note** button
            - The text input fields will now be cleared and the note will be saved with any changes intact


## Notes

Enjoy using the Note Taking App!


## Project Wins:
- My first MongoDB app!
- Feels good to get this app working as there were multiple issues with combining all our backend class material into one file and passing information back and forth.
- The front end is not the greatest and the notes section could probably be converted to a div structure instead of a list, but getting the information to display/change/update is an amazing feeling after a good 3 week struggle. 

## Project Difficulties:
- This project was very involved and I personally struggle with all the various subfolders and tracking where the errors are.
    - I miss-typed the auth paths/routes a few times, so that set me back a few days tracking it all down!
- The front end I left as stock standard from what we did in class, going forward and probably after the course is complete, I would like to return to this and provide a proper front end with a great user experience. But seeing as the goal here is to focus on back end, it will do for now. 

## Biggest Learnings:
- Javascript automatically clears global variables when you load a new .html doc, I wasted around 2 days on this one error, haha.
- You can have multiple routes (I decided to split up Authentication and Note functions)
- When in doubt, I have spelled something wrong!
