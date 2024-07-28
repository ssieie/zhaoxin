import service from "/src/utils/request.ts";

export interface Category {
  id: string;
  categoryName: string;
  createTime?: string;
  updateTime?: string;
}

export function categoryApi() {
  return {
    list(data: object) {
      return service({ url: `/api/category/list`, method: "post", data });
    },
    add(data: object) {
      return service({ url: `/api/category/add`, method: "post", data });
    },
    update(data: object) {
      return service({ url: `/api/category/update`, method: "post", data });
    },
    del(id: string) {
      return service({ url: `/api/category/${id}`, method: "delete" });
    },
  };
}
