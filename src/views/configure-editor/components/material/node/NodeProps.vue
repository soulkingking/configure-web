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
                </t-row>
              </t-form-item>
              <t-form-item label-width="0">
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
            <t-collapse-panel header="图片" v-if="material.name == 'image'">
              <t-form-item label-width="0">
                <t-upload
                  theme="image"
                  v-bind="uploadConfig"
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
      <t-tab-panel label="数据" value="data">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
        <div class="p0">
          <div class="animation-btn">
            <t-button block @click="handleAddData">添加数据</t-button>
          </div>
        </div>
      </t-tab-panel>
      <t-tab-panel label="状态" value="event">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar"></div>
      </t-tab-panel>
      <t-tab-panel label="交互" value="structure">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar">
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
                        :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
                      >
                      </t-tree-select>
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
                          :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
                          clearable
                          @change="handleActionValueChange"
                        >
                        </t-tree-select>
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
                          :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
                          clearable
                          @change="handleActionValueChange"
                        >
                        </t-tree-select>
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
                          :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
                          clearable
                          @change="handleActionValueChange"
                        >
                        </t-tree-select>
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
                          :keys="{ label: 'name', value: 'id', children: 'childrenPens' }"
                          clearable
                          @change="handleActionValueChange"
                        >
                        </t-tree-select>
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
    <!-- 帧动画配置 -->
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
        <t-form :model="animationSelected" label-width="80px" label-align="left">
          <t-collapse :default-value="[0]">
            <t-collapse-panel
              :header="'帧' + (index + 1)"
              v-for="(frame, index) in animationSelected.frames"
              :key="index"
            >
              <template #headerRightContent>
                <t-space size="small">
                  <t-tooltip content="添加帧">
                    <t-button variant="text" shape="square" @click.stop="handleAddFrame(frame)">
                      <template #icon><FolderAddIcon /></template
                    ></t-button>
                  </t-tooltip>
                  <t-dropdown
                    :options="frameAttributes"
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
              <template v-for="(value, key) in frame" :key="key">
                <t-form-item label="时长" v-if="key === 'duration'">
                  <t-input-number
                    v-model="frame.duration"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    min="0"
                    class="w-40"
                  >
                    <template #suffix><span>ms</span></template>
                  </t-input-number>
                </t-form-item>
                <t-form-item label="显示" v-if="key === 'visible'">
                  <div class="w-40">
                    <t-switch v-model="frame.visible" @change="changeAnimationValue"> </t-switch>
                  </div>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'visible')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="缩放" v-if="key === 'scale'">
                  <t-input-number
                    v-model="frame.scale"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    min="0"
                    class="w-40"
                  >
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'scale')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="线宽度" v-if="key === 'lineWidth'">
                  <t-input-number
                    v-model="frame.lineWidth"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    min="0"
                    class="w-40"
                  >
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'lineWidth')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="前景颜色" v-if="key === 'color'">
                  <t-color-picker
                    v-model="frame.color"
                    :show-primary-color-preview="false"
                    :input-props="{ autoWidth: false }"
                    class="w-40"
                    :enableAlpha="true"
                    :colorModes="['monochrome']"
                    format="RGBA"
                    @change="changeAnimationValue"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'color')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="背景颜色" v-if="key === 'background'">
                  <t-color-picker
                    v-model="frame.background"
                    :show-primary-color-preview="false"
                    :input-props="{ autoWidth: false }"
                    class="w-40"
                    :enableAlpha="true"
                    :colorModes="['monochrome']"
                    format="RGBA"
                    @change="changeAnimationValue"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'background')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="旋转" v-if="key === 'rotate'">
                  <t-input-number
                    v-model="frame.rotate"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    class="w-40"
                    min="-360"
                    max="360"
                  >
                    <template #suffix><span>°</span></template>
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'rotate')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="x位移" v-if="key === 'x'">
                  <t-input-number
                    v-model="frame.x"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    class="w-40"
                  >
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'x')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="y位移" v-if="key === 'y'">
                  <t-input-number
                    v-model="frame.y"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    class="w-40"
                  >
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'y')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="水平翻转" v-if="key === 'flipX'">
                  <div class="w-40">
                    <t-switch v-model="frame.flipX" @change="changeAnimationValue"> </t-switch>
                  </div>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'flipX')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="垂直翻转" v-if="key === 'flipY'">
                  <div class="w-40">
                    <t-switch v-model="frame.flipY" @change="changeAnimationValue"> </t-switch>
                  </div>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'flipY')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="进度" v-if="key === 'progress'">
                  <t-slider
                    v-model="frame.progress"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    class="w-40"
                    @change="changeAnimationValue"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'progress')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>

                <t-form-item label="透明度" v-if="key === 'globalAlpha'">
                  <t-slider
                    v-model="frame.globalAlpha"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    class="w-40"
                    @change="changeAnimationValue"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'globalAlpha')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>

                <t-form-item label="文字" v-if="key === 'text'">
                  <t-input v-model="frame.text" @change="changeAnimationValue" class="w-40">
                  </t-input>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'text')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="文字大小" v-if="key === 'fontSize'">
                  <t-input-number
                    v-model="frame.fontSize"
                    @change="changeAnimationValue"
                    align="left"
                    theme="normal"
                    min="0"
                    class="w-40"
                  >
                    <template #suffix><span>px</span></template>
                  </t-input-number>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'fontSize')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="阴影" v-if="key === 'shadow'">
                  <div class="w-40">
                    <t-switch v-model="frame.shadow" @change="changeAnimationValue"></t-switch>
                  </div>
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'shadow')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="阴影颜色" v-if="key === 'shadowColor'">
                  <t-color-picker
                    v-model="frame.shadowColor"
                    :show-primary-color-preview="false"
                    :input-props="{ autoWidth: false }"
                    class="w-40"
                    :enableAlpha="true"
                    :colorModes="['monochrome']"
                    format="RGBA"
                    @change="changeAnimationValue"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'shadowColor')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="阴影X偏移" v-if="key === 'shadowOffsetX'">
                  <t-input-number
                    v-model="frame.shadowOffsetX"
                    @change="changeAnimationValue"
                    theme="normal"
                    class="w-40"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'shadowOffsetX')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="阴影Y偏移" v-if="key === 'shadowOffsetY'">
                  <t-input-number
                    v-model="frame.shadowOffsetY"
                    @change="changeAnimationValue"
                    theme="normal"
                    class="w-40"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'shadowOffsetY')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
                <t-form-item label="阴影模糊" v-if="key === 'shadowBlur'">
                  <t-input-number
                    v-model="frame.shadowBlur"
                    @change="changeAnimationValue"
                    theme="normal"
                    class="w-40"
                  />
                  <template #statusIcon
                    ><t-button
                      variant="text"
                      shape="square"
                      @click.stop="handleDeleteFrameAttribute(frame, 'shadowBlur')"
                    >
                      <template #icon><CloseIcon /></template></t-button
                  ></template>
                </t-form-item>
              </template>
            </t-collapse-panel>
          </t-collapse>
        </t-form>
      </div>
    </t-drawer>
  </t-form>
