const fs    = require('fs');
const chalk = require('chalk');



function addNote(title, body) {
    const notes = loadNotes();
  
    const dublicateNote = notes.find(note => note.title === title);

    if (!dublicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.bold.inverse('New note added!'));
    } else {
        console.log(chalk.red.bold.inverse('Note title is taken!'));
    }
}



function saveNotes(notes) {
    // Object to Json
    const dataJson = JSON.stringify(notes);
    // Save to the file notes.json
    fs.writeFileSync('notes.json', dataJson);
}



function loadNotes() {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        // Buffer to string
        const dataJson = dataBuffer.toString();
        // Parse Json data to an Object
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}



function readNote(title) {    
    const notes = loadNotes();
    const note = notes.find(key => key.title === title);

    if (note) {
        // If object is not empty
        console.log(chalk.bold.inverse(note.title));
        console.log(note.body); 
    } else {
        console.log(chalk.bold.red.inverse('Not found: ' + title));
    }
}



function listNotes() {
    const notes = loadNotes();
    console.log(chalk.bold.inverse('Your Notes:'));
    notes.forEach(note => {
        console.log(note.title);
    });
}



function removeNote(title) {
    const notes = loadNotes();

    // Find the index of title
    const index = notes.findIndex(note => note.title === title);
    
    if (index > -1) {
        // Remove the note from notes array
        notes.splice(index, 1);
        // Save the new notes array
        saveNotes(notes);
        console.log(chalk.bold.green.inverse('Removed note: ' + title));
    } else {
        console.log(chalk.bold.red.inverse('Not found: ' + title));
    }
    
    /**
     * 
     *  Another way using filter method (Loops through the whole array though)
     *     
     * -----------------------------------------------------------------------
     *  
            const notesToKeep = notes.filter(note => note.title !== title);

            if (notes.length > notesToKeep.length) {
                saveNotes(notesToKeep);     
                console.log(chalk.bold.green.inverse('Removed note: ' + title));
            } else {
                console.log(chalk.bold.red.inverse('No note found: ' + title));
            }
     */
}



module.exports = {
    addNote : addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};