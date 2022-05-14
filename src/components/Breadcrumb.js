export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement('nav');
  this.$target.className = 'Breadcrumb';
  this.onClick = onClick;
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class='nav-item'>root</div>${this.state
      .map((node, idx) => {
        return `<div class='nav-item' data-id=${idx}>${node.name}</div>`;
      })
      .join('')}`;
  };
  this.$target.addEventListener('click', (e) => {
    const $navItem = e.target.closest('.nav-item');
    if ($navItem) {
      const idx = $navItem.dataset.id;
      this.onClick(idx ? Number(idx) : null);
    }
  });
  this.render();
}
