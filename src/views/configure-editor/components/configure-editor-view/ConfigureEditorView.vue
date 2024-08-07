<template>
  <div class="w-full h-full pos-relative">
    <div id="meta2dTarget" class="w-full h-full" ref="meta2dTarget"></div>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, ref, onUnmounted, nextTick, reactive, inject } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { Meta2d } from '@meta2d/core';
import { flowPens } from '@meta2d/flow-diagram';
import { activityDiagram } from '@meta2d/activity-diagram';
import { classPens } from '@meta2d/class-diagram';
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram';
import { formPens } from '@meta2d/form-diagram';

import ContextMenu from '@imengyu/vue3-context-menu';
import { useConfigureEditorStore } from '@/stores/configure-editor';
import { storeToRefs } from 'pinia';
import { MessagePlugin } from 'tdesign-vue-next';
import { DeleteIcon, AlignTopIcon, CombinationIcon } from 'tdesign-icons-vue-next';
import { useSelection } from '@/hooks/useSelection';
import { SELECTION_MODE_ENUM } from '@/common/configure-common';
const meta2d = inject('meta2d');
const meta2dTarget = ref();
const meta2dOptions = ref({
  rule: true
});
const configureEditorStore = useConfigureEditorStore();
const { dataSheets } = storeToRefs(configureEditorStore);
// 选中
const { select, selections } = useSelection();
// 右键菜单
const getMenuData = () => {
  return {
    theme: 'default',
    minWidth: 200,
    items: [
      {
        label: '置顶',
        icon: <AlignTopIcon />,
        divided: true,
        disabled: selections.mode === SELECTION_MODE_ENUM.FILE,
        onClick: () => {
          meta2d.value.top(selections.pen);
          MessagePlugin.success('置顶成功');
          ContextMenu.closeContextMenu();
        }
      },
      {
        label: '置底',
        icon: <AlignTopIcon />,
        divided: true,
        disabled: selections.mode === SELECTION_MODE_ENUM.FILE,
        onClick: () => {
          meta2d.value.bottom(selections.pen);
          MessagePlugin.success('置底成功');
          ContextMenu.closeContextMenu();
        }
      },
      {
        label: '删除',
        icon: <DeleteIcon />,
        disabled: selections.mode === SELECTION_MODE_ENUM.FILE,
        onClick: () => {
          meta2d.value.delete([selections.pen]);
          MessagePlugin.success('删除成功');
          ContextMenu.closeContextMenu();
        }
      },
      {
        label: '组合',
        icon: <CombinationIcon />,
        hidden: selections.mode !== SELECTION_MODE_ENUM.COMBINE,
        onClick: () => {
          meta2d.value.combine(selections.pen);
          ContextMenu.closeContextMenu();
          meta2d.value.emit('updateStructure');
        }
      },
      {
        label: '组合状态',
        icon: <CombinationIcon />,
        hidden: selections.mode !== SELECTION_MODE_ENUM.COMBINE,
        onClick: () => {
          meta2d.value.combine(selections.pen, 0);
          ContextMenu.closeContextMenu();
          meta2d.value.emit('updateStructure');
        }
      },
      {
        label: '取消组合',
        icon: <CombinationIcon />,
        disabled: !(
          selections.mode === SELECTION_MODE_ENUM.PEN &&
          selections.pen.children &&
          selections.pen.children.length > 0
        ),
        onClick: () => {
          meta2d.value.uncombine(selections.pen);
          ContextMenu.closeContextMenu();
          meta2d.value.emit('updateStructure');
        }
      }
    ]
  };
};

// 画布宽高
const { width, height } = useElementBounding(meta2dTarget);

onMounted(() => {
  meta2dOptions.value.width = width.value;
  meta2dOptions.value.height = height.value;
  initMeta2d();
});

// 初始化布局
const initMeta2d = () => {
  nextTick(() => {
    meta2d.value = new Meta2d('meta2dTarget', meta2dOptions.value);
    meta2d.value.register(flowPens());
    meta2d.value.register(activityDiagram());
    meta2d.value.register(classPens());
    meta2d.value.register(sequencePens());
    meta2d.value.registerCanvasDraw(sequencePensbyCtx());
    meta2d.value.registerCanvasDraw(formPens());

    // 加载数据
    if (dataSheets.value) {
      meta2d.value.open(dataSheets.value);
    }
    // 监听消息事件
    meta2d.value.on('active', active);
    meta2d.value.on('inactive', inactive);
    meta2d.value.on('contextmenu', contextmenu);
    meta2d.value.on('click', click);
  });
};

// 右键菜单
const contextmenu = ({ e }) => {
  // 获取当前激活的节点
  const menuData = getMenuData();
  menuData.x = e.clientX;
  menuData.y = e.clientY;
  ContextMenu.showContextMenu(menuData);
};

// 点击
const click = () => {
  ContextMenu.closeContextMenu();
};

// 激活
const active = (pens) => {
  select(pens);
};
// 取消激活
const inactive = () => {
  select();
};

onUnmounted(() => {
  if (meta2d.value) {
    meta2d.value.destroy();
  }
});

// 导出画布实例
defineExpose(reactive({ meta2d }));
</script>

<style scoped></style>
