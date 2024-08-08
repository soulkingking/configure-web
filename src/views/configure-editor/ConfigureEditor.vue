<!--
 * @Author: .Soul
 * @Date: 2024-07-03 15:11:15
 * @LastEditors: .Soul
 * @LastEditTime: 2024-07-03 16:00:01
 * @Description: file content
 * @FilePath: /configure-web/src/views/configure-editor/ConfigureEditor.vue
-->
<template>
  <t-layout class="h-screen">
    <t-header>
      <t-head-menu expand-type="popup" class="shadow z-3">
        <template #logo>
          <img
            height="28"
            :src="
              isDark
                ? 'https://tdesign.gtimg.com/site/baseLogo-dark.png'
                : 'https://tdesign.gtimg.com/site/baseLogo-light.png'
            "
            alt="logo"
          />
        </template>
        <t-space>
          <t-dropdown trigger="click" :minColumnWidth="150">
            <t-button variant="text"
              ><template #icon><ViewListIcon /></template>文件<template #suffix>
                <ChevronDownIcon></ChevronDownIcon></template
            ></t-button>
            <t-dropdown-menu>
              <t-dropdown-item @click="handleAdd" divider>
                <template #prefixIcon><FileAddIcon></FileAddIcon></template>新建
              </t-dropdown-item>
              <t-dropdown-item @click="handleSave">
                <template #prefixIcon><SaveIcon></SaveIcon></template>保存
              </t-dropdown-item>
              <t-dropdown-item @click="handleDownloadJson">
                <template #prefixIcon><FileDownloadIcon /></template>下载JSON文件
              </t-dropdown-item>
              <!-- <t-dropdown-item @click="handleDownloadPng">
                <template #prefixIcon><FileDownloadIcon /></template>下载为PNG
              </t-dropdown-item> -->
            </t-dropdown-menu>
          </t-dropdown>
        </t-space>
        <t-space v-if="meta2d">
          <t-tooltip content="连线">
            <t-button
              variant="text"
              :theme="meta2d.canvas.drawingLineName ? 'primary' : 'default'"
              shape="square"
              @click.stop="handleDrawLine"
            >
              <template #icon> <PenIcon size="18" /></template>
            </t-button>
          </t-tooltip>
          <t-select v-model="lineName" @change="changeLineName" auto-width borderless>
            <t-option
              v-for="item in LINE_NAME"
              :value="item.value"
              :label="item.label"
              :key="item.key"
            />
          </t-select>
        </t-space>

        <!-- <t-submenu value="file" title="文件">
          <t-menu-item value="save" @click="handleSave"
            ><template #icon><SaveIcon></SaveIcon></template>保存</t-menu-item
          >
        </t-submenu> -->
        <template #operations>
          <t-space :size="8">
            <t-tooltip
              :content="
                dataSheets && dataSheets.locked == LockState.DisableEdit ? '预览模式' : '编辑模式'
              "
            >
              <t-button variant="text" shape="square" @click="handleLocked">
                <template #icon
                  ><LockOnIcon
                    v-if="dataSheets && dataSheets.locked == LockState.DisableEdit"
                    size="18"
                  ></LockOnIcon
                  ><LockOffIcon v-else size="18"></LockOffIcon
                ></template>
              </t-button>
            </t-tooltip>

            <!-- <t-button variant="text" shape="square">
              <template #icon><t-icon name="search" /></template>
            </t-button> -->
            <!-- <t-button variant="text" shape="square">
            <template #icon><t-icon name="mail" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="user" /></template>
          </t-button> -->
            <t-switch v-model="isDark" @change="() => toggleDark" size="large">
              <template #label>
                <MoonIcon v-if="isDark" size="18" />
                <SunnyIcon v-else size="18" />
              </template>
            </t-switch>
            <!-- <t-button variant="text" shape="square">
            <template #icon><t-icon name="ellipsis" /></template>
          </t-button> -->
          </t-space>
        </template>
      </t-head-menu>
    </t-header>
    <t-layout class="configure-editor-body">
      <t-aside class="border-t-1 border-t-transparent border-t-solid shadow w-80 z-2">
        <MaterialView v-if="meta2d"></MaterialView>
      </t-aside>
      <!-- 主体 -->
      <t-layout>
        <t-layout>
          <t-content>
            <!-- 画布 -->
            <ConfigureEditorView></ConfigureEditorView>
          </t-content>
        </t-layout>
        <t-aside class="border-t-1 border-t-transparent border-t-solid shadow w-80 z-2">
          <!-- 属性面板 -->
          <PropsView v-if="meta2d"></PropsView>
        </t-aside>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { ref, provide, onMounted, nextTick } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  ViewListIcon,
  SaveIcon,
  ChevronDownIcon,
  FileAddIcon,
  PenIcon,
  LockOnIcon,
  LockOffIcon,
  SunnyIcon,
  MoonIcon,
  FileDownloadIcon
} from 'tdesign-icons-vue-next';
import MaterialView from './layout/material-view/MaterialView.vue';
import PropsView from './layout/props-view/PropsView.vue';
import ConfigureEditorView from './components/configure-editor-view/ConfigureEditorView.vue';
import { useConfigureEditorStore } from '@/stores/configure-editor';
import { useDebounceFn, useTimeoutFn, useFileSystemAccess } from '@vueuse/core';
import Config from '@/config/index';
import { LINE_NAME, LINE_NAME_ENUM } from '@/common/configure-common';
import { LockState, s8 } from '@meta2d/core';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/hooks/useTheme';
import { handleTree } from '@/util';
// 编辑器实例
const meta2d = ref();
// 结构
const structures = ref([]);
provide('meta2d', meta2d);
provide('structures', structures);

