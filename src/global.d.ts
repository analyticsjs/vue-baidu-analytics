import PushBAIDU from '@m/pushBAIDU'

declare global {
  interface Window {
    _hmt: any
  }

  interface Options {
    router: any
    siteIdList: string[]
    isDebug: boolean
  }
  
  interface Vue {
    prototype: any
    $pushBAIDU: PushBAIDU
  }
  
  interface To {
    fullPath: string
  }
}