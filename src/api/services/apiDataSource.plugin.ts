import _Vue from "vue";
import ApiDataSource from "./apiDataSource";


  export default {
    install: (Vue: typeof _Vue, url: string) => {      // reconnectEnabled: boolean = false, vueNameField: string = "$api"
      const API = new ApiDataSource(url);  
      let vueNameField = '$apiMain';
      
      (Vue as any).prototype[vueNameField] = API;
      (Vue as any)[vueNameField] = API;
    }
  }
