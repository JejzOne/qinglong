import { createFromIconfontCN } from '@ant-design/icons';
import config from './config';

const IconFont = createFromIconfontCN({
  scriptUrl: [`${config.baseUrl}iconfont.js`],
});

export default IconFont;
