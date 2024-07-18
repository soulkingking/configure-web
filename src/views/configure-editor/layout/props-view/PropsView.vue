<!--
 * @Author: .Soul
 * @Date: 2024-07-04 10:05:35
 * @LastEditors: .Soul
 * @LastEditTime: 2024-07-04 12:02:44
 * @Description: file content
 * @FilePath: /configure-web/src/views/configure-editor/layout/props-view/PropsView.vue
-->
<template>
  <!-- 文件属性面板 -->
  <template v-if="selections.mode === SELECTION_MODE_ENUM.FILE">
    <FileProps></FileProps>
  </template>
  <!-- 图形属性面板 -->
  <template v-else-if="selections.mode === SELECTION_MODE_ENUM.PEN">
    <!-- 线配置 -->
    <LineProps v-if="selections.pen.type == PenType.Line"></LineProps>
    <!-- 节点配置 -->
    <NodeProps v-else></NodeProps>
  </template>
  <!-- 多选属性面板 -->
  <template v-else-if="selections.mode === SELECTION_MODE_ENUM.COMBINE"> </template>
  <!-- 其他 -->
  <template v-else> </template>
</template>

<script setup>
import { PenType } from '@meta2d/core';
import FileProps from '../../components/material/file/FileProps.vue';
import LineProps from '../../components/material/line/LineProps.vue';
import NodeProps from '../../components/material/node/NodeProps.vue';
import { SELECTION_MODE_ENUM } from '@/common/configure-common';
import { useSelection } from '@/hooks/useSelection';
const { selections } = useSelection();
</script>

<style scoped>
:deep(.t-collapse) {
  border: none;
}
:deep(.t-collapse-panel__wrapper .t-collapse-panel__content) {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
</style>
