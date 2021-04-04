/**
 * 暴露 Hooks
 * @description 解决 Vue 3.0 使用全局变量很麻烦的问题
 * @example
 * import { usePush } from 'vue-baidu-analytics'
 * const baidu = usePush();
 * baidu.pv('/');
 */
export declare function usePush(): {
    pv: (pageUrl: string) => void;
    event: (category: string, action: string, label: string, value: number) => void;
};
/**
 * 定义插件
 */
export default function install(Vue: Vue, { router, siteIdList, isDebug }: Partial<Options>): false | undefined;
