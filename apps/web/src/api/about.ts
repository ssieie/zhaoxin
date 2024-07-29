import service from "/src/utils/request.ts";

export function aboutApi() {
  return {
    about() {
      return service({ url: `/web/about`, method: "get" });
    },
    introduce() {
      return service({ url: `/web/introduce`, method: "post", data:{text:''} });
    },
  };
}
