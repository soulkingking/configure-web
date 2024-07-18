<!--
 * @Author: .Soul
 * @Date: 2024-07-04 10:05:35
 * @LastEditors: .Soul
 * @LastEditTime: 2024-07-04 12:02:44
 * @Description: file content
 * @FilePath: /configure-web/src/views/configure-editor/layout/props-view/PropsView.vue
-->
<template>
  <t-form :model="material" label-width="100px" v-if="material" label-align="left">
    <t-tabs size="medium" tabPosition="top" v-model="active">
      <t-tab-panel label="外观" value="basic">
        <div class="p0">
          <t-collapse :default-value="[0]">
            <t-collapse-panel header="样式">
              <t-form-item label="连线类型" name="lineName">
                <t-select v-model="material.lineName" @change="changeValue('lineName')">
                  <t-option
                    v-for="item in LINE_NAME"
                    :value="item.value"
                    :label="item.label"
                    :key="item.key"
                  />
                </t-select>
              </t-form-item>
              <t-form-item label="宽度" name="lineWidth">
                <t-input-number
                  :min="1"
                  v-model="material.lineWidth"
                  @change="changeValue('lineWidth')"
                />
              </t-form-item>
              <t-form-item label="颜色" name="color">
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
            </t-collapse-panel>
          </t-collapse>
        </div>
      </t-tab-panel>
      <t-tab-panel label="动效" value="animation">
        <div class="p0">
          <t-collapse :default-value="[0]">
            <t-collapse-panel
              v-for="(animation, index) in material.animations"
              :key="animation.animateId"
            >
              <template #header>
                <t-space align="center" @click.stop="">
                  <t-input v-model="animation.name" class="w-15" borderless></t-input>
                  <t-button
                    variant="text"
                    shape="square"
                    @click.stop="handlePlayAnimation(animation)"
                    v-if="material.currentAnimation != index"
                    ><template #icon><PlayCircleIcon size="18" /></template
                  ></t-button>
                  <t-button variant="text" shape="square" @click.stop="handleStopAnimation" v-else
                    ><template #icon><StopCircleIcon size="18" /></template
                  ></t-button>
                </t-space>
              </template>
              <template #headerRightContent>
                <t-space size="small">
                  <t-popconfirm
                    content="确认删除该动画吗?"
                    placement="left"
                    @confirm="handleDeleteAnimation(animation)"
                  >
                    <t-button variant="text" shape="square">
                      <template #icon><DeleteIcon /></template
                    ></t-button>
                  </t-popconfirm>
                </t-space>
              </template>
              <t-form-item label="动画类型">
                <t-select v-model="animation.lineAnimateType" @change="changeValue('animations')">
                  <t-option
                    v-for="item in LINE_ANIMATE_TYPE"
                    :value="item.value"
                    :label="item.label"
                    :key="item.key"
                  />
                </t-select>
              </t-form-item>
              <t-form-item label="运动速度">
                <t-slider
                  :min="1"
                  :max="10"
                  v-model="animation.animateSpan"
                  @change="changeValue('animations')"
                />
              </t-form-item>
              <t-form-item label="动画颜色">
                <t-color-picker
                  v-model="animation.animateColor"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('animations')"
                />
              </t-form-item>
              <t-form-item label="发光效果">
                <t-switch v-model="animation.animateShadow" @change="changeValue('animations')">
                </t-switch>
              </t-form-item>
              <t-form-item label="发光颜色" v-if="animation.animateShadow">
                <t-color-picker
                  v-model="animation.animateShadowColor"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('animations')"
                />
              </t-form-item>
              <t-form-item
                label="圆点大小"
                v-if="animation.lineAnimateType == LINE_ANIMATE_TYPE_ENUM.DOT"
              >
                <t-input-number
                  v-model="animation.animateDotSize"
                  @change="changeValue('animations')"
                ></t-input-number>
              </t-form-item>
              <t-form-item label="轨迹宽度">
                <t-input-number
                  v-model="animation.animateLineWidth"
                  @change="changeValue('animations')"
                ></t-input-number>
              </t-form-item>
              <t-form-item label="反向流动">
                <t-switch
                  v-model="animation.animateReverse"
                  @change="changeValue('animations')"
                ></t-switch>
              </t-form-item>
              <t-form-item label="播放次数">
                <t-input-number
                  v-model="animation.animateCycle"
                  @change="changeValue('animations')"
                ></t-input-number>
              </t-form-item>
              <t-form-item label="自动播放">
                <t-switch
                  v-model="animation.autoPlay"
                  @change="(value) => handleChangeAutoPlay(value, animation)"
                ></t-switch>
              </t-form-item>
            </t-collapse-panel>
          </t-collapse>
        </div>
        <div class="p0">
          <div class="animation-btn">
            <t-button block @click="handleAddAnimation">添加动画</t-button>
          </div>
        </div>
      </t-tab-panel>
      <t-tab-panel label="事件" value="event"> <div class="p0"></div> </t-tab-panel>
      <t-tab-panel label="数据" value="data"> <div class="p0"></div> </t-tab-panel>
      <t-tab-panel label="结构" value="structure"> <div class="p0"></div> </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import { DeleteIcon, PlayCircleIcon, StopCircleIcon } from 'tdesign-icons-vue-next';
import { s8, deepClone } from '@meta2d/core';
import { LINE_ANIMATE_TYPE, LINE_ANIMATE_TYPE_ENUM, LINE_NAME } from '@/common/configure-common';
import { useSelection } from '@/hooks/useSelection';
import { handleTree } from '@/util';
const meta2d = inject('meta2d');
const { selections } = useSelection();
// 选中的图形
const material = ref(null);
// 结构
const structures = ref([]);

// 更新结构
watchEffect(() => {
  structures.value = handleTree(deepClone(meta2d.value.store.data.pens));
});
// 更新图形
watchEffect(() => {
  material.value = selections.pen;
});

// 当前打开面板
const active = ref('basic');

// 更新属性
const changeValue = (prop) => {
  const v = { id: material.value.id };
  v[prop] = material.value[prop];
  meta2d.value.setValue(v, { render: true, history: true });
};

// 添加动效
const handleAddAnimation = () => {
  const animations = material.value.animations || [];
  material.value.animations = [
    ...animations,
    {
      animateId: s8(),
      name: '动画' + (animations.length + 1),
      lineAnimateType: LINE_ANIMATE_TYPE_ENUM.NORMAL
    }
  ];
  changeValue('animations');
};

// 删除动效
const handleDeleteAnimation = (animation) => {
  const animations = material.value.animations || [];
  material.value.animations = animations.filter((item) => item.animateId !== animation.animateId);
  changeValue('animations');
  handleStopAnimation();
};

// 如果是自动播放，则将其他动效设置为非自动播放
const handleChangeAutoPlay = (autoPlay, animation) => {
  if (autoPlay) {
    const animations = material.value.animations || [];
    animations
      .filter((item) => item.animateId != animation.animateId)
      .map((item) => (item.autoPlay = false));
  }
  changeValue('animations');
};

// 播放动画
const handlePlayAnimation = (animation) => {
  meta2d.value.startAnimate(material.value.id, animation.name);
};

// 停止动画
const handleStopAnimation = () => {
  meta2d.value.stopAnimate(material.value.id);
};
</script>

<style scoped>
.animation-btn {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
</style>
