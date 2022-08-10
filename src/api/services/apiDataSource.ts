import AdvertisementService from "./AdvertisementService/AdvertisementService";
import AuthService from "./AuthService/AuthService";
import CategoryService from "./CategoryService/CategoryService";
import TownService from "./TownService/TownService";

export default class apiDataSource {
  AuthService: AuthService;
  TownService: TownService;
  CategoryService: CategoryService;
  AdvertisementService: AdvertisementService;

  constructor(apiUrl: string) {
    this.AuthService = new AuthService(apiUrl + /auth/);
    this.TownService = new TownService(apiUrl + /town/);
    this.CategoryService = new CategoryService(apiUrl + /category/);
    this.AdvertisementService = new AdvertisementService(apiUrl + "/advertisement/")
  }
}