export default function renderArchives() {
  const archivesView = document.createElement('div');

  archivesView.innerHTML = `
  <aside>
    <h1>Archives</h1>
    <ul>
      <li><a class="app-nav" href=/archives/id/archive-1>Archive 1</a></li>
      <li><a class="app-nav" href=/archives/id/archive-2>Archive 2</a></li>
      <li><a class="app-nav" href=/archives/id/archive-3>Archive 3</a></li>
    </ul>
  </aside>
  `;

  return archivesView;
}
