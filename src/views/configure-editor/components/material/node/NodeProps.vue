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
            <t-collapse-panel header="基础信息">
              <t-form-item label="组件名称" name="name">
                <t-input v-model="material.name" @change="changeValue('name')" />
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="图片" v-if="material.name == 'image'">
              <t-form-item label-width="0">
                <t-upload
                  theme="image"
                  accept="image/*"
                  v-model="images"
                  class="w-full"
                  :requestMethod="uploadImage"
                  :show-image-file-name="false"
                  @success="handleUploadSuccess"
                >
                  <!-- <template #fileListDisplay="{ files }">
                    <t-image v-for="(file, index) in files" :key="index" :src="file.url"></t-image>
                  </template> -->
                </t-upload>
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="样式">
              <t-form-item label="线宽度" name="lineWidth">
                <t-input-number
                  v-model="material.lineWidth"
                  :min="0"
                  @change="changeValue('lineWidth')"
                />
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
              <t-form-item label="圆角" name="borderRadius">
                <t-input-number
                  :min="0"
                  v-model="material.borderRadius"
                  @change="changeValue('borderRadius')"
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
              <t-form-item
                label="状态"
                name="showChild"
                v-if="
                  material.children &&
                  material.children.length > 0 &&
                  material.showChild != undefined
                "
              >
                <t-select v-model="material.showChild" @change="changeValue('showChild')">
                  <t-option
                    v-for="(item, index) in material.children"
                    :value="index"
                    :label="'状态' + (index + 1)"
                    :key="item"
                  />
                </t-select>
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="文本">
              <t-form-item label="文本内容">
                <t-input v-model="material.text" @change="changeValue('text')" />
              </t-form-item>
              <t-form-item label="字体大小">
                <t-input-number
                  :min="0"
                  v-model="material.fontSize"
                  @change="changeValue('fontSize')"
                />
              </t-form-item>
              <t-form-item label="字体颜色">
                <t-color-picker
                  v-model="material.textColor"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('textColor')"
                />
              </t-form-item>
            </t-collapse-panel>
            <t-collapse-panel header="进度">
              <t-form-item label="进度值">
                <t-slider
                  v-model="material.progress"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  @change="changeValue('progress')"
                />
              </t-form-item>
              <t-form-item label="进度颜色">
                <t-color-picker
                  v-model="material.progressColor"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeValue('progressColor')"
                />
              </t-form-item>
              <t-form-item label="进度方向">
                <t-radio-group
                  v-model="material.verticalProgress"
                  @change="changeValue('verticalProgress')"
                  variant="primary-filled"
                >
                  <t-radio-button :value="false">水平</t-radio-button>
                  <t-radio-button :value="true">垂直</t-radio-button>
                </t-radio-group>
              </t-form-item>
              <t-form-item label="进度反向">
                <t-switch
                  v-model="material.reverseProgress"
                  @change="changeValue('reverseProgress')"
                >
                </t-switch>
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
                  <t-button
                    variant="text"
                    shape="square"
                    @click.stop="handleEditAnimation(animation)"
                  >
                    <template #icon><EditIcon /></template
                  ></t-button>
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
              <!-- <t-form-item label="动画类型">
                <t-select v-model="animation.lineAnimateType" @change="changeValue('animations')">
                  <t-option
                    v-for="item in LINE_ANIMATE_TYPE"
                    :value="item.value"
                    :label="item.label"
                    :key="item.key"
                  />
                </t-select>
              </t-form-item> -->
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
      <t-tab-panel label="数据" value="data"> <div class="p0"></div> </t-tab-panel>
      <t-tab-panel label="状态" value="event"> <div class="p0"></div> </t-tab-panel>
      <t-tab-panel label="交互" value="structure">
        <div class="p0 max-h-4xl overflow-auto">
          <!-- 事件列表 -->
          <t-collapse :default-value="[0]" v-if="material.events">
            <t-collapse-panel
              :header="event.label"
              v-for="event in material.events"
              :key="event.eventId"
            >
              <template #headerRightContent>
                <t-space size="small">
                  <t-popconfirm
                    content="确认删除该交互事件吗?"
                    placement="left"
                    @confirm="handleDeleteEvent(event)"
                  >
                    <t-button variant="text" shape="square">
                      <template #icon><DeleteIcon /></template
                    ></t-button>
                  </t-popconfirm>
                </t-space>
              </template>
              <t-space direction="vertical">
                <!-- 条件列表 -->
                <template v-if="event.conditions && event.conditions.length > 0">
                  <t-form-item label="触发条件">
                    <t-radio-group v-model="event.conditionType">
                      <t-radio
                        :label="item.label"
                        :value="item.value"
                        :key="item.key"
                        v-for="item in LOGICAL_RELATIONSHIP"
                      ></t-radio>
                    </t-radio-group>
                  </t-form-item>
                  <template
                    v-for="(condition, index) in event.conditions"
                    :key="condition.conditionId"
                  >
                    <div class="flex flex-justify-between mb2">
                      <t-space :size="4" align="center">
                        <ArrowRightIcon />
                        <span>条件{{ index + 1 }}</span></t-space
                      >
                      <t-popconfirm
                        content="确认删除该条件吗?"
                        placement="left"
                        @confirm="handleDeleteCondition(event, condition)"
                      >
                        <t-button variant="text" shape="square">
                          <template #icon><CloseIcon /></template>
                        </t-button>
                      </t-popconfirm>
                    </div>
                    <t-form-item label="条件类型">
                      <t-radio-group v-model="condition.type">
                        <t-radio
                          :value="item.value"
                          :label="item.label"
                          :key="item.key"
                          v-for="item in CONDITION_TYPE"
                        ></t-radio>
                      </t-radio-group>
                    </t-form-item>
                    <t-form-item label="属性名">
                      <t-auto-complete
                        v-model="condition.key"
                        :options="ATTRIBUTE"
                        clearable
                      ></t-auto-complete>
                    </t-form-item>
                    <t-form-item label="运算关系">
                      <t-select v-model="condition.operator">
                        <t-option
                          :label="item.value"
                          :value="item.value"
                          :key="item.key"
                          v-for="item in COMPARISON"
                        />
                      </t-select>
                    </t-form-item>
                    <t-form-item label="运算对象">
                      <t-select v-model="condition.valueType">
                        <t-option
                          :label="item.label"
                          :value="item.value"
                          :key="item.key"
                          v-for="item in VALUE_TYPE"
                        ></t-option>
                      </t-select>
                    </t-form-item>
                    <t-form-item
                      label="对象"
                      v-if="condition.valueType && condition.valueType === VALUE_TYPE_ENUM.PROP"
                    >
                      <t-tree-select
                        :data="structures"
                        v-model="condition.target"
                        :keys="{ label: 'name', value: 'id', children: 'children' }"
                      ></t-tree-select>
                    </t-form-item>
                    <t-form-item label="值">
                      <t-auto-complete
                        v-model="condition.value"
                        :options="ATTRIBUTE"
                        clearable
                        v-if="condition.valueType && condition.valueType === VALUE_TYPE_ENUM.PROP"
                      ></t-auto-complete>
                      <t-input v-model="condition.value" v-else clearable></t-input>
                    </t-form-item>
                  </template>
                </template>

                <t-button variant="text" theme="primary" @click="handleAddCondition(event)"
                  ><template #icon><AddIcon /></template>添加触发条件</t-button
                >
                <!-- 动作列表 -->
                <template v-if="event.actions && event.actions.length > 0">
                  <template v-for="(action, index) in event.actions" :key="action.actionId">
                    <div class="flex flex-justify-between mb2">
                      <t-space :size="4" align="center">
                        <ArrowRightIcon />
                        <span>动作{{ index + 1 }}</span>
                      </t-space>
                      <t-popconfirm
                        content="确认删除该动作吗?"
                        placement="left"
                        @confirm="handleDeleteAction(event, action)"
                      >
                        <t-button variant="text" shape="round" size="small">
                          <template #icon><CloseIcon /></template>
                        </t-button>
                      </t-popconfirm>
                    </div>
                    <t-form-item label="动作类型">
                      <t-select v-model="action.action">
                        <t-option
                          :label="item.label"
                          :value="item.value"
                          :key="item.key"
                          v-for="item in EVENT_ACTION"
                        />
                      </t-select>
                    </t-form-item>
                    <!-- 动作配置 -->
                    <!-- 播放动画 -->
                    <template v-if="action.action === EVENT_ACTION_ENUM.START_ANIMATE">
                      <t-form-item label="对象类型">
                        <t-radio-group v-model="action.targetType">
                          <t-radio
                            :value="item.value"
                            :label="item.label"
                            :key="item.key"
                            v-for="item in TARGET_TYPE"
                          ></t-radio>
                        </t-radio-group>
                      </t-form-item>
                      <t-form-item label="播放对象">
                        <t-tree-select
                          :data="structures"
                          v-model="action.value"
                          :keys="{ label: 'name', value: 'id', children: 'children' }"
                          clearable
                          @change="handleActionValueChange"
                        ></t-tree-select>
                      </t-form-item>
                      <t-form-item label="动画名称">
                        <t-auto-complete
                          v-model="action.params"
                          clearable
                          :options="animationsSelected"
                        ></t-auto-complete>
                      </t-form-item>
                    </template>
                    <!-- 停止动画 -->
                    <template v-if="action.action === EVENT_ACTION_ENUM.STOP_ANIMATE">
                      <t-form-item label="对象类型">
                        <t-radio-group v-model="action.targetType">
                          <t-radio
                            :value="item.value"
                            :label="item.label"
                            :key="item.key"
                            v-for="item in TARGET_TYPE"
                          ></t-radio>
                        </t-radio-group>
                      </t-form-item>
                      <t-form-item label="播放对象">
                        <t-tree-select
                          :data="structures"
                          v-model="action.value"
                          :keys="{ label: 'name', value: 'id', children: 'children' }"
                          clearable
                          @change="handleActionValueChange"
                        ></t-tree-select>
                      </t-form-item>
                      <t-form-item label="动画名称">
                        <t-auto-complete
                          v-model="action.params"
                          clearable
                          :options="animationsSelected"
                        ></t-auto-complete>
                      </t-form-item>
                    </template>
                    <!-- 暂停动画 -->
                    <template v-if="action.action === EVENT_ACTION_ENUM.PAUSE_ANIMATE">
                      <t-form-item label="对象类型">
                        <t-radio-group v-model="action.targetType">
                          <t-radio
                            :value="item.value"
                            :label="item.label"
                            :key="item.key"
                            v-for="item in TARGET_TYPE"
                          ></t-radio>
                        </t-radio-group>
                      </t-form-item>
                      <t-form-item label="播放对象">
                        <t-tree-select
                          :data="structures"
                          v-model="action.value"
                          :keys="{ label: 'name', value: 'id', children: 'children' }"
                          clearable
                          @change="handleActionValueChange"
                        ></t-tree-select>
                      </t-form-item>
                      <t-form-item label="动画名称">
                        <t-auto-complete
                          v-model="action.params"
                          clearable
                          :options="animationsSelected"
                        ></t-auto-complete>
                      </t-form-item>
                    </template>
                    <!-- 设置属性 -->
                    <template v-if="action.action === EVENT_ACTION_ENUM.SET_PROPS">
                      <t-form-item label="对象类型">
                        <t-radio-group v-model="action.targetType">
                          <t-radio
                            :value="item.value"
                            :label="item.label"
                            :key="item.key"
                            v-for="item in TARGET_TYPE"
                          ></t-radio>
                        </t-radio-group>
                      </t-form-item>
                      <t-form-item label="更改对象">
                        <t-tree-select
                          :data="structures"
                          v-model="action.params"
                          :keys="{ label: 'name', value: 'id', children: 'children' }"
                          clearable
                          @change="handleActionValueChange"
                        ></t-tree-select>
                      </t-form-item>
                      <t-form-item label="属性数据">
                        <div class="w-full">
                          <t-row align="center">
                            <t-col :span="5">属性名</t-col>
                            <t-col :span="5">属性值</t-col>
                            <t-col :span="2">
                              <t-dropdown
                                trigger="hover"
                                :options="ATTRIBUTE"
                                @click="({ value }) => handleAddAttribute(action, value)"
                              >
                                <t-button variant="text" shape="square"
                                  ><template #icon><AddIcon></AddIcon></template
                                ></t-button>
                              </t-dropdown>
                            </t-col>
                          </t-row>
                          <t-row v-for="(value, key) in action.value" :key="key" align="center">
                            <t-col :span="5">{{ key }}</t-col>
                            <t-col :span="5"><t-input v-model="action.value[key]"></t-input></t-col>
                            <t-col :span="2"
                              ><t-button
                                variant="text"
                                shape="square"
                                @click="handleDeleteAttribute(action, key)"
                                ><template #icon><DeleteIcon></DeleteIcon></template></t-button
                            ></t-col>
                          </t-row>
                        </div>
                      </t-form-item>
                    </template>
                    <!-- 发送事件 -->
                    <template v-if="action.action === EVENT_ACTION_ENUM.EMIT">
                      <t-form-item label="事件名称">
                        <t-input v-model="action.value"></t-input>
                      </t-form-item>
                      <t-form-item label="事件参数">
                        <t-input v-model="action.params"></t-input>
                      </t-form-item>
                    </template>
                  </template>
                </template>
                <t-button variant="text" theme="primary" @click="handleAddAction(event)"
                  ><template #icon><AddIcon /></template>添加动作</t-button
                >
              </t-space>
            </t-collapse-panel>
          </t-collapse>
        </div>
        <div class="p0">
          <div class="event-btn">
            <t-dropdown
              :options="eventOptions"
              trigger="click"
              :minColumnWidth="250"
              @click="handleAddEvent"
            >
              <t-button block>添加交互事件</t-button>
            </t-dropdown>
          </div>
        </div>
      </t-tab-panel>
    </t-tabs>
    <t-drawer
      v-model:visible="animationVisible"
      v-if="animationSelected"
      :header="animationSelected.name"
      size="320px"
      attach=".configure-editor-body"
      showInAttachedElement
      destroy-on-close
      class="frames-drawer"
      :footer="null"
    >
      <div v-if="animationSelected">
        <t-form :model="animationSelected" label-width="100px" label-align="left">
          <t-collapse :default-value="[0]">
            <t-collapse-panel
              :header="'帧' + (index + 1)"
              v-for="(frame, index) in animationSelected.frames"
              :key="index"
            >
              <template #headerRightContent>
                <t-space size="small">
                  <t-dropdown
                    :options="attributes"
                    @click="(item) => handleAddFrameAttribute(frame, item)"
                  >
                    <t-button variant="text" shape="square">
                      <template #icon><FileAddIcon /></template
                    ></t-button>
                  </t-dropdown>

                  <t-popconfirm
                    content="确认删除该帧吗?"
                    placement="left"
                    @confirm="handleDeleteFrame(frame)"
                  >
                    <t-button variant="text" shape="square">
                      <template #icon><DeleteIcon /></template
                    ></t-button>
                  </t-popconfirm>
                </t-space>
              </template>
              <t-form-item label="时长">
                <t-input-number
                  v-model="frame.duration"
                  @change="changeAnimationValue"
                  align="left"
                  theme="normal"
                  min="0"
                >
                  <template #suffix><span>ms</span></template>
                </t-input-number>
              </t-form-item>
              <t-form-item label="显示" v-if="hasAttribute(frame, 'visible')">
                <t-switch v-model="frame.visible" @change="changeAnimationValue"> </t-switch>
              </t-form-item>
              <t-form-item label="缩放" v-if="hasAttribute(frame, 'scale')">
                <t-input-number
                  v-model="frame.scale"
                  @change="changeAnimationValue"
                  align="left"
                  theme="normal"
                  min="0"
                >
                </t-input-number>
              </t-form-item>
              <t-form-item label="线宽度" v-if="hasAttribute(frame, 'lineWidth')">
                <t-input-number
                  v-model="frame.lineWidth"
                  @change="changeAnimationValue"
                  align="left"
                  theme="normal"
                  min="0"
                >
                </t-input-number>
              </t-form-item>
              <t-form-item label="线颜色" v-if="hasAttribute(frame, 'color')">
                <t-color-picker
                  v-model="frame.color"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeAnimationValue"
                />
              </t-form-item>
              <t-form-item label="背景颜色" v-if="hasAttribute(frame, 'background')">
                <t-color-picker
                  v-model="frame.background"
                  :show-primary-color-preview="false"
                  :input-props="{ autoWidth: false }"
                  class="w-full"
                  :enableAlpha="true"
                  :colorModes="['monochrome']"
                  format="RGBA"
                  @change="changeAnimationValue"
                />
              </t-form-item>
              <t-form-item label="旋转" v-if="hasAttribute(frame, 'rotate')">
                <t-input-number
                  v-model="frame.rotate"
                  @change="changeAnimationValue"
                  align="left"
                  theme="normal"
                  min="-360"
                  max="360"
                >
                  <template #suffix><span>°</span></template>
                </t-input-number>
              </t-form-item>
            </t-collapse-panel>
          </t-collapse>
        </t-form>
      </div>
    </t-drawer>
  </t-form>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import {
  AddIcon,
  ArrowRightIcon,
  DeleteIcon,
  CloseIcon,
  PlayCircleIcon,
  StopCircleIcon,
  EditIcon,
  FileAddIcon
} from 'tdesign-icons-vue-next';
import { s8, deepClone } from '@meta2d/core';
import {
  EVENT_NAME,
  LOGICAL_RELATIONSHIP,
  COMPARISON,
  ATTRIBUTE,
  EVENT_ACTION,
  TARGET_TYPE,
  VALUE_TYPE,
  CONDITION_TYPE,
  LOGICAL_RELATIONSHIP_ENUM,
  VALUE_TYPE_ENUM,
  EVENT_ACTION_ENUM,
  COMPARISON_ENUM,
  CONDITION_TYPE_ENUM,
  TARGET_TYPE_ENUM
} from '@/common/configure-common';
import { handleTree } from '@/util';
import { useSelection } from '@/hooks/useSelection';
const meta2d = inject('meta2d');
const { selections } = useSelection();
// 选中的图形
const material = ref(null);
// 结构
const structures = ref([]);
// 动画
const animationsSelected = ref([]);
// 帧动画编辑界面
const animationVisible = ref(false);
// 帧动画
const animationSelected = ref(null);
// 图片
const images = ref([]);
// 属性
const attributes = ref([
  {
    content: '显示',
    label: '显示',
    value: 'visible',
    text: 'visible',
    key: 'visible',
    defaultValue: true
  },
  { content: '缩放', label: '缩放', value: 'scale', text: 'scale', key: 'scale' },
  { content: '旋转', label: '旋转', value: 'rotate', text: 'rotate', key: 'rotate' },
  { content: 'x位移', label: 'x位移', value: 'x', text: 'x', key: 'x' },
  { content: 'y位移', label: 'y位移', value: 'y', text: 'y', key: 'y' },
  { content: '前景颜色', label: '前景颜色', value: 'color', text: 'color', key: 'color' },
  {
    content: '背景颜色',
    label: '背景颜色',
    value: 'background',
    text: 'background',
    key: 'background'
  },
  {
    content: '文字',
    label: '文字',
    value: 'text',
    text: 'text',
    key: 'text'
  },
  {
    content: '水平翻转',
    label: '水平翻转',
    value: 'flipX',
    text: 'flipX',
    key: 'flipX'
  },
  {
    content: '垂直翻转',
    label: '垂直翻转',
    value: 'flipY',
    text: 'flipY',
    key: 'flipY'
  },
  {
    content: '进度',
    label: '进度',
    value: 'progress',
    text: 'progress',
    key: 'progress'
  },
  {
    content: '透明度',
    label: '透明度',
    value: 'globalAlpha',
    text: 'globalAlpha',
    key: 'globalAlpha'
  },
  {
    content: '字体大小',
    label: '字体大小',
    value: 'fontSize',
    text: 'fontSize',
    key: 'fontSize'
  },
  {
    content: '文字颜色',
    label: '文字颜色',
    value: 'textColor',
    text: 'textColor',
    key: 'textColor'
  },
  {
    content: '文字背景',
    label: '文字背景',
    value: 'textBackground',
    text: 'textBackground',
    key: 'textBackground'
  },
  {
    content: '文字背景',
    label: '文字背景',
    value: 'textBackground',
    text: 'textBackground',
    key: 'textBackground'
  },
  {
    content: '文字倾斜',
    label: '文字倾斜',
    value: 'fontStyle',
    text: 'fontStyle',
    key: 'fontStyle'
  },
  {
    content: '文字加粗',
    label: '文字加粗',
    value: 'fontWeight',
    text: 'fontWeight',
    key: 'fontWeight'
  }
]);

