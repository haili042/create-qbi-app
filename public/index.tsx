import componentMeta from './meta';
import { initState } from './mock';
import * as biComponent from './component';

const qbiDemoPageRender = (window as any).QbiDemoPage.qbiDemoPageRender;

qbiDemoPageRender({ biComponent, componentMeta, initState, container: document.getElementById('root') });