const configureEditorStore = useConfigureEditorStore();
const { setDataSheets } = configureEditorStore;
const { dataSheets } = storeToRefs(configureEditorStore);
const { isDark, toggleDark } = useTheme();

const lineName = ref(LINE_NAME_ENUM.CURVE);
// 下载JSON文件
const dataType = ref('Blob');
const { saveAs: downloadJson, data } = useFileSystemAccess({
  dataType,
  types: [
    {
      description: 'text',
      accept: {
        'text/plain': ['.json']
      }
    }
  ],
  excludeAcceptAllOption: true
});

// 新建
const handleAdd = useDebounceFn(
  () => {
    if (meta2d.value) {
      meta2d.value.open();
      setDataSheets(meta2d.value.data());
    }
  },
  Config.settingConfig.debounceTime,
  false
);

// 保存
const handleSave = useDebounceFn(
  () => {
    if (meta2d.value) {
      setDataSheets(meta2d.value.data());
      MessagePlugin.success('保存成功');
    }
  },
  Config.settingConfig.debounceTime,
  false
);

// 下载JSON文件
const handleDownloadJson = useDebounceFn(
  () => {
    data.value = JSON.stringify(meta2d.value.data());
    downloadJson();
  },
  Config.settingConfig.debounceTime,
  false
);
// 下载PNG文件
const handleDownloadPng = () => {
  let name = s8();
  if (name) {
    name += '.png';
  }
  meta2d.value.downloadPng(name);
};

// 更新结构
const handleUpdateStructure = () => {
  if (meta2d.value) {
    structures.value = handleTree(meta2d.value.store.data.pens, 'id', 'parentId', 'childrenPens');
  }
};

// 自动保存
const { start: handleAutoSave } = useTimeoutFn(() => {
  if (meta2d.value) {
    setDataSheets(meta2d.value.data());
    handleUpdateStructure();
  }
}, Config.settingConfig.timeoutTime);

onMounted(() => {
  nextTick(() => {
    meta2d.value.on('scale', handleAutoSave);
    meta2d.value.on('add', handleAutoSave);
    meta2d.value.on('opened', handleAutoSave);
    meta2d.value.on('undo', handleAutoSave);
    meta2d.value.on('redo', handleAutoSave);
    meta2d.value.on('delete', handleAutoSave);
    meta2d.value.on('rotatePens', handleAutoSave);
    meta2d.value.on('translatePens', handleAutoSave);
    meta2d.value.on('autoSave', handleAutoSave);
    meta2d.value.on('updateStructure', handleUpdateStructure);
  });
});

// 钢笔
const handleDrawLine = () => {
  if (meta2d.value.canvas.drawingLineName) {
    meta2d.value.drawLine();
    meta2d.value.finishPencil();
  } else {
    meta2d.value.drawLine(lineName.value);
  }
};

// 改变线类型
const changeLineName = () => {
  if (meta2d.value.canvas.drawingLineName) {
    meta2d.value.drawLine();
    meta2d.value.drawLine(lineName.value);
  }
};

/**
 * 处理锁定状态
 *
 * @returns 无返回值，但会修改dataSheets和meta2d的值
 */
const handleLocked = () => {
  if (dataSheets.value.locked == LockState.DisableEdit) {
    meta2d.value.lock(LockState.None);
  } else {
    meta2d.value.lock(LockState.DisableEdit);
  }
  setDataSheets(meta2d.value.data());
};
</script>

<style scoped>
.configure-editor-body {
  position: relative;
}

:deep(.t-collapse) {
  border: none;
}

:deep(.frames-drawer .t-drawer__body) {
  padding: 0;
}

:deep(.t-collapse-panel__wrapper .t-collapse-panel__content) {
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);
}
</style>
