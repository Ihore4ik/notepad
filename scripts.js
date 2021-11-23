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

addNewNote.addEventListener('click', function () {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <div class="tools">
           <i class="fas fa-check-circle save"
             onclick=""
           ></i>
            <i class="fas fa-trash-alt delete"
               onclick="del()"
            ></i>
    </div>
    <div class="text">
        <textarea></textarea>
    </div>
`
    document.body.append(newNote);
    toggleNoteEdit();
});


function toggleNoteEdit() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener(`focusout`, (event) => {
            if (event.target.tagName === 'TEXTAREA') {
                event.target.setAttribute('disabled', true);
            }
        });
    });

    notes.forEach(note => {
        note.addEventListener(`dblclick`, (event) => {
            if (event.target.tagName === 'TEXTAREA') {
                event.target.removeAttribute('disabled');
            }
        });
    });
}

function del() {
    this.addEventListener('click', deleteNote);
}

function deleteNote(event) {
    event.target.parentNode.parentNode.remove();
    this.removeEventListener('click', deleteNote);

}



