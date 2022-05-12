export default function Nodes({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = 'Nodes';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const nodeTemplate = this.state.nodes
      .map((node) => {
        return `
      <div class="Node">
          <img src="./assets/${node.type.toLowerCase()}.png" />
          <div>${node.name}</div>
        </div>
      `;
      })
      .join('');

    this.$target.innerHTML = this.state.isRoot
      ? nodeTemplate
      : `<div class="Node">
    <img src="./assets/prev.png" />
  </div>
  ${nodeTemplate}`;
  };
  this.render();
}
