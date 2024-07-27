import service from "/src/utils/request.ts";

export function aboutApi() {
  return {
    about() {
      return service({ url: `/web/about`, method: "get" });
    },
  };
}
