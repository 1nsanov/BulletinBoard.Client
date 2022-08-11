<template>
  <ui-select
    :placeholder="!!townItems ? 'Выбрать город' : 'Загрузка...'"
    :items="townItems"
    v-model="valueTown"
  />
  <ui-input label="Создание" placeholder="..." v-model="inputCreate" />
  <ui-button
    class="btn-wrapper"
    color="green"
    :isLoading="isLoadCreate"
    @onClick="CreateTown"
  >
    Создать
  </ui-button>
  <ui-input label="Редактирование" placeholder="..." v-model="inputEdit" />
  <ui-button
    class="btn-wrapper"
    color="default"
    :isLoading="isLoadEdit"
    @onClick="UpdateTown"
  >
    Редактировать
  </ui-button>
  <ui-button
    class="btn-wrapper"
    color="red"
    :isLoading="isLoadRemove"
    @onClick="RemoveTown"
  >
    Удалить
  </ui-button>
</template>

<script lang="ts">
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
@Options({
  name: "town-manager",
})
export default class TownManager extends Vue {
  townItems: SelectOptionModel[] = [];
  valueTown: SelectOptionModel = null;

  inputCreate: string = "";
  inputEdit: string = "";

  isLoadCreate: boolean = false;
  isLoadEdit: boolean = false;
  isLoadRemove: boolean = false;

  @Watch("valueTown")
  onValueTown() {
    if (this.valueTown) this.inputEdit = this.valueTown.Name;
    else this.inputEdit = "";
  }

  created() {
    this.GetAllTown();
  }

  async GetAllTown() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.townItems = res.value.map(
          (x) => new SelectOptionModel(x.id, x.name)
        );
    });
  }

  async CreateTown() {
    if (this.inputCreate.length === 0) {
      alert("Пустое поле ввода нового города");
      return;
    }
    this.isLoadCreate = true;
    await this.$api.TownService.AddTown({ name: this.inputCreate }).then(
      (res) => {
        if (res.isSuccess) {
          this.GetAllTown();
          alert("Город успешно добавлен.");
        } else alert(res.message);
      }
    );
    this.isLoadCreate = false;
    this.inputCreate = "";
  }

  async UpdateTown() {
    if (this.inputEdit.length === 0 || !this.valueTown) {
      alert("Пустое поле ввода редактирования");
      this.onValueTown();
      return;
    }

    this.isLoadEdit = true;
    await this.$api.TownService.UpdateTown({
      id: this.valueTown.Id,
      name: this.inputEdit,
    }).then((res) => {
      if (res.isSuccess) {
        this.GetAllTown();
        alert("Город успешно обновлен.");
      } else {
        alert(res.message);
        this.onValueTown();
      }
    });
    this.isLoadEdit = false;

    this.inputEdit = "";
  }

  async RemoveTown() {
    if (!this.valueTown) {
      alert("Город не выбран");
      return;
    }

    this.isLoadRemove = true;
    await this.$api.TownService.RemoveTown({ id: this.valueTown.Id }).then(
      (res) => {
        if (res.isSuccess) {
          this.GetAllTown();
          alert("Город успешно удален.");
        } else {
          alert(res.message);
          this.onValueTown();
        }
      }
    );
    this.isLoadRemove = false;
  }
}
</script>

<style lang="less" scoped>
</style>
