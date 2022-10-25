import { type } from 'os'
import React, {ReactNode} from 'react'

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
  state = {error: null}

  //子组件抛出异常这里会接收到
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {error}
  }

  render() {
    const {error} = this.state
    const {fallbackRender, children} = this.props
    if(error) {
      return fallbackRender({error})
    }
    return children
  }
}

// type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// // https://github.com/bvaughn/react-error-boundary
// export class ErrorBoundary extends React.Component<
//   React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
//   { error: Error | null }
// > {
//   state = { error: null };

//   // 当子组件抛出异常，这里会接收到并且调用
//   static getDerivedStateFromError(error: Error) {
//     return { error };
//   }

//   render() {
//     const { error } = this.state;
//     const { fallbackRender, children } = this.props;
//     if (error) {
//       return fallbackRender({ error });
//     }
//     return children;
//   }
// }