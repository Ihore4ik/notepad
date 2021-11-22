function createMenuNotes() {
    const menu = document.createElement('div');
    menu.classList.add('main_notes');
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

