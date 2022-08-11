import SubCategoryModel from "./SubCategoryModel";

export default class GetAllCategoryResponse{
  id: number = 0;
  name: string = null;
  imageUrl?: string = null;
  subCategories: SubCategoryModel[] = null;
}