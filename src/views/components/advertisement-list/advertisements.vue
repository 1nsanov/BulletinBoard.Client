<template>
  <ui-create-button class="create-btn-adv" v-if="isCreate" />
  <advertisement-list>
    <advertisement-item
      v-for="item in advertisementList"
      :key="item.id"
      :item="item"
    />
  </advertisement-list>
  <div class="stopper-empty" v-if="advertisementList.length === 0">
    Список объявлений пуст
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AdvertisementList from "./advertisement-list.vue";
import AdvertisementItem from "./advertisement-item.vue";
import AdvertisementListItemModel from "@/api/services/AdvertisementService/models/AdvertisementListItemModel";
import FilterAdvertisementModel from "../../../models/FilterAdvertisementModel";
import { Prop, Watch } from "vue-property-decorator";

@Options({
  name: "advertisements",
  components: { AdvertisementList, AdvertisementItem },
})
export default class Advertisements extends Vue {
  @Prop({ default: true }) isCreate: boolean;
  @Prop({ default: false }) isPersonal: boolean;

  advertisementList: AdvertisementListItemModel[] = [];
  filter: FilterAdvertisementModel = new FilterAdvertisementModel();

  @Watch("$store.state.townFilterId")
  onTownFilter() {
    console.log("onTownFilter");
    this.filter.TownId = this.$store.state.townFilterId;
    this.getAdvertisementList();
  }

  @Watch("$store.state.categoryFilterId")
  onCategoryilter() {
    console.log("onCategoryilter");
    this.filter.CategoryId = this.$store.state.categoryFilterId;
    this.getAdvertisementList();
  }

  @Watch("$store.state.subCategoryFilterId")
  onsubCategoryFilterId() {
    console.log("onsubCategoryFilterId");
    this.filter.SubCategory = this.$store.state.subCategoryFilterId;
    this.getAdvertisementList();
  }

  created() {
    if (this.isPersonal) this.filter.UserId = this.$api.AuthService.User.id;
    this.getAdvertisementList();
  }

  getAdvertisementList() {
    this.$api.AdvertisementService.GetAdvertisementList({
      TownId: this.filter.TownId,
      CategoryId: this.filter.CategoryId,
      SubCategoryId: this.filter.SubCategory,
      UserId: this.filter.UserId,
    }).then((res) => {
      if (res.isSuccess) {
        this.advertisementList = res.value;
      }
    });
  }
}
</script>

<style lang="less" scoped>
.create-btn-adv {
  margin-bottom: 20px;
}
.stopper-empty {
  width: 100%;
  padding: 50px;
  text-align: center;
  font-size: 30px;
  line-height: 35px;
}
</style>