</template>

<script setup lang="jsx">
import { ref, inject, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  AddIcon,
  ArrowRightIcon,
  DeleteIcon,
  CloseIcon,
  PlayCircleIcon,
  StopCircleIcon,
  EditIcon,
  FileAddIcon,
  Animation1Icon,
  FolderAddIcon,
  RotateIcon,
  Fullscreen1Icon,
  IconFont
} from 'tdesign-icons-vue-next';
import { s8, deepClone } from '@meta2d/core';
import {
  EVENT_NAME,
  LOGICAL_RELATIONSHIP,
  COMPARISON,
  ATTRIBUTE,
  FRAME_ATTRIBUTE,
  EVENT_ACTION,
  TARGET_TYPE,
  VALUE_TYPE,
  CONDITION_TYPE,
  DASH_TYPE,
  ALGIN_TYPE,
  LOGICAL_RELATIONSHIP_ENUM,
  VALUE_TYPE_ENUM,
  EVENT_ACTION_ENUM,
  COMPARISON_ENUM,
  CONDITION_TYPE_ENUM,
  TARGET_TYPE_ENUM,
  DASH_TYPE_ENUM
} from '@/common/configure-common';
import { useSelection } from '@/hooks/useSelection';
import { PI_META_2D, PI_STRUCTURES } from '@/common/index';
import API from '@/api/API';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
const meta2d = inject(PI_META_2D);
const structures = inject(PI_STRUCTURES);
const userStore = useUserStore();
const { token } = storeToRefs(userStore);
const { selections } = useSelection();
// 选中的图形
const material = ref(null);
// 位置数据
const rect = ref();
// 结构
// const structures = ref([]);
// 动画
const animationsSelected = ref([]);
// 帧动画编辑界面
const animationVisible = ref(false);
// 帧动画
const animationSelected = ref(null);
// 图片
const images = ref([]);

// 上传配置
const uploadConfig = computed(() => {
  return {
    action: API.uploadFile,
    headers: { Authorization: token.value },
    max: 1
  };
});

// 帧属性
const frameAttributes = computed(() => {
  return FRAME_ATTRIBUTE.map((item) => ({ ...item, prefixIcon: () => <Animation1Icon /> }));
});

// 是否拥有属性
const hasAttribute = (attribute = {}, key) => {
  return key in attribute;
};

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
  if (!material.value.verticalProgress) {
    material.value.verticalProgress = false;
  }
  if (material.value.name == 'image') {
    images.value = [{ url: material.value.image }];
  } else {
    images.value = [];
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

// 默认激活
const active = ref('basic');

// 大屏对齐
const alignNodesV = (item) => {
  meta2d.value.alignNodesV(item.value, meta2d.value.store.active);
};

// 更新属性
const changeValue = (prop) => {
  const v = { id: material.value.id };
  v[prop] = material.value[prop];
  meta2d.value.setValue(v, { render: true });
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
  if (context && context.node.data) {
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
        { duration: 300, visible: true, frameId: s8() },
        { duration: 300, visible: false, frameId: s8() }
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

// 添加帧动画
const handleAddFrame = () => {
  const frames = animationSelected.value.frames || [];
  animationSelected.value.frames = [...frames, { duration: 300, frameId: s8() }];
  changeAnimationValue();
};

// 删除帧动画
const handleDeleteFrame = (frame) => {
  const frames = animationSelected.value.frames || [];
  animationSelected.value.frames = frames.filter((item) => item.frameId !== frame.frameId);
  changeAnimationValue();
};

// 添加帧属性
const handleAddFrameAttribute = (frame, item) => {
  if (!hasAttribute(frame, item.value)) {
    frame[item.value] = item.defaultValue ? item.defaultValue : undefined;
  }
};

// 删除属性;
const handleDeleteFrameAttribute = (frame, key) => {
  delete frame[key];
};

// 添加数据;
const handleAddData = () => {};
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
