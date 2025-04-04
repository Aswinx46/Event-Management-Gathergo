export interface IchangeStatusOfCategoryUseCase {
    changeStatusCategory(categoryId: string): Promise<boolean>
}