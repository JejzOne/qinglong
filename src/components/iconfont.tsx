import { createFromIconfontCN } from '@ant-design/icons';
import config from './config';

const IconFont = createFromIconfontCN({
  scriptUrl: [`${config.baseUrl}monaco-editor/min/vs`],
});

export default IconFont;
