/** 创建一个提供应用上下文的应用实例 */
declare function createApp(rootComponent: any): {
    mount(rootContainer: any): void;
};

declare const enum ShapeFlags {
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 2,
    STATEFUL_COMPONENT = 4,
    TEXT_CHILDREN = 8,
    ARRAY_CHILDREN = 16,
    SLOT_CHILDREN = 32,
    COMPONENT = 6
}

declare type Component = {
    setup: (props: object) => object;
    render: () => (type: any, props?: any, children?: any) => VNode;
};
declare type Data = Record<string, unknown>;
declare type Slot = (...args: any[]) => VNode[];
declare type InternalSlots = {
    [name: string]: Slot | undefined;
};
declare type Slots = Readonly<InternalSlots>;
interface ComponentInternalInstance {
    vnode: VNode;
    props: Data;
    emit: Function;
    slots: InternalSlots;
    type: any;
    /**
     * 此组件vdom树的 根vnode(虚拟节点)
     */
    subTree: VNode;
    /**
     * proxy
     */
    proxy: any;
    /**
     * ctx
     */
    ctx: Data;
}
declare const getCurrentInstance: () => ComponentInternalInstance;

declare type VNodeTypes = string | VNode | Component | typeof Fragment | typeof Text;
interface VNode {
    type: VNodeTypes;
    props: Record<string, any> | null;
    children: VNodeNormalizedChildren;
    el: Node | null;
    shapeFlag: ShapeFlags;
}
declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
declare type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
declare type VNodeNormalizedChildren = string | VNodeArrayChildren | null;
declare const Fragment: unique symbol;
declare const Text: unique symbol;
declare const createTextVNode: (text: string) => VNode;

/** 返回一个`虚拟节点` */
declare function h(type: any, props?: any, children?: any): VNode;

declare function renderSlots(slots: Slots, slotName: string, props: any): VNode | undefined;

export { createApp, createTextVNode, getCurrentInstance, h, renderSlots };
