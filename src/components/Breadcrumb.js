export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('nav');
  this.$target.className = 'Breadcrumb';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div>root</div>${this.state
      .map((node) => {
        return `<div>${node.name}</div>`;
      })
      .join('')}`;
  };
  this.render();
}