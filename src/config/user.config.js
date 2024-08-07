import axios from 'axios';

// 用户自定义路径，方便用户扩充，并直接返回数据
export async function getUserDir(path, extend = []) {
  const { data: fileList } = await axios.get(path);
  return fileList.concat(extend); // 合并路径，方便未来用户自定义扩充路径
}

// 用户自定义路径，方便用户扩充，并直接初始化数据
export const userPensUrl = {
  icon: async () => await getUserDir('/icon/', []),
  svg: async () => await getUserDir('/svg/', []),
  png: async () => await getUserDir('/png/', []),
  path2D: async () => await getUserDir('/path2D/', []),
  canvasDraw: async () => await getUserDir('/canvasDraw/', [])
};
