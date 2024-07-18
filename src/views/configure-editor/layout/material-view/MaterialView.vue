<template>
  <div class="p2 mb-2">
    <t-input placeholder="搜索组件"></t-input>
  </div>
  <t-tabs tabPosition="top" v-model="active">
    <t-tab-panel label="系统组件" value="basic">
      <div class="p2">
        <t-collapse expand-icon-placement="right" :borderless="true">
          <t-collapse-panel header="基本形状">
            <div class="grid grid-cols-3 gap-3">
              <div
                class="cursor-pointer py-2 border-1px border-solid border-transparent rounded-sm hover:border-blue-6"
                v-for="shape in shapes"
                :key="shape.key"
                draggable="true"
                @dragstart="onDragstart($event, shape.data)"
              >
                <div class="w-full h-8 text-center">
                  <component :is="shape.icon.type" v-bind="shape.icon.props"></component>
                </div>
                <div class="w-full text-center mt-2">{{ shape.label }}</div>
              </div>
            </div>
          </t-collapse-panel>
          <t-collapse-panel header="工业形状">
            <t-space break-line> </t-space>
          </t-collapse-panel>
        </t-collapse>
      </div>
    </t-tab-panel>
    <t-tab-panel label="我的组件" value="network">
      <div class="p2"></div>
    </t-tab-panel>
    <t-tab-panel label="结构" value="template">
      <div class="p2">
        <t-tree
          activable
          :data="structures"
          v-model:actived="actived"
          :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
          @click="handleActived"
        >
          <template #label="{ node }">
            <t-space :size="8" align="center">
              <ControlPlatformIcon />
              {{ node.label }}
            </t-space>
          </template>
          <template #operations="{ node }">
            <t-space :size="8" align="center">
              <t-button
                variant="text"
                shape="circle"
                size="small"
                @click.stop="handleVisible(node)"
              >
                <BrowseOffIcon v-if="node.data.visible == false"></BrowseOffIcon>
                <BrowseIcon v-else></BrowseIcon>
              </t-button>
              <t-popconfirm content="确认删除吗?" @confirm="handleDelete(node)">
                <t-button variant="text" shape="circle" size="small"
                  ><DeleteIcon></DeleteIcon
                ></t-button>
              </t-popconfirm>
            </t-space>
          </template>
        </t-tree>
      </div>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="jsx">
import { ref, inject, watchEffect } from 'vue';
import { handleTree } from '@/util';
import { deepClone } from '@meta2d/core';
import { useSelection } from '@/hooks/useSelection';
import {
  ControlPlatformIcon,
  DeleteIcon,
  BrowseIcon,
  BrowseOffIcon,
  RectangleIcon,
  CircleIcon,
  ChatMessageIcon,
  ImageIcon
} from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
const meta2d = inject('meta2d');
const active = ref('basic');
// 选中的图形
const material = ref(null);
// 当前激活的图形
const actived = ref([]);
// 结构
const structures = ref([]);

const { selections, select } = useSelection();

// 基础形状
const shapes = ref([
  {
    key: 'rectangle',
    label: '矩形',
    value: 'rectangle',
    icon: <RectangleIcon size="32"></RectangleIcon>,
    data: { name: 'rectangle', text: '矩形', width: 100, height: 100 }
  },
  {
    key: 'circle',
    label: '圆形',
    value: 'circle',
    icon: <CircleIcon size="32"></CircleIcon>,
    data: { name: 'circle', text: '圆形', width: 100, height: 100 }
  },
  {
    key: 'message',
    label: '消息框',
    value: 'message',
    icon: <ChatMessageIcon size="32"></ChatMessageIcon>,
    data: { name: 'message', text: '消息框', width: 100, height: 100 }
  },
  {
    key: 'image',
    label: '图片',
    value: 'image',
    icon: <ImageIcon size="32"></ImageIcon>,
    data: {
      name: 'image',
      text: '图片',
      width: 100,
      height: 100,
      image: 'https://tdesign.gtimg.com/demo/demo-image-1.png'
    }
  },
  {
    key: 'cube',
    label: '立方体',
    value: 'cube',
    icon: <ControlPlatformIcon size="32"></ControlPlatformIcon>,
    data: { name: 'cube', text: '立方体', width: 100, height: 100 }
  }
]);

// 更新结构
watchEffect(() => {
  structures.value = handleTree(
    deepClone(meta2d.value.store.data.pens),
    'id',
    'parentId',
    'childrenPens'
  );
});

// 更新图形
watchEffect(() => {
  material.value = selections.pen;
  actived.value = selections.pen
    ? Array.isArray(selections.pen)
      ? selections.pen.map((item) => item.id)
      : [selections.pen.id]
    : [];
});

// 拖拽添加图元
const onDragstart = (e, pen) => {
  e.dataTransfer.setData('Text', JSON.stringify(pen));
};

// 激活
const handleActived = () => {
  if (meta2d.value) {
    let pens = deepClone(meta2d.value.store.data.pens) || [];
    let activedPens = pens.filter((item) => actived.value.includes(item.id));
    select(activedPens);
    console.log(activedPens);
    // meta2d.value.active(activedPens);
  }
};

// 显示隐藏
const handleVisible = (node) => {
  console.log(node.data, node.data.visible == false ? true : false);
  meta2d.value.setVisible(node.data, node.data.visible == false ? true : false);
};

// 删除
const handleDelete = (node) => {
  meta2d.value.delete([node.data]);
  MessagePlugin.success('删除成功');
  select();
};
</script>

<style scoped>
:deep(.t-collapse-panel__wrapper .t-collapse-panel__content) {
  padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
}
</style>
