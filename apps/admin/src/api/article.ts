import service from "/src/utils/request.ts";

export interface Article {
  id: string;
  title: string;
  cName: string;
  describe: string;
  createTime?: string;
  updateTime?: string;
}

export function articleApi() {
  return {
    list(data: object) {
      return service({ url: `/api/article/list`, method: "post", data });
    },
    details(id: string) {
      return service({ url: `/api/article/${id}`, method: "get" });
    },
    add(data: object) {
      return service({ url: `/api/article/add`, method: "post", data });
    },
    update(data: object) {
      return service({ url: `/api/article/update`, method: "post", data });
    },
    del(id: string) {
      return service({ url: `/api/article/${id}`, method: "delete" });
    },
  };
}
