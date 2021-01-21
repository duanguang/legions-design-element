import collect from 'bisheng/collect';
import MainContent from './MainContent';
import * as utils from '../utils';

function isChangelog(pathname) {
  return pathname.indexOf('changelog') >= 0;
}

export default collect(async (nextProps) => {
  const { pathname } = nextProps.location;
  const pageDataPath = pathname.replace('-cn', '').split('/');
  if (nextProps.data.components['src']) {
      nextProps.data.components = nextProps.data.components['src']['components']
  } else {
    for(let k in nextProps.data.components) {
        nextProps.data.components[k.toLocaleLowerCase()] = nextProps.data.components[k]
    }
  }
  /** 修复路由不匹配文件夹驼峰命名问题 */
  const pageData = isChangelog(pathname) ?
    nextProps.data.changelog.CHANGELOG :
    nextProps.utils.get(nextProps.data, pageDataPath);
  if (!pageData) {
    throw 404; // eslint-disable-line no-throw-literal
  }
  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const pageDataPromise = typeof pageData === 'function' ?
    pageData() : (pageData[locale] || pageData.index[locale] || pageData.index)();
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo']);
  if (demosFetcher) {
    const [localizedPageData, demos] = await Promise.all([pageDataPromise, demosFetcher()]);
    return { localizedPageData, demos };
  }
  return { localizedPageData: await pageDataPromise };
})(MainContent);
