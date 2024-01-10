function toggleCollapse() {
    var collapsedContent = document.querySelector('.collapsed-content');
    collapsedContent.classList.toggle('collapsed');
  }

  function addEventListeners() {
    var collapseButton = document.querySelector('.collapse-button');

    if (window.matchMedia('(max-width: 768px)').matches) {
      collapseButton.addEventListener('click', toggleCollapse);
    } else {
      collapseButton.removeEventListener('click', toggleCollapse);
    }
  }

  addEventListeners();
  window.addEventListener('resize', addEventListeners);
// Function to navigate to url
function navigateTo(url) {
  window.parent.location.href = url;
}