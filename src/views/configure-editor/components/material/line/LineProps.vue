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
        <div class="p0 node-props-container overflow-auto narrow-scrollbar">
          <t-collapse :default-value="[0]">
            <t-collapse-panel header="基础信息">
              <t-form-item label="ID">
                <t-input v-model="material.id" readonly borderless />
              </t-form-item>
              <t-form-item label="名称">
                <t-input v-model="material.name" readonly borderless />
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="连线类型">
              <t-form-item label="类型" name="lineName">
                <t-select v-model="material.lineName" @change="changeValue('lineName')">
                  <t-option
                    v-for="item in LINE_NAME"
                    :value="item.value"
                    :label="item.label"
                    :key="item.key"
                  />
                </t-select>
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="外观">
              <t-form-item label-width="0">
                <t-row :gutter="8">
                  <t-col :span="4">
                    <t-input-number
                      v-model="rect.x"
                      theme="normal"
                      class="w-22"
                      @change="changeRect('x')"
                      label="X"
                    />
                  </t-col>
                  <t-col :span="4">
                    <t-input-number
                      v-model="rect.y"
                      theme="normal"
                      class="w-22"
                      @change="changeRect('y')"
                      label="Y"
                    />
                  </t-col>
                  <t-col :span="4">
                    <t-input-number
                      v-model="material.rotate"
                      theme="normal"
                      class="w-22"
                      min="0"
                      @change="changeValue('rotate')"
                      label="Y"
                    >
                      <template #label>
                        <RotateIcon></RotateIcon>
                      </template>
                    </t-input-number>
                  </t-col>
                </t-row> </t-form-item
              ><t-form-item label-width="0">
                <t-row :gutter="8">
                  <t-col :span="4">
                    <t-input-number
                      v-model="rect.width"
                      theme="normal"
                      class="w-22"
                      @change="changeRect('width')"
                      label="宽"
                    />
                  </t-col>
                  <t-col :span="4">
                    <t-input-number
                      v-model="rect.height"
                      theme="normal"
                      class="w-22"
                      @change="changeRect('height')"
                      label="高"
                    />
                  </t-col>
                  <t-col :span="4">
                    <t-input-number
                      v-model="material.borderRadius"
                      theme="normal"
                      class="w-22"
                      min="0"
                      @change="changeValue('borderRadius')"
                    >
                      <template #label> <Fullscreen1Icon></Fullscreen1Icon> </template
                    ></t-input-number>
                  </t-col>
                </t-row>
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
              <t-form-item label="宽度" name="lineWidth">
                <t-input-number
                  :min="0"
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
              <t-form-item label="阴影">
                <t-checkbox v-model="material.shadow" @change="changeShadowValue"></t-checkbox>
                <t-color-picker
                  v-if="material.shadow"
                  v-model="material.shadowColor"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-40"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('shadowColor')"
                />
              </t-form-item>
              <t-form-item label-width="0" v-if="material.shadow">
                <t-row :gutter="8">
                  <t-col :span="4"
                    ><t-input-number
                      v-model="material.shadowOffsetX"
                      @change="changeValue('shadowOffsetX')"
                      theme="normal"
                      class="w-22"
                      label="X"
                  /></t-col>
                  <t-col :span="4"
                    ><t-input-number
                      v-model="material.shadowOffsetY"
                      @change="changeValue('shadowOffsetY')"
                      theme="normal"
                      label="Y"
                      class="w-22"
                  /></t-col>
                  <t-col :span="4">
                    <t-input-number
                      v-model="material.shadowBlur"
                      label="模糊"
                      theme="normal"
                      class="w-22"
                      @change="changeValue('shadowBlur')"
                    />
                  </t-col>
                </t-row>
              </t-form-item>
              <t-form-item label="透明度">
                <t-slider
                  v-model="material.globalAlpha"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  @change="changeValue('globalAlpha')"
                />
              </t-form-item>
            </t-collapse-panel>
          </t-collapse>
        </div>
      </t-tab-panel>
      <t-tab-panel label="动效" value="animation">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar">
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
      <t-tab-panel label="事件" value="event">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
      </t-tab-panel>
      <t-tab-panel label="数据" value="data">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
      </t-tab-panel>
      <t-tab-panel label="结构" value="structure">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<script setup>
import { ref, inject, watchEffect, watch, onMounted, onUnmounted } from 'vue';
import {
  DeleteIcon,
  PlayCircleIcon,
  StopCircleIcon,
  Fullscreen1Icon,
  RotateIcon
} from 'tdesign-icons-vue-next';
import { s8, deepClone } from '@meta2d/core';
import {
  LINE_ANIMATE_TYPE,
  LINE_ANIMATE_TYPE_ENUM,
  LINE_NAME,
  DASH_TYPE,
  DASH_TYPE_ENUM
} from '@/common/configure-common';
import { useSelection } from '@/hooks/useSelection';
import { handleTree } from '@/util';
const meta2d = inject('meta2d');
const { selections } = useSelection();
// 选中的图形
const material = ref(null);
// 位置数据
const rect = ref();

// 结构
const structures = ref([]);

// 更新结构
watchEffect(() => {
  structures.value = handleTree(deepClone(meta2d.value.store.data.pens));
});

// 获取图元
const getPen = () => {
  material.value = selections.pen;
  if (!material.value) {
    return;
  }
  rect.value = meta2d.value.getPenRect(material.value);
  if (material.value.globalAlpha == undefined) {
    material.value.globalAlpha = 1;
  }
};

// 更新图形
const watcher = watch(() => selections.pen.id, getPen);

onMounted(() => {
  getPen();
});

onUnmounted(() => {
  watcher();
});

// 当前打开面板
const active = ref('basic');

// 更新属性
const changeValue = (prop) => {
  const v = { id: material.value.id };
  v[prop] = material.value[prop];
  meta2d.value.setValue(v, { render: true, history: true });
};

// 更新坐标
const changeRect = (prop) => {
  const v = { id: material.value.id };
  v[prop] = rect.value[prop];
  meta2d.value.setValue(v, { render: true });
};

// 更新边框属性
const changeDashValue = (value) => {
  const dash = DASH_TYPE.find((item) => item.value === value);
  const v = { id: material.value.id };
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
  meta2d.value.setValue(v, { render: true });
};

// 更新阴影
const changeShadowValue = () => {
  const v = { id: material.value.id };
  v.shadow = material.value.shadow;
  if (!material.value.shadow) {
    v.shadowColor = undefined;
    v.shadowOffsetX = 0;
    v.shadowOffsetY = 0;
    v.shadowBlur = 0;
  }
  meta2d.value.setValue(v, { render: true });
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
.node-props-container {
  max-height: calc(100vh - 170px);
}
.animation-btn {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
</style>
