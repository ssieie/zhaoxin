import service from "/src/utils/request.ts";

export interface Introduce {
  id: string;
  text: string;
  add?: boolean;
  createTime?: string;
  updateTime?: string;
}

export function introduceApi() {
  return {
    list(data: object) {
      return service({ url: `/api/introduce/list`, method: "post", data });
    },
    add(data: object) {
      return service({ url: `/api/introduce/add`, method: "post", data });
    },
    update(data: object) {
      return service({ url: `/api/introduce/update`, method: "post", data });
    },
    del(id: string) {
      return service({ url: `/api/introduce/${id}`, method: "delete" });
    },
  };
}
