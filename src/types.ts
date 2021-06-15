import PushBAIDU from '@m/pushBAIDU'

export interface Options {
  router: any
  siteIdList: string[]
  isDebug: boolean
}

export interface Vue {
  prototype: any
  $pushBAIDU: PushBAIDU
  version: number | string
  config: any
}
