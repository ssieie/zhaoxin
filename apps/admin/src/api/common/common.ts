import service from "/@/utils/request.ts";

export function commonApi() {
  return {
    login(data: object) {
      return service({ url: `/api/login`, method: "post", data });
    },
    health() {
      return service({ url: `/api/health`, method: "get" });
    },
  };
}
