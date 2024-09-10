<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import API from '@/api/API';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { PI_META_2D, PI_STRUCTURES } from '@/common/index';

const meta2d = inject(PI_META_2D);
const userStore = useUserStore();
const { token } = storeToRefs(userStore);

const file = ref(null);
const backgroundImage = ref([]);

const active = ref('basic');

const uploadConfig = computed(() => {
  return {
    action: API.uploadFile,
    headers: { Authorization: token.value },
    max: 1
  };
});

onMounted(() => {
  file.value = meta2d.value.store.data;
  if (!file.value.width) {
    file.value.width = 1920;
  }
  if (!file.value.height) {
    file.value.height = 1080;
  }
  if (file.value.rule === undefined) {
    file.value.rule = true;
  }
  if (file.value.backgroundImage) {
    backgroundImage.value = [{ url: file.value.backgroundImage }];
  }
});

// 设置数据
const changeData = () => {
  Object.assign(meta2d.value.store.data, file.value);
  meta2d.value.render();
};

// 设置背景颜色
const changeBackgroundColor = () => {
  meta2d.value.setBackgroundColor(file.value.background);
  meta2d.value.render();
};

// 设置主题
const changeTheme = () => {
  meta2d.value.setTheme(file.value.theme);
  meta2d.value.render();
};

// 设置标尺
const changeRule = () => {
  meta2d.value.setRule({ rule: file.value.rule });
  meta2d.value.render();
};

// 设置背景图片
const changeBackgroundImage = () => {
  meta2d.value.setBackgroundImage(file.value.backgroundImage);
  meta2d.value.render();
  console.log(meta2d.value.data());
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
  file.value.backgroundImage = API.download + fileList[0].response.result;
  changeBackgroundImage();
};

// 移除图片
const handleRemove = () => {
  file.value.backgroundImage = '';
  changeBackgroundImage();
};
</script>

<template>
  <t-form :model="file" label-width="100px" v-if="file" label-align="left">
    <t-tabs size="medium" tabPosition="top" v-model="active">
      <t-tab-panel label="画布" value="basic">
        <div class="p0 node-props-container overflow-auto narrow-scrollbar">
          <t-collapse :default-value="[0]">
            <t-collapse-panel header="基础信息">
              <div class="p0">
                <t-form-item label="画布尺寸">
                  <t-space>
                    <t-input-number
                      v-model="file.width"
                      min="1"
                      label="W"
                      borderless
                      class="w-20"
                      theme="normal"
                      @change="changeData"
                    ></t-input-number>
                    <t-input-number
                      v-model="file.height"
                      min="1"
                      label="H"
                      borderless
                      class="w-20"
                      theme="normal"
                      @change="changeData"
                    ></t-input-number>
                  </t-space>
                </t-form-item>

                <t-form-item label="背景颜色">
                  <t-color-picker
                    v-model="file.background"
                    :show-primary-color-preview="false"
                    :input-props="{ autoWidth: false }"
                    class="w-full"
                    :enableAlpha="true"
                    :colorModes="['monochrome']"
                    format="RGBA"
                    @change="changeBackgroundColor"
                  />
                </t-form-item>
                <!-- <t-form-item label="主题">
            <t-select v-model="file.theme" @change="changeTheme">
              <t-option label="明亮" value="light"></t-option>
              <t-option label="暗黑" value="dark"></t-option>
            </t-select>
          </t-form-item> -->
                <t-form-item label="标尺">
                  <t-switch v-model="file.rule" @change="changeRule"></t-switch>
                </t-form-item>
              </div>
            </t-collapse-panel>
            <t-collapse-panel header="图片">
              <t-form-item label-width="0">
                <t-upload
                  theme="image"
                  accept="image/*"
                  v-bind="uploadConfig"
                  v-model="backgroundImage"
                  class="w-full"
                  :auto-upload="true"
                  :show-image-file-name="false"
                  @success="handleUploadSuccess"
                  @remove="handleRemove"
                >
                </t-upload>
              </t-form-item>
            </t-collapse-panel>
          </t-collapse>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<style scoped>
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
