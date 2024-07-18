import { EventAction, LineAnimateType } from '@meta2d/core';
// 事件名称
export const EVENT_NAME = [
  {
    label: '单击',
    content: '单击',
    value: 'click',
    key: 'click'
  },
  {
    label: '双击',
    content: '双击',
    value: 'dblclick',
    key: 'dblclick',
    divider: true
  },
  {
    label: '鼠标右键',
    content: '鼠标右键',
    value: 'contextmenu',
    key: 'contextmenu'
  },
  {
    label: '鼠标移入',
    content: '鼠标移入',
    value: 'enter',
    key: 'enter'
  },
  {
    label: '鼠标移出',
    content: '鼠标移出',
    value: 'leave',
    key: 'leave',
    divider: true
  },
  {
    label: '获取焦点',
    content: '获取焦点',
    value: 'active',
    key: 'active'
  },
  {
    label: '失去焦点',
    content: '失去焦点',
    value: 'inactive',
    key: 'inactive',
    divider: true
  },
  {
    label: '鼠标按下',
    content: '鼠标按下',
    value: 'mousedown',
    key: 'mousedown'
  },
  {
    label: '鼠标抬起',
    content: '鼠标抬起',
    value: 'mouseup',
    key: 'mouseup',
    divider: true
  },
  {
    label: '监听全局消息',
    content: '监听全局消息',
    value: 'message',
    key: 'message'
  }
];

// 逻辑关系
export const LOGICAL_RELATIONSHIP = [
  {
    label: '满足全部条件',
    value: 'and',
    key: 'and'
  },
  {
    label: '满足任意条件',
    value: 'or',
    key: 'or'
  }
];

// 关系运算符
export const COMPARISON = [
  {
    label: '等于',
    value: '=',
    key: '='
  },
  {
    label: '双等于',
    value: '==',
    key: '=='
  },
  {
    label: '不等于',
    value: '!=',
    key: '!='
  },
  {
    label: '大于',
    value: '>',
    key: '>'
  },
  {
    label: '小于',
    value: '<',
    key: '<'
  },
  {
    label: '大于等于',
    value: '>=',
    key: '>='
  },
  {
    label: '小于等于',
    value: '<=',
    key: '<='
  },
  {
    label: '介于',
    value: '[)',
    key: '[)'
  },
  {
    label: '不介于',
    value: '![)',
    key: '![)'
  },
  {
    label: '属于',
    value: '[]',
    key: '[]'
  },
  {
    label: '不属于',
    value: '![]',
    key: '![]'
  }
];

// 条件类型
export const CONDITION_TYPE = [
  {
    label: '关系条件',
    value: '',
    key: 'value'
  },
  {
    label: '高级条件',
    value: 'fn',
    key: 'fn'
  }
];

// 属性
export const ATTRIBUTE = [
  {
    content: '显示',
    label: '显示',
    value: 'visible',
    text: 'visible',
    key: 'visible'
  },
  {
    content: '状态',
    label: '状态',
    value: 'showChild',
    text: 'showChild',
    key: 'showChild'
  }
];

// 动作
export const EVENT_ACTION = [
  {
    label: '打开链接',
    value: EventAction.Link,
    key: 'Link'
  },
  {
    label: '更改属性',
    value: EventAction.SetProps,
    key: 'SetProps'
  },
  {
    label: '执行动画',
    value: EventAction.StartAnimate,
    key: 'StartAnimate'
  },
  {
    label: '暂停动画',
    value: EventAction.PauseAnimate,
    key: 'PauseAnimate'
  },
  {
    label: '停止动画',
    value: EventAction.StopAnimate,
    key: 'StopAnimate'
  },
  {
    label: '执行JS',
    value: EventAction.JS,
    key: 'JS'
  },
  {
    label: '执行全局函数',
    value: EventAction.GlobalFn,
    key: 'GlobalFn'
  },
  {
    label: '发送全局消息',
    value: EventAction.Emit,
    key: 'Emit'
  },
  {
    label: '播放视频',
    value: EventAction.StartVideo,
    key: 'StartVideo'
  },
  {
    label: '暂停视频',
    value: EventAction.PauseVideo,
    key: 'PauseVideo'
  },
  {
    label: '停止视频',
    value: EventAction.StopVideo,
    key: 'StopVideo'
  },
  {
    label: '发送属性数据',
    value: EventAction.SendPropData,
    key: 'SendPropData'
  },
  {
    label: '发送变量数据',
    value: EventAction.SendVarData,
    key: 'SendVarData'
  },
  {
    label: '导航',
    value: EventAction.Navigator,
    key: 'Navigator'
  },
  {
    label: '弹窗',
    value: EventAction.Dialog,
    key: 'Dialog'
  },
  {
    label: '发送数据',
    value: EventAction.SendData,
    key: 'SendData'
  },
  {
    label: '发送消息',
    value: EventAction.PostMessage,
    key: 'PostMessage'
  },
  {
    label: '发送消息到父级',
    value: EventAction.PostMessageToParent,
    key: 'PostMessageToParent'
  }
];

