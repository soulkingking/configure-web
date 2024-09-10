<!--
 * @Author: .Soul
 * @Date: 2024-07-04 10:05:35
 * @LastEditors: .Soul
 * @LastEditTime: 2024-07-04 12:02:44
 * @Description: file content
 * @FilePath: /configure-web/src/views/configure-editor/layout/props-view/PropsView.vue
-->
<template>
  <t-form label-width="100px" v-if="materials" label-align="left">
    <t-tabs size="medium" tabPosition="top" v-model="active">
      <t-tab-panel label="外观" value="basic">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar">
          <t-collapse :default-value="[0]">
            <t-collapse-panel header="大屏对齐">
              <t-space :size="8" break-line align="center">
                <t-tooltip :content="item.label" v-for="item in ALGIN_TYPE" :key="item.key">
                  <t-button variant="text" shape="square" @click.stop="alignNodesV(item)">
                    <template #icon>
                      <IconFont :name="item.icon" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
              </t-space>
            </t-collapse-panel>
            <t-collapse-panel header="区域对齐">
              <t-space :size="8" break-line align="center">
                <t-tooltip :content="item.label" v-for="item in ALGIN_TYPE" :key="item.key">
                  <t-button variant="text" shape="square" @click.stop="alignNodes(item)">
                    <template #icon>
                      <IconFont :name="item.icon" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
                <t-tooltip content="水平等距">
                  <t-button variant="text" shape="square" @click.stop="spaceBetween">
                    <template #icon>
                      <IconFont name="t-icon-shuipingdengjufenbu" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
                <t-tooltip content="垂直等距">
                  <t-button variant="text" shape="square" @click.stop="spaceBetweenColumn">
                    <template #icon>
                      <IconFont name="t-icon-chuizhidengjufenbu" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
              </t-space>
            </t-collapse-panel>
            <t-collapse-panel header="以最后选中图元对齐">
              <t-space :size="8" break-line align="center">
                <t-tooltip :content="item.label" v-for="item in ALGIN_TYPE" :key="item.key">
                  <t-button variant="text" shape="square" @click.stop="alignNodesByLast(item)">
                    <template #icon>
                      <IconFont :name="item.icon" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
                <t-tooltip content="相同大小">
                  <t-button variant="text" shape="square" @click.stop="beSameByLast">
                    <template #icon>
                      <IconFont name="t-icon-quxiaozuhe" :url="[]"></IconFont>
                    </template>
                  </t-button>
                </t-tooltip>
              </t-space>
            </t-collapse-panel>
            <t-collapse-panel header="外观">
              <t-form-item label="线宽度" name="lineWidth">
                <t-input-number
                  v-model="material.lineWidth"
                  :min="0"
                  @change="changeValue('lineWidth')"
                />
              </t-form-item>
              <t-form-item label="线条样式">
                <t-select v-model="material.dash" @change="changeDashValue">
                  <t-option
                    v-for="dash in DASH_TYPE"
                    :value="dash.value"
                    :label="dash.label"
                    :key="dash.key"
                  >
                  </t-option>
                </t-select>
              </t-form-item>
              <t-form-item label="线颜色">
                <t-color-picker
                  v-model="material.color"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('color')"
                />
              </t-form-item>
              <t-form-item label="背景颜色">
                <t-color-picker
                  v-model="material.background"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('background')"
                />
              </t-form-item>
            </t-collapse-panel>
          </t-collapse>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<script setup lang="jsx">
import { ref, inject, watchEffect } from 'vue';
import { IconFont } from 'tdesign-icons-vue-next';
import { DASH_TYPE, ALGIN_TYPE, DASH_TYPE_ENUM } from '@/common/configure-common';
import { useSelection } from '@/hooks/useSelection';
import { PI_META_2D, PI_STRUCTURES } from '@/common/index';
const meta2d = inject(PI_META_2D);
const { selections } = useSelection();
// 选中的图形
const material = ref({});
const materials = ref(null);

watchEffect(() => {
  materials.value = selections.pen;
  material.value = {};
});

// 默认激活
const active = ref('basic');

// 更新属性
const changeValue = (prop) => {
  materials.value.forEach((item) => {
    const v = { id: item.id };
    v[prop] = material.value[prop];
    meta2d.value.setValue(v, { render: false });
  });
  meta2d.value.render();
};

// 更新边框属性
const changeDashValue = (value) => {
  const dash = DASH_TYPE.find((item) => item.value === value);
  materials.value.forEach((item) => {
    const v = { id: item.id };
    v.dash = dash.value;
    switch (dash.value) {
      case DASH_TYPE_ENUM.NONE:
        v.lineWidth = 0;
        v.lineDash = undefined;
        break;

      case DASH_TYPE_ENUM.SOLID:
        if (material.value.lineWidth == 0) {
          v.lineWidth = 1;
        }
        v.lineDash = undefined;
        break;

      case DASH_TYPE_ENUM.SHORT_DASHED:
        if (material.value.lineWidth == 0) {
          v.lineWidth = 1;
        }
        v.lineDash = dash.lineDash;
        break;

      case DASH_TYPE_ENUM.LONG_DASHED:
        if (material.value.lineWidth == 0) {
          v.lineWidth = 1;
        }
        v.lineDash = dash.lineDash;
        break;

      case DASH_TYPE_ENUM.DASH_DOTTED:
        if (material.value.lineWidth == 0) {
          v.lineWidth = 1;
        }
        v.lineDash = dash.lineDash;
        break;

      default:
        break;
    }
    meta2d.value.setValue(v, { render: false });
  });
  meta2d.value.render();
};

// 大屏对齐
const alignNodesV = (item) => {
  meta2d.value.alignNodesV(item.value, meta2d.value.store.active);
};

// 区域对齐
const alignNodes = (item) => {
  meta2d.value.alignNodes(item.value, meta2d.value.store.active);
};

// 水平等距
const spaceBetween = () => {
  meta2d.value.spaceBetween(meta2d.value.store.active);
};

// 垂直等距
const spaceBetweenColumn = () => {
  meta2d.value.spaceBetweenColumn(meta2d.value.store.active);
};

// 以最后选中图元对齐
const alignNodesByLast = (item) => {
  meta2d.value.alignNodesByLast(item.value, meta2d.value.store.active);
};

// 相同大小
const beSameByLast = () => {
  meta2d.value.beSameByLast(meta2d.value.store.active);
};
</script>
<style scoped>
.node-props-container {
  max-height: calc(100vh - 170px);
}
.event-btn {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
:deep(.t-upload__card-item) {
  width: 100%;
  height: 100%;
  min-height: 160px;
}
:deep(.t-upload__card-container) {
  width: 100%;
  height: 100%;
  min-height: 160px;
}
:deep(.t-upload__card-content) {
  width: 100%;
  height: 100%;
  min-height: 160px;
}

.animation-btn {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
</style>
