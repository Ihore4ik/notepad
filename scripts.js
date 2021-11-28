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

function createNewNote(note) {
    let title = '';
    let text = '';
    if (note) {
        for (let key in note) {
            title = key;
            text = note[key];
        }
    }
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <div class="tools">
           <i class="fas fa-check-circle save"
             onclick="onSave()"
           ></i>
           <input type="text" class="inp" placeholder="My Note" value="${title}">
            <i class="fas fa-trash-alt delete"
               onclick="onDelete()"
            ></i>
            <i class="fas fa-times"
              onclick="onClose()"
            ></i>
    </div>
    <div class="text">
        <textarea>${text}</textarea>
    </div>
`;

    document.body.append(newNote);
    toggleNoteEdit();
    editNoteName();
}

function deleteNote(event) {
    const note = event.target.parentNode.parentNode;
    let noteName = note.querySelector('.inp');
    let noteText = note.querySelector('textarea');
    let notesFromLocalStorage = JSON.parse(localStorage.getItem('myNotes'));
    let ind = null;
    notesFromLocalStorage.forEach((el, index) => {
        for (let key in el) {
            if (key === noteName.value) {
                ind = index;
            }
        }
    });
    if (ind !== null) {
        localStorage.setItem('myNotes', JSON.stringify([...notesFromLocalStorage.slice(0, ind), ...notesFromLocalStorage.slice(ind + 1)]));
    }
    noteName.value = '';
    noteText.value = '';
    this.removeEventListener('click', deleteNote);
}

function editNoteName() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener(`click`, (event) => {
            if (event.target.classList.contains("inp")) {
                event.target.style.backgroundColor = '#3ec80b';
            }
        });
    });
    notes.forEach(note => {
        note.addEventListener(`focusout`, (event) => {
            if (event.target.classList.contains("inp")) {
                event.target.style.backgroundColor = '#9EC862';
            }
        });
    });
//when click twice on textarea - can edit it
//     notes.forEach(note => {
//         note.addEventListener(`dblclick`, (event) => {
//             if (event.target.tagName === 'TEXTAREA') {
//                 event.target.removeAttribute('disabled');
//             }
//         });
//     });
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

function closeNote(event) {
    event.target.parentNode.parentNode.remove();
    this.removeEventListener('click', closeNote);

}

function saveNoteToLocalStorage(event) {
    const text = event.target.parentNode.parentNode.querySelector('textarea');
    const noteTitle = event.target.parentNode.parentNode.querySelector('.inp');
    const d = new Date();
    if (text.value.trim() !== "") {
        let data = [];
        if (localStorage.getItem('myNotes')) {
            data = JSON.parse(localStorage.getItem('myNotes'));
        }
        let title = noteTitle.value || `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        let note = {};
        note[title] = text.value;

        if (data.length > 0) {
            let ind = null;
            data.forEach((el) => {
                for (let key in el) {
                    if (key === title && el[key] !== text.value) {
                        localStorage.setItem('myNotes', JSON.stringify([...data.slice(0, ind), note, ...data.slice(ind + 1)]));
                    } else if (key === title && el[key] === text.value) {
                        localStorage.setItem('myNotes', JSON.stringify([...data]));
                    }
                }
            });
        } else {
            localStorage.setItem('myNotes', JSON.stringify([...data, note]));
        }
    }
    this.removeEventListener('click', saveNoteToLocalStorage);

}

function onSave() {
    this.addEventListener('click', saveNoteToLocalStorage);
}

function onClose() {
    this.addEventListener('click', closeNote);
}

function onDelete() {
    this.addEventListener('click', deleteNote);
}


addNewNote.addEventListener('click', () => {
    createNewNote()
});
myNotes.addEventListener('click', function () {

    if (localStorage.getItem('myNotes')) {
        let arrOfNotes = JSON.parse(localStorage.getItem('myNotes'));
        arrOfNotes.map(note => createNewNote(note));
    } else {
        alert("You haven't notes yet!")
    }
});













