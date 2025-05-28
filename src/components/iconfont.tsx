import { createFromIconfontCN } from '@ant-design/icons';
import config from '../utils/config';

const IconFont = createFromIconfontCN({
  scriptUrl: ['${config.baseUrl}iconfont.js'],
});

export default IconFont;
