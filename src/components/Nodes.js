export default function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
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
        <div class="Node" data-node-id='${node.id}'>
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
  this.$target.addEventListener('click', (e) => {
    const $node = e.target.closest('.Node');
    const nodeId = $node.dataset.nodeId;
    const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
    if (selectedNode) {
      this.onClick(selectedNode);
    }
  });
  this.render();
}
