import service from "/src/utils/request.ts";

export function aboutApi() {
  return {
    about() {
      return service({ url: `/api/about`, method: "get" });
    },
    updateAbout(data: object) {
      return service({ url: `/api/about`, method: "put", data });
    },
  };
}
