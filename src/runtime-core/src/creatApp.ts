import { render } from './renderer'
import { createVNode } from './vnode'

/** 创建一个提供应用上下文的应用实例 */
export function createApp(rootComponent: any) {
    return {
        mount(rootContainer: any) {
            // 先把组件转化成虚拟节点 component -> VNode
            // 所有逻辑操作都会基于 VNode 做处理
            const vnode = createVNode(rootComponent)

            render(vnode, rootContainer)
        }
    }
}