// 对象类型
export const TARGET_TYPE = [
  {
    label: '图元',
    value: 'id',
    key: 'id'
  },
  {
    label: '组',
    value: 'tag',
    key: 'id'
  }
];

// 值类型
export const VALUE_TYPE = [
  {
    label: '固定值',
    value: '',
    key: 'value'
  },
  {
    label: '对象属性值',
    value: 'prop',
    key: 'prop'
  }
];

// 线动画类型
export const LINE_ANIMATE_TYPE = [
  {
    label: '标准',
    value: LineAnimateType.Normal,
    key: 'NORMAL'
  },
  {
    label: '水珠',
    value: LineAnimateType.Beads,
    key: 'BEADS'
  },
  {
    label: '圆点',
    value: LineAnimateType.Dot,
    key: 'DOT'
  },
  {
    label: '箭头',
    value: LineAnimateType.Arrow,
    key: 'ARROW'
  },
  {
    label: '水',
    value: LineAnimateType.WaterDrop,
    key: 'WATER_DROP'
  }
];

// 连线类型
export const LINE_NAME = [
  {
    label: '曲线',
    value: 'curve',
    key: 'curve'
  },
  {
    label: '线段',
    value: 'polyline',
    key: 'polyline'
  },
  {
    label: '直线',
    value: 'line',
    key: 'line'
  },
  {
    label: '脑图曲线',
    value: 'mind',
    key: 'mind'
  }
];

/**
 * @typedef {Object} EVENT_NAME_ENUM
 * @property {string} CLICK - 点击事件
 * @property {string} DBLCLICK - 双击事件
 * @property {string} CONTEXTMENU - 上下文菜单事件
 * @property {string} ENTER - 进入事件
 * @property {string} LEAVE - 离开事件
 * @property {string} ACTIVE - 激活事件
 * @property {string} INACTIVE - 非激活事件
 * @property {string} MOUSEDOWN - 鼠标按下事件
 * @property {string} MOUSEUP - 鼠标释放事件
 * @property {string} MESSAGE - 消息事件
 */
export const EVENT_NAME_ENUM = {
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  CONTEXTMENU: 'contextmenu',
  ENTER: 'enter',
  LEAVE: 'leave',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MESSAGE: 'message'
};

/**
 * @typedef {Object} LOGICAL_RELATIONSHIP_ENUM
 * @property {string} AND - 逻辑与关系
 * @property {string} OR - 逻辑或关系
 */
export const LOGICAL_RELATIONSHIP_ENUM = {
  AND: 'and',
  OR: 'or'
};

/**
 * @typedef {Object} COMPARISON_ENUM
 * @property {string} EQUALS - 等于
 * @property {string} DOUBLE_EQUALS - 双等号比较
 * @property {string} NOT_EQUALS - 不等于
 * @property {string} GREATER_THAN - 大于
 * @property {string} LESS_THAN - 小于
 * @property {string} GREATER_THAN_OR_EQUAL - 大于等于
 * @property {string} LESS_THAN_OR_EQUAL - 小于等于
 * @property {string} BETWEEN - 在区间内（不包括边界）
 * @property {string} NOT_BETWEEN - 不在区间内（不包括边界）
 * @property {string} BELONGS_TO - 在区间内（包括边界）
 * @property {string} NOT_BELONGS_TO - 不在区间内（包括边界）
 */
export const COMPARISON_ENUM = {
  EQUALS: '=',
  DOUBLE_EQUALS: '==',
  NOT_EQUALS: '!=',
  GREATER_THAN: '>',
  LESS_THAN: '<',
  GREATER_THAN_OR_EQUAL: '>=',
  LESS_THAN_OR_EQUAL: '<=',
  BETWEEN: '[)',
  NOT_BETWEEN: '![)',
  BELONGS_TO: '[]',
  NOT_BELONGS_TO: '![]'
};

/**
 * @typedef {Object} CONDITION_TYPE_ENUM
 * @property {string} VALUE - 值条件
 * @property {string} FN - 函数条件
 */
export const CONDITION_TYPE_ENUM = {
  VALUE: '',
  FN: 'fn'
};

