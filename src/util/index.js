/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 生成一个枚举对象。
 * @param {Array<{key: string, value: any}>} data - 包含要转换为枚举的对象数组。
 * @returns {{key:string,value:any}} 枚举对象，其中key为字符串，value为传入的值。
 */
export const generateEnum = (data = []) => {
  // 初始化一个空对象，用于存储最终的枚举对象。
  let result = {};

  // 验证data是否为数组
  if (!Array.isArray(data)) {
    throw new TypeError('Expected input to be an array');
  }

  data.forEach((item) => {
    // 验证每个元素是否有key和value属性，并且key是字符串
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof item.key !== 'string' ||
      typeof item.value === 'undefined'
    ) {
      throw new Error('Each data item must be an object with a string "key" and a defined "value"');
    }

    // 检查是否存在重复的key，如果存在，根据需求处理（这里我们选择抛出错误）
    if (result[item.key] !== undefined) {
      throw new Error(`Duplicate key "${item.key}" found. Keys must be unique.`);
    }

    // 将每个数据项的key作为属性名，value作为属性值，添加到结果对象中。
    result[item.key] = item.value;
  });

  // 返回构建完成的枚举对象。
  return result;
};

/**
 * 获取默认服务器地址
 * @returns
 */
export function getBaseUrl() {
  return import.meta.env.MODE === 'production'
    ? window.location.origin + import.meta.env.VITE_APP_BASE_API
    : import.meta.env.VITE_APP_BASE_API;
}
