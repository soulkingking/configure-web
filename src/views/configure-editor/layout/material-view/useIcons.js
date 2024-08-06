import { userPensUrl } from '@/config/user.config';
import axios from 'axios';
import { iconMap } from '../../../../../public/path2D/index';
import { canvasDrawMap } from '../../../../../public/canvasDraw/index';
import { parseSvg } from '@meta2d/svg';
export function useIcons() {
  const icons = [
    {
      name: '基本形状',
      show: true,
      list: [
        {
          key: 'rectangle',
          label: '矩形',
          value: 'rectangle',
          icon: 'rectangle',
          data: {
            name: 'rectangle',
            text: '矩形',
            width: 100,
            height: 100,
            progress: 0,
            verticalProgress: false
          }
        },
        {
          key: 'circle',
          label: '圆形',
          value: 'circle',
          icon: 'circle',
          data: {
            name: 'circle',
            text: '圆形',
            width: 100,
            height: 100,
            progress: 0,
            verticalProgress: false
          }
        },
        {
          key: 'message',
          label: '消息框',
          value: 'message',
          icon: 'chat-message',
          data: {
            name: 'message',
            text: '消息框',
            width: 100,
            height: 100,
            progress: 0,
            verticalProgress: false
          }
        },
        {
          key: 'image',
          label: '图片',
          value: 'image',
          icon: 'image',
          data: {
            name: 'image',
            text: '图片',
            width: 100,
            height: 100,
            image: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
            progress: 0,
            verticalProgress: false
          }
        },
        {
          key: 'cube',
          label: '立方体',
          value: 'cube',
          icon: 'control-platform',
          data: {
            name: 'cube',
            text: '立方体',
            width: 100,
            height: 100,
            progress: 0,
            verticalProgress: false
          }
        }
      ]
    }
  ];
  const getFileName = (name) => {
    const n = name.lastIndexOf('.');
    if (n !== -1) {
      return name.substring(0, n);
    }
    return name;
  };

  /**
   * 异步添加图标
   *
   * @param url 图标路径
   * @returns 包含图标信息的对象
   */
  const addIcons = async (url) => {
    // 请求路径
    let data = await fetch('/icon/' + url + '/iconfont.json').then((rsp) => rsp.json());
    let iconGroup = {
      name: data.name,
      loaded: true,
      show: true,
      list: []
    };
    data.glyphs.map((item) =>
      iconGroup.list.push({
        // 侧边栏信息
        name: item.name,
        // 侧边栏目显示
        icon: data.css_prefix_text + item.font_class,
        data: {
          // 配置图元信息
          width: 100,
          height: 100,
          name: 'icon', // 指定为icon类型
          iconFamily: data.font_family, // 字体图标配置
          icon: String.fromCharCode(item.unicode_decimal) // 字体图标
        }
      })
    );
    return iconGroup;
  };

  /**
   * 异步获取 Unicode 图标
   *
   * @returns 返回包含 Unicode 图标的数组
   */
  const getUnicodeIcons = async () => {
    let icons = [];
    const iconsUrl = await userPensUrl.icon(); // 获取字体图标的路径
    icons = await Promise.all(iconsUrl.map((url) => addIcons(url.name))); // 添加字体图标
    return icons; // 返回结果
  };

  /**
   * 获取SVG文件列表
   *
   * @returns Promise<Array<Object>> - SVG文件列表的Promise对象
   */
  const getSvgList = async () => {
    const folderName = 'svg/';
    let svgList = [];
    const svgUrl = await userPensUrl.svg();
    for (let i of svgUrl) {
      if (i.type === 'directory') {
        const { data: files } = await axios.get(folderName + i.name + '/');
        svgList.push({
          name: i.name,
          count: files.length,
          list: [], // 进行懒加载 暂时不获取文件内容
          folder: true, // 标记为文件夹 懒加载时进行处理
          show: true,
          svg: true, // 标记为svg文件
          loaded: false // 是否已经懒加载
        });
      }
    }
    return svgList;
  };

  /**
   * 获取PNG图片列表
   *
   * @returns {Promise<Array<Object>>} 包含PNG图片信息的数组，其中每个对象代表一个图片或文件夹
   *   - name {string} 文件夹或图片的名称
   *   - count {number} 如果是文件夹，则为该文件夹下文件的数量；如果是图片，则不存在此属性
   *   - list {Array<Object>} 如果是文件夹，则为该文件夹下文件的列表，初始为空数组，表示懒加载；如果是图片，则不存在此属性
   *   - folder {boolean} 是否为文件夹，true表示文件夹，false表示图片
   *   - show {boolean} 是否显示该文件夹或图片，true表示显示，false表示不显示
   *   - svg {boolean} 是否为SVG文件，true表示SVG文件，false表示PNG文件
   *   - loaded {boolean} 是否已加载文件夹下的文件列表，true表示已加载，false表示未加载
   */
  const getPngList = async () => {
    const folderName = 'png/';
    let png = [];
    const pngUrl = await userPensUrl.png();
    for (let i of pngUrl) {
      if (i.type === 'directory') {
        const { data: files } = await axios.get(folderName + i.name + '/');
        png.push({
          name: i.name,
          count: files.length,
          list: [], // 进行懒加载 暂时不获取文件内容
          folder: true, // 标记为文件夹 懒加载时进行处理
          show: true,
          svg: false, // 标记为png文件
          loaded: false
        });
      }
    }
    return png;
  };

  /**
   * 获取路径2D列表
   *
   * @returns 返回包含路径2D信息的数组
   */
  const getPath2DList = async () => {
    const folderName = 'path2D/';
    let path2d = [];
    const path2DUrl = await userPensUrl.path2D();
    for (let i of path2DUrl) {
      if (i.type === 'directory') {
        const { data: files } = await axios.get(folderName + i.name + '/');
        let dataList = [];
        for (let j of files) {
          const name = getFileName(j.name);
          dataList.push({
            name,
            icon: iconMap[name], // 侧边栏展示图标
            data: {
              width: 100,
              height: 100,
              name,
              text: name
            }
          });
        }
        path2d.push({
          name: i.name,
          count: files.length,
          list: dataList,
          show: true
        });
      }
    }
    return path2d;
  };

  /**
   * 异步获取Canvas绘图的目录结构和数据列表
   *
   * @returns 返回一个包含Canvas绘图目录结构和数据列表的数组
   */
  const getCanvasDraw = async () => {
    const folderName = 'canvasDraw/';
    let canvasDraw = [];
    const canvasUrl = await userPensUrl.canvasDraw();
    for (let i of canvasUrl) {
      if (i.type === 'directory') {
        const { data: files } = await axios.get(folderName + i.name + '/');
        let dataList = [];
        for (let j of files) {
          const name = getFileName(j.name);
          dataList.push({
            name,
            icon: canvasDrawMap[name], // 侧边栏展示图标
            data: {
              width: 100,
              height: 100,
              name,
              text: name
            }
          });
        }
        canvasDraw.push({
          name: i.name,
          count: files.length,
          list: dataList,
          show: true
        });
      }
    }
    return canvasDraw;
  };

  /**
   * 异步获取其他类型的图标数据
   *
   * @returns 返回一个包含其他类型图标数据的数组
   */
  const getOtherIcons = async () => {
    let result = [];
    let dataList = await Promise.all([
      getUnicodeIcons(), // 引入字体图标
      getSvgList(),
      getPngList(),
      getPath2DList(),
      getCanvasDraw()
    ]);
    result.push(...dataList.filter(Boolean));
    return result;
  };

  /**
   * 将 SVG 文件转换为 pens 对象
   *
   * @param f 文件对象，包含 SVG 文件的文件名
   * @param dName 目录名，SVG 文件所在的目录
   * @returns 包含 SVG 文件相关信息的 pens 对象
   */
  const svgToPens = async (f, dName) => {
    const name = getFileName(f.name);
    const image = '/svg/' + dName + '/' + f.name;
    return {
      name,
      image,
      data: parseSvg(await fetch(image).then((res) => res.text())),
      component: true
    };
  };

  /**
   * 将 PNG 图片转换为 Pens 所需的数据结构
   *
   * @param f 文件对象，包含文件名等信息
   * @param dName 目录名，指定转换后图片存储的目录
   * @returns 包含文件名和图片路径的对象
   */
  const pngToPens = async (f, dName) => {
    const name = getFileName(f.name);
    const image = '/png/' + dName + '/' + f.name;
    return {
      name,
      image
    };
  };

  return {
    icons,
    getOtherIcons,
    svgToPens,
    pngToPens
  };
}