/**
 * @typedef {Object} ATTRIBUTE_ENUM
 * @property {string} SHOW_CHILD - 显示子项属性
 */
export const ATTRIBUTE_ENUM = {
  VISIBLE: 'visible',
  SHOW_CHILD: 'showChild'
};

/**
 * @typedef {Object} EVENT_ACTION_ENUM
 * @property {number} LINK - 链接动作
 * @property {number} SET_PROPS - 设置属性动作
 * @property {number} START_ANIMATE - 启动动画动作
 * @property {number} PAUSE_ANIMATE - 暂停动画动作
 * @property {number} STOP_ANIMATE - 停止动画动作
 * @property {number} JS - 执行JavaScript代码动作
 * @property {number} GLOBAL_FN - 调用全局函数动作
 * @property {number} EMIT - 发射事件动作
 * @property {number} START_VIDEO - 启动视频播放动作
 * @property {number} PAUSE_VIDEO - 暂停视频播放动作
 * @property {number} STOP_VIDEO - 停止视频播放动作
 * @property {number} SEND_PROP_DATA - 发送属性数据动作
 * @property {number} SEND_VAR_DATA - 发送变量数据动作
 * @property {number} NAVIGATOR - 导航动作
 * @property {number} DIALOG - 显示对话框动作
 * @property {number} SEND_DATA - 发送数据动作
 * @property {number} POSTMESSAGE - 发送消息动作
 * @property {number} POST_MESSAGE_TO_PARENT - 向父窗口发送消息动作
 */
export const EVENT_ACTION_ENUM = {
  LINK: EventAction.Link,
  SET_PROPS: EventAction.SetProps,
  START_ANIMATE: EventAction.StartAnimate,
  PAUSE_ANIMATE: EventAction.PauseAnimate,
  STOP_ANIMATE: EventAction.StopAnimate,
  JS: EventAction.JS,
  GLOBAL_FN: EventAction.GlobalFn,
  EMIT: EventAction.Emit,
  START_VIDEO: EventAction.StartVideo,
  PAUSE_VIDEO: EventAction.PauseVideo,
  STOP_VIDEO: EventAction.StopVideo,
  SEND_PROP_DATA: EventAction.SendPropData,
  SEND_VAR_DATA: EventAction.SendVarData,
  NAVIGATOR: EventAction.Navigator,
  DIALOG: EventAction.Dialog,
  SEND_DATA: EventAction.SendData,
  POSTMESSAGE: EventAction.PostMessage,
  POST_MESSAGE_TO_PARENT: EventAction.PostMessageToParent
};

/**
 * @typedef {Object} TARGET_TYPE_ENUM
 * @property {string} ID - 通过ID选择目标
 * @property {string} TAG - 通过标签名选择目标
 */
export const TARGET_TYPE_ENUM = {
  ID: 'id',
  TAG: 'tag'
};

/**
 * @typedef {Object} VALUE_TYPE_ENUM
 * @property {string} VALUE - 基本值类型
 * @property {string} PROP - 属性值类型
 */
export const VALUE_TYPE_ENUM = {
  VALUE: '',
  PROP: 'prop'
};

/**
 * @typedef {Object} LINE_ANIMATE_TYPE_ENUM
 * @property {string} NORMAL - 标准类型
 * @property {string} BEADS - 水珠类型
 * @property {string} DOT - 圆点类型
 * @property {string} ARROW - 箭头类型
 * @property {string} WATER_DROP - 水类型
 */
export const LINE_ANIMATE_TYPE_ENUM = {
  NORMAL: LineAnimateType.Normal,
  BEADS: LineAnimateType.Beads,
  DOT: LineAnimateType.Dot,
  ARROW: LineAnimateType.Arrow,
  WATER_DROP: LineAnimateType.WaterDrop
};

/**
 * @typedef {Object} SELECTION_MODE_ENUM
 * @property {string} NORMAL - 标准类型
 * @property {string} BEADS - 水珠类型
 * @property {string} DOT - 圆点类型
 * @property {string} ARROW - 箭头类型
 * @property {string} WATER_DROP - 水类型
 */
export const SELECTION_MODE_ENUM = {
  FILE: 0,
  PEN: 1,
  COMBINE: 2
};

/**
 * @typedef {Object} LINE_NAME_ENUM
 * @property {string} CURVE - 曲线
 * @property {string} POLYLINE - 线段
 * @property {string} LINE - 直线
 * @property {string} MIND - 脑图曲线
 */
export const LINE_NAME_ENUM = {
  CURVE: 'curve',
  POLYLINE: 'polyline',
  LINE: 'line',
  MIND: 'mind'
};
