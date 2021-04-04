/**
 * 定义推送操作
 */
declare class PushBAIDU {
    siteIdList: string[];
    isDebug: boolean;
    constructor(siteIdList: string[], isDebug: boolean);
    /**
     * 批量部署站点
     */
    init(): void;
    /**
     * 批量提交pv上报
     */
    pv(pageUrl: string): void;
    /**
     * 批量提交事件上报
     */
    event(category: string, action: string, label: string, value: number): void;
}
export default PushBAIDU;
