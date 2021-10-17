import {
    extend,
    isFunction,
    isString,
    shapeFlagMap,
    ShapeFlags
} from '../../shared/index'
import { Component, Data } from './component'

export type VNodeTypes = string | VNode | Component
export interface VNode {
    type: VNodeTypes
    props: Record<string, any> | null
    children: VNodeChildren | null
    el: Element | null
    shapeFlag: ShapeFlags
}
type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>
export type VNodeChildren = VNodeChildAtom | VNodeArrayChildren

/** 创建虚拟节点 */
export const createVNode = (
    type: string | Component,
    props: Data | null = null,
    children: VNodeChildren = null,
    shapeFlag: ShapeFlags = initShapFlag(type)
): VNode => {
    const vnode = extend(new VNode(), {
        type,
        props,
        children,
        el: null,
        shapeFlag
    } as VNode)

    /* 子节点是文本时 标为 TEXT_CHILDREN 否则视为 ARRAY_CHILDREN */
    vnode.shapeFlagMark(isString(children) ? 'TEXT_CHILDREN' : 'ARRAY_CHILDREN')

    return vnode
}

/**
 * @internal
 * vnode 位运算函数类
 */
export class VNode {
    /**
     * 为 shapeFlag 添加xxx标志
     */
    shapeFlagMark(flagName: keyof typeof ShapeFlags) {
        this.shapeFlag! |= shapeFlagMap[flagName]
    }
    /**
     * shapeFlag 有 xxx 标志
     */
    shapeFlagIs(flagName: keyof typeof ShapeFlags) {
        return !!(this.shapeFlag! & shapeFlagMap[flagName])
    }
}
/** 初始化VNode的默认shapeFlags */
const initShapFlag = (type: VNodeTypes) =>
    isString(type)
        ? ShapeFlags.ELEMENT
        : isFunction(type)
        ? ShapeFlags.FUNCTIONAL_COMPONENT
        : ShapeFlags.STATEFUL_COMPONENT
