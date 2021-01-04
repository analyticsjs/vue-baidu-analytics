declare class BAIDU {
    siteId: string;
    isDebug: boolean;
    constructor(siteId?: string, isDebug?: boolean);
    init(): void;
    setAccount(): void;
    trackPageview(pageUrl: string): void;
    trackEvent(category: string, action: string, label: string, value: number): boolean;
}
export default BAIDU;
