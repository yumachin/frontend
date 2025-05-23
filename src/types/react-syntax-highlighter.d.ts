declare module "react-syntax-highlighter" {
  import * as React from "react"

  export interface SyntaxHighlighterProps {
    language?: string
    style?: any
    children?: React.ReactNode
    wrapLongLines?: boolean
  }

  export class Prism extends React.Component<SyntaxHighlighterProps> {}
  export class Light extends React.Component<SyntaxHighlighterProps> {}
  export class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const vscDarkPlus: any
  export const oneLight: any
}
