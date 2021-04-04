/**
 * 定义基础配置
 * 官方文档 https://tongji.baidu.com/open/api/more?p=guide_overview
 */
declare class BAIDU {
    siteId: string;
    isDebug: boolean;
    constructor(siteId?: string, isDebug?: boolean);
    /**
     * 初始化
     */
    init(): void;
    /**
     * 设置要响应的站点
     */
    setAccount(): void;
    /**
     * 提交PV、UV
     */
    trackPageview(pageUrl: string): void;
    /**
     * 提交点击事件
     */
    trackEvent(category: string, action: string, label: string, value: number): void;
}
export default BAIDU;