const hasAttribute = (attribute = {}, key) => {
  return key in attribute;
};
// 更新结构
watchEffect(() => {
  structures.value = handleTree(deepClone(meta2d.value.store.data.pens));
});
// 更新图形
watchEffect(() => {
  material.value = selections.pen;
  if (material.value && !material.value.verticalProgress) {
    material.value.verticalProgress = false;
  }
  if (selections.pen && selections.pen.name == 'image') {
    images.value = [{ url: selections.pen.image }];
  } else {
    images.value = [];
  }
});
const active = ref('basic');

// 更新属性
const changeValue = (prop) => {
  const v = { id: material.value.id };
  v[prop] = material.value[prop];
  meta2d.value.setValue(v, { render: true });
};

/** 事件处理 */
// 事件
const eventOptions = ref(EVENT_NAME);

// 添加事件
const handleAddEvent = (item) => {
  const events = material.value.events || [];
  material.value.events = [
    ...events,
    {
      eventId: s8(),
      label: item.content,
      name: item.value,
      conditionType: LOGICAL_RELATIONSHIP_ENUM.AND
    }
  ];
  changeValue('events');
};
// 删除事件
const handleDeleteEvent = (event) => {
  const events = material.value.events || [];
  material.value.events = events.filter((item) => item.eventId !== event.eventId);
  changeValue('events');
};

