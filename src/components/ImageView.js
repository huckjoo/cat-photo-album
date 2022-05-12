const BASE_URL = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';
export default function ImageView({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('div');
  this.$target.className = 'Modal ImageView';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.state
      ? `
    <div class="content">
    <img src="${BASE_URL}${this.state.selectedFilePath}">
  </div>
    `
      : '';
    if (this.state) {
      this.$target.style.display = 'block';
    } else {
      this.$target.style.display = 'none';
    }
    this.$target.addEventListener('click', onClick);
  };
  this.render();
}
