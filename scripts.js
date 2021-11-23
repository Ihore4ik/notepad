function createMenuNotes() {
    const menu = document.createElement('div');
    menu.classList.add('main_notes');
    menu.id = "dragMenu";
    const ul = document.createElement('ul');
    const liAddNote = document.createElement('li');
    liAddNote.innerHTML = `<i class="fas fa-plus"></i>`;
    const liMyNotes = document.createElement('li');
    liMyNotes.innerHTML = `<i class="far fa-sticky-note"></i>`;
    ul.append(liAddNote, liMyNotes);
    menu.append(ul);
    menu.draggable = true;
    document.body.append(menu);
}

createMenuNotes();
const addNewNote = document.querySelectorAll('.main_notes>ul>li')[0];
const myNotes = document.querySelectorAll('.main_notes>ul>li')[1];

function createNewNote(text = '') {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <div class="tools">
           <i class="fas fa-check-circle save"
             onclick="onSave()"
           ></i>
            <i class="fas fa-trash-alt delete"
               onclick="onDelete()"
            ></i>
    </div>
    <div class="text">
        <textarea>${text}</textarea>
    </div>
`;

    document.body.append(newNote);
    toggleNoteEdit();
}
function toggleNoteEdit() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener(`focusout`, (event) => {
            if (event.target.tagName === 'TEXTAREA') {
                event.target.setAttribute('disabled', true);
            }
        });
    });
//when click twice on textarea - can edit it
    notes.forEach(note => {
        note.addEventListener(`dblclick`, (event) => {
            if (event.target.tagName === 'TEXTAREA') {
                event.target.removeAttribute('disabled');
            }
        });
    });
}
function deleteNote(event) {
    event.target.parentNode.parentNode.remove();
    this.removeEventListener('click', deleteNote);

}
function saveNoteToLocalStorage(event) {
    const text = event.target.parentNode.parentNode.querySelector('textarea');
    if (text.value.trim() !== "") {
        let data = [];
        if (localStorage.getItem('myNotes')) {
            data = JSON.parse(localStorage.getItem('myNotes'));
        }
        let sendData = JSON.stringify([...data, text.value]);
        localStorage.setItem('myNotes', sendData);
    }
    this.removeEventListener('click', saveNoteToLocalStorage);

}
function onSave() {
    this.addEventListener('click', saveNoteToLocalStorage);
}
function onDelete() {
    this.addEventListener('click', deleteNote);
}


addNewNote.addEventListener('click', ()=>{
    createNewNote()
});
myNotes.addEventListener('click', function () {

    if (localStorage.getItem('myNotes')) {
        let data = JSON.parse(localStorage.getItem('myNotes'));
        data.map(note => createNewNote(note))
    }else{
        alert("You haven't notes yet!")
    }
});













