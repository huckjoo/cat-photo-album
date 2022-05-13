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
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (selectedNode) => {
      if (selectedNode.type === 'DIRECTORY') {
        // 폴더일 경우
        const nextNodes = await request(selectedNode.id);
        this.setState({ ...this.state, depth: [...this.state.depth, selectedNode], nodes: nextNodes, isRoot: false });
      } else if (selectedNode.type === 'FILE') {
        // 파일일 경우
        this.setState({ ...this.state, filePath: selectedNode.filePath });
      }
    },
    onBackClick: async () => {
      const prevState = { ...this.state };
      prevState.depth.pop();
      if (prevState.depth.length > 0) {
        const prevNodeId = prevState.depth[prevState.depth.length - 1].id;
        this.setState({ ...prevState, nodes: await request(prevNodeId), isRoot: false });
      } else {
        this.setState({ ...prevState, nodes: await request(), isRoot: true });
      }
    },
  });
  const imageView = new ImageView({
    $app,
    initialState: this.state.filePath,
    onClick: (e) => {
      if (e.target.nodeName !== 'IMG') {
        this.setState({ ...this.state, filePath: null });
      }
    },
  });
  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    breadcrumb.setState(this.state.depth);
    imageView.setState(this.state.filePath);
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
