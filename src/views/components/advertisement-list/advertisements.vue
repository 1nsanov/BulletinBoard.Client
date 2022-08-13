<template>
  <advertisement-list>
    <advertisement-item
      v-for="item in advertisementList"
      :key="item.id"
      :item="item"
    />
  </advertisement-list>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AdvertisementList from "./advertisement-list.vue";
import AdvertisementItem from "./advertisement-item.vue";
import AdvertisementListItemModel from "@/api/services/AdvertisementService/models/AdvertisementListItemModel";
import FilterAdvertisementModel from "../../../models/FilterAdvertisementModel";
import { Watch } from "vue-property-decorator";

@Options({
  name: "advertisements",
  components: { AdvertisementList, AdvertisementItem },
})
export default class Advertisements extends Vue {
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
    this.getAdvertisementList();
  }

  getAdvertisementList() {
    this.$api.AdvertisementService.GetAdvertisementList({
      TownId: this.filter.TownId,
      CategoryId: this.filter.CategoryId,
      SubCategoryId: this.filter.SubCategory,
    }).then((res) => {
      if (res.isSuccess) {
        this.advertisementList = res.value;
      }
    });
  }
}
</script>

<style lang="less" scoped>
</style>
