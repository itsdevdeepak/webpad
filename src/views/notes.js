export default function renderNotes() {
  const notesView = document.createElement('div');
  notesView.innerHTML = `
  <aside>
    <h1>Notes</h1>
    <ul>
      <li><a class='app-nav' href=/notes/id/note-1>Note 1</a></li>
      <li><a class='app-nav' href=/notes/id/note-2>Note 2</a></li>
      <li><a class='app-nav' href=/notes/id/note-3>Note 3</a></li>
    </ul>
  </aside>
  <div class="note"></div>
  `;

  return notesView;
}