// 添加条件
const handleAddCondition = (event) => {
  const conditions = event.conditions || [];
  const condition = {
    conditionId: s8(),
    type: CONDITION_TYPE_ENUM.VALUE,
    operator: COMPARISON_ENUM.EQUALS,
    valueType: VALUE_TYPE_ENUM.VALUE
  };
  event.conditions = [...conditions, condition];
};

// 删除条件
const handleDeleteCondition = (event, condition) => {
  const conditions = event.conditions || [];
  event.conditions = conditions.filter((item) => item.conditionId !== condition.conditionId);
};

// 添加动作
const handleAddAction = (event) => {
  const actions = event.actions || [];
  const action = {
    actionId: s8(),
    targetType: TARGET_TYPE_ENUM.ID
  };
  event.actions = [...actions, action];
};
// 删除动作
const handleDeleteAction = (event, action) => {
  const actions = event.actions || [];
  event.actions = actions.filter((item) => item.actionId !== action.actionId);
};

// 动作配置
const handleActionValueChange = (value, context) => {
  if (context) {
    const node = context.node.data;
    animationsSelected.value = deepClone(node.animations || []).map((item) => ({
      ...item,
      text: item.name
    }));
    console.log(animationsSelected.value);
  }
};

// 添加属性
const handleAddAttribute = (action, key) => {
  if (!action.value) {
    action.value = {};
  }
  action.value[key] = '';
};
// 删除属性
const handleDeleteAttribute = (action, key) => {
  delete action.value[key];
};

