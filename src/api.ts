import { App } from "vue";
import Api from "./api/services/apiDataSource";

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $api: Api;
  }
}

const install = (app: App, url: string) => {
  if (!url) {
    console.error('Для работы api плагина необходимо задать параметр url!');
    return;
  }
  const apiDataSource = new Api(url);
  app.config.globalProperties.$api = apiDataSource;
};

const dialog = {
  install,
};

export default dialog;