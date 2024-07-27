import service from "/@/utils/request.ts";

export function commonApi() {
  return {
    login(data: object) {
      return service({ url: `/login`, method: "post", data });
    },
    health() {
      return service({ url: `/health`, method: "get" });
    },
  };
}
