import 'qbi-open-demo-page/dist/index.css';
import * as demo from 'qbi-open-demo-page';
import { initState } from './mock';

demo.qbiDemoPageRender({
  biComponent: (window as any).BIComponent,
  componentMeta: (window as any).BIComponentMeta.default,
  initState,
  container: document.getElementById('root'),
});
