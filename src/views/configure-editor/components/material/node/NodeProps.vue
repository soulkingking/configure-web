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
                v-if="material.children && material.children.length > 0"
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
      <t-tab-panel label="动效" value="animation"> <div class="p0"></div> </t-tab-panel>
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
                          :options="animations"
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
                          :options="animations"
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
                          :options="animations"
                        ></t-auto-complete>
                      </t-form-item>
                    </template>
                    <!--  -->
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
  </t-form>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import { AddIcon, ArrowRightIcon, DeleteIcon, CloseIcon } from 'tdesign-icons-vue-next';
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
const animations = ref([]);
// 图片
const images = ref([]);

// 更新结构
watchEffect(() => {
  structures.value = handleTree(deepClone(meta2d.value.store.data.pens));
});
// 更新图形
watchEffect(() => {
  material.value = selections.pen;
  if (!material.value.verticalProgress) {
    material.value.verticalProgress = false;
  }
  if (selections.pen.name == 'image') {
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
    animations.value = deepClone(node.animations || []).map((item) => ({
      ...item,
      text: item.name
    }));
    console.log(animations.value);
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
</style>
