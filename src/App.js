import { request } from '../api/index.js';
import Breadcrumb from './components/Breadcrumb.js';
import ImageView from './components/ImageView.js';
import Nodes from './components/Nodes.js';
import Loading from './components/Loading.js';

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });
  const loading = new Loading({ $app, initialState: this.state.isLoading });
  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
    onClick: (e) => {
      if (e.target.nodeName !== 'IMG') {
        this.setState({ ...this.state, selectedFilePath: null });
      }
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        this.setState({ ...this.state, isLoading: true });
        const nextNodes = await request(node.id);
        this.setState({ ...this.state, isRoot: false, nodes: nextNodes, depth: [...this.state.depth, node], isLoading: false });
      } else if (node.type === 'FILE') {
        imageView.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();
        const prevNodeId = nextState.depth.length ? nextState.depth[nextState.depth.length - 1].id : null;
        this.setState({ ...this.state, isLoading: true });
        this.setState({
          ...nextState,
          isRoot: !prevNodeId,
          nodes: await request(prevNodeId),
        });
        this.setState({ ...this.state, isLoading: false });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    try {
      this.setState({ ...this.state, isLoading: true });
      const rootNodes = await request();
      this.setState({ ...this.state, isLoading: false });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.setState({ ...this.state, selectedFilePath: null });
        }
      });
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      throw new Error(`시작중 오류 ${e.message}`);
    }
  };
  init();
}
