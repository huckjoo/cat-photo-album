import { request } from './api/index.js';
import Breadcrumb from './components/Breadcrumb.js';
import ImageView from './components/ImageView.js';
import Nodes from './components/Nodes.js';
export default function App($app) {
  this.state = {
    isRoot: false,
    depth: [],
    nodes: [],
    filePath: null,
  };
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state });
  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (selectedNode) => {
      console.log('clicked!');
      // const $node = e.target.closest('.Node');
      // const selectedId = $node.dataset.id;
      // const selectedNode = this.state.nodes.find((node) => node.id === selectedId);
      if (selectedNode.type === 'DIRECTORY') {
        // 폴더일 경우
        const nextNodes = await request(selectedNode.id);
        this.setState({ ...this.state, depth: [...this.state.depth, selectedNode], nodes: nextNodes, isRoot: false });
      } else if (selectedNode.type === 'FILE') {
        // 파일일 경우
        this.setState({ ...this.state, filePath: selectedNode.filePath });
      }
    },
  });
  const imageView = new ImageView({
    $app,
    initialState: this.state,
    onClick: (e) => {
      if (e.target.nodeName !== 'IMG') {
        this.setState({ ...this.state, filePath: null });
      }
    },
  });
  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({ ...this.state });
    breadcrumb.setState({ ...this.state });
    imageView.setState({ ...this.state });
  };
  const init = async () => {
    const rootNodes = await request();
    this.setState({ ...this.state, isRoot: true, nodes: rootNodes });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.setState({ ...this.state, filePath: null });
      }
    });
  };
  init();
}
