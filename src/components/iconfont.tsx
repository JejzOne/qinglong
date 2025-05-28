import { createFromIconfontCN } from '@ant-design/icons';
import config from '../utils/config';

const IconFont = createFromIconfontCN({
  scriptUrl: [`${config.baseUrl}icon/iconfont.js`],
});

export default IconFont;
