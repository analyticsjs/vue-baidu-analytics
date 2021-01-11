/** 
 * 获取Vue的版本
 * @param {number} vueVersion - vue版本号，2=Vue2.x, 3=Vue3.x
 * @param {object} router - vue路由
 * @return hash=hash模式、history=history模式
 */
const getRouterMode = (vueVersion: number, router: any): string => {
  let mode: string = 'history';

  // 2.x直接读取mode即可
  if ( vueVersion === 2 ) {
    mode = router.mode;
  }

  // 3.x需要判断一下
  if ( vueVersion === 3 ) {
    const BASE: string = router.options.history.base || '';
    if ( BASE.includes('#') ) {
      mode = 'hash';
    }
  }
  
  return mode;
}

export default getRouterMode;