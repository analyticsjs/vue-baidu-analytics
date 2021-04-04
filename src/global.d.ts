import PushBAIDU from '@m/pushBAIDU'

declare global {
  interface Window {
    _hmt: any;
  }

  interface Options {
    router: any;
    siteIdList: string[];
    isDebug: boolean;
  }

  interface Vue {
    prototype: any;
    $pushBAIDU: PushBAIDU;
    version: number | string;
    config: any;
  }

  interface To {
    fullPath: string;
  }
}
