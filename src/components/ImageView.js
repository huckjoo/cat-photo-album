export default function ImageView({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('div');
  this.$target.className = 'Modal ImageViewer';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state, 'this.state');
    this.$target.innerHTML = this.state
      ? `
    <div class="content">
    <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${this.state}">
  </div>
    `
      : '';
    this.$target.style.display = this.state ? 'block' : 'none';
    this.$target.addEventListener('click', onClick);
  };
  this.render();
}
