import { reactive } from 'vue';
import { SELECTION_MODE_ENUM } from '@/common/configure-common';

const selections = reactive({
  mode: SELECTION_MODE_ENUM.FILE,
  pen: undefined
});
export const useSelection = () => {
  const select = (pens) => {
    // 如果 pens 不存在或者长度为 0，则设置为文件选择模式
    // 文件
    if (!pens || pens.length === 0) {
      selections.mode = SELECTION_MODE_ENUM.FILE;
      selections.pen = undefined;
      return;
    }

    // 如果 pens 长度大于 1，则设置为组合选择模式
    // 组合
    if (pens.length > 1) {
      selections.mode = SELECTION_MODE_ENUM.COMBINE;
      selections.pen = pens;
      return;
    }

    // 如果 pens 长度为 1，则设置为选中图元模式
    // 选中图元
    selections.mode = SELECTION_MODE_ENUM.PEN;
    selections.pen = pens[0];
  };
  return {
    selections,
    select
  };
};
