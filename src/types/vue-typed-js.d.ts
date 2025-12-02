declare module 'vue-typed-js' {
  import { DefineComponent } from 'vue'

  export const VueTypedJs: DefineComponent<{
    strings: string[]
    loop?: boolean
    typeSpeed?: number
    backSpeed?: number
    backDelay?: number
    startDelay?: number
    showCursor?: boolean
    cursorChar?: string
    contentType?: string
  }>
}
