/** 
 * 获取Vue的版本
 * @return 2=Vue2.x, 3=Vue3.x
 */
const getVueVersion = (Vue: Vue): number => {
  let version: number = 2;

  // 获取Vue的版本号
  const VUE_VERSION: string = String(Vue.version);

  // Vue 2.x
  if ( VUE_VERSION.slice(0, 2) === '2.' ) {
    version = 2; 
  }
  
  // Vue 3.x
  if ( VUE_VERSION.slice(0, 2) === '3.' ) {
    version = 3; 
  }
  
  return version;
}

export default getVueVersion;