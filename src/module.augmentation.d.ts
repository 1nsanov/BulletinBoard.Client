// 1. Обязательно импортируйте Vue перед объявлением расширенных типов
import Vue from 'vue'
import { Route, RawLocation } from 'vue-router';
import DataSource from './api/services/apiDataSource';

// 2. Укажите файл с типами, которые вы хотите расширить
//    Vue имеет тип конструктора в types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    $api: DataSource
    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
    ): void

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
    ): void

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
    ): void

    mounted?(): void
    created?(): void
  }
  interface VueConstructor {
    $api: DataSource
  }
}