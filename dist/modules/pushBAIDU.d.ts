declare class PushBAIDU {
    siteIdList: string[];
    isDebug: boolean;
    constructor(siteIdList: string[], isDebug: boolean);
    init(): void;
    pv(pageUrl: string): void;
    event(category: string, action: string, label: string, value: number): void;
}
export default PushBAIDU;
