import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const messageQueue = new Map();

function createMessage(options) {
  const messageInstance = messageQueue.get(options.message);
  if (messageInstance) {
    MessagePlugin.close(messageInstance.value);
  }
  messageQueue.set(options.message, ref(MessagePlugin(options)));
  return { messageInstance };
}

//NOTE成功
function useSuccessMessage(options) {
  options.theme = 'success';
  return createMessage(options);
}
//NOTE错误
function useErrorMessage(options) {
  options.theme = 'error';
  return createMessage(options);
}
//NOTE警告
function useWaringMessage(options) {
  options.theme = 'warning';
  return createMessage(options);
}
//NOTE信息
function useInfoMessage(options) {
  options.theme = 'info';
  return createMessage(options);
}

export function useMessage() {
  return {
    useSuccessMessage,
    useInfoMessage,
    useWaringMessage,
    useErrorMessage,
    createMessage
  };
}
