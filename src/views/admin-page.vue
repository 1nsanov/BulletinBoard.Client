<template>
  <div class="home-page">
    <ui-button @onClick="goToHome"> На главную </ui-button>
    <ui-select
      placeholder="Выбрать город"
      :items="townItems"
      v-model="valueTown"
    />
    {{valueTown}}
  </div>
</template>

<script lang="ts">
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import { Options, Vue } from "vue-class-component";
@Options({
  name: "admin-page",
})
export default class AdminPage extends Vue {
  townItems: SelectOptionModel[] = [];
  valueTown: SelectOptionModel = null;

  async created() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.townItems = res.value.map(
          (x) => new SelectOptionModel(x.id, x.name)
        );
    });
  }

  goToHome() {
    this.$router.push({ name: "home" });
  }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
}
</style>
