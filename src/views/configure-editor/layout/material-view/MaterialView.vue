<template>
  <div class="p2 mb-2">
    <t-input placeholder="搜索组件"></t-input>
  </div>
  <t-tabs tabPosition="top" v-model="active">
    <t-tab-panel label="系统组件" value="basic">
      <div class="p0 node-props-container overflow-auto narrow-scrollbar">
        <t-collapse expand-icon-placement="right" :borderless="true" default-expand-all>
          <t-collapse-panel
            :header="materialIcon.name"
            v-for="materialIcon in materialIcons"
            :key="materialIcon.name"
          >
            <div class="grid grid-cols-3 gap-3">
              <div
                class="cursor-pointer py-2 border-1px border-solid border-transparent rounded-sm hover:border-blue-6"
                v-for="shape in materialIcon.list"
                :key="shape.key"
                draggable="true"
                @dragstart="onDragstart($event, shape.data)"
              >
                <div class="w-full h-8 text-center">
                  <t-icon :name="shape.icon" size="32px" v-if="shape.icon"></t-icon>
                  <img v-else-if="shape.image" :src="shape.image" class="w-8 h-8" />
                  <div v-else-if="shape.svg" v-html="shape.svg" class="w-8 h-8"></div>
                </div>
                <div class="w-full text-center mt-2">{{ shape.label }}</div>
              </div>
            </div>
          </t-collapse-panel>
        </t-collapse>
      </div>
    </t-tab-panel>
    <t-tab-panel label="我的组件" value="network">
      <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
    </t-tab-panel>
    <t-tab-panel label="结构" value="template">
      <div class="p0 node-props-container overflow-auto narrow-scrollbar">
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
import { ref, inject, watchEffect, onMounted } from 'vue';
import { deepClone } from '@meta2d/core';
import { useSelection } from '@/hooks/useSelection';
import { ControlPlatformIcon, DeleteIcon, BrowseIcon, BrowseOffIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { useIcons } from './useIcons';
const meta2d = inject('meta2d');
const structures = inject('structures');

const active = ref('basic');
// 选中的图形
const material = ref(null);
// 当前激活的图形
const actived = ref([]);

const { selections, select } = useSelection();
const { icons, getOtherIcons } = useIcons();

// 基础形状
const materialIcons = ref(icons);

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
    let pens = meta2d.value.store.data.pens || [];
    let activedPens = pens.filter((item) => actived.value.includes(item.id));
    select(activedPens);
    meta2d.value.active(activedPens);
  }
};

// 显示隐藏
const handleVisible = (node) => {
  meta2d.value.setVisible(node.data, node.data.visible == false ? true : false);
};

// 删除
const handleDelete = (node) => {
  meta2d.value.delete([node.data]);
  MessagePlugin.success('删除成功');
  select();
};

onMounted(async () => {
  const icons = await getOtherIcons();
  materialIcons.value.push(...icons.flat(2));
});
</script>

<style scoped>
.node-props-container {
  max-height: calc(100vh - 170px);
}
:deep(.t-collapse-panel__wrapper .t-collapse-panel__content) {
  padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
}
</style>
