import { request } from '../api/index.js';
import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        console.log(node, 'node');
        // dictionary 관련 처리
      } else if (node.type === 'FILE') {
        // file 관련 처리
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes });
  };

  const init = async () => {
    try {
      const rootNodes = await request();
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