// 上传图片
const uploadImage = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = function (event) {
      resolve({
        status: 'success',
        response: { url: event.target.result }
      });
    };
  });
};

// 上传成功
const handleUploadSuccess = ({ fileList }) => {
  material.value.image = fileList[0].url;
  changeValue('image');
};

// 添加动效
const handleAddAnimation = () => {
  const animations = material.value.animations || [];
  material.value.animations = [
    ...animations,
    {
      animateId: s8(),
      name: '动画' + (animations.length + 1),
      temType: 'id',
      animate: '闪烁',
      frames: [
        { duration: 300, scale: 0.5, lineWidth: 1, color: 'rgba(7, 141, 92, 1)', frameId: s8() },
        { duration: 300, scale: 1, lineWidth: 20, color: 'rgba(7, 141, 92, 0.3)', frameId: s8() }
      ]
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

// 编辑动画
const handleEditAnimation = (animation) => {
  animationSelected.value = animation;
  animationVisible.value = true;
};

// 更新帧动画
const changeAnimationValue = () => {
  const animation = material.value.animations.find(
    (item) => item.animateId == animationSelected.value.animateId
  );
  animation.frames = animationSelected.value.frames;
  changeValue('animations');
};

// 删除帧动画
const handleDeleteFrame = (frame) => {
  const frames = animationSelected.value.frames || [];
  animationSelected.value.frames = frames.filter((item) => item.frameId !== frame.frameId);
  changeAnimationValue();
};

// 添加帧属性
const handleAddFrameAttribute = (frame, item) => {
  frame[item.value] = item.defaultValue ? item.defaultValue : undefined;
};
</script>
<style scoped>
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
