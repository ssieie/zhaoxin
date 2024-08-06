import service from "/src/utils/request.ts";

export function otherApi() {
  return {
    news() {
      return service({
        url: `/web/other/news`,
        method: "get",
        responseType: "blob",
      });
    },
  };
}
