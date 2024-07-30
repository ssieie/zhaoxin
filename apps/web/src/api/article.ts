import service from "/src/utils/request.ts";

export interface Article {
  id: string;
  title: string;
  cId: number;
  cName: string;
  describe: string;
  heat: number;
  text?: string;
  likeNumber: number;
  createTime?: string;
  updateTime?: string;
}

export interface HotCategoryList {
  cId: number;
  cName: string;
  totalHeat: number;
}

export function articleApi() {
  return {
    list() {
      return service({ url: `/web/article`, method: "get" });
    },
    listAll(cid?: string) {
      return service({
        url: cid ? `/web/article/all?cid=${cid}` : "/web/article/all",
        method: "get",
      });
    },
    details(id: string) {
      return service({ url: `/web/article/${id}`, method: "get" });
    },
    hotList() {
      return service({ url: `/web/article/hot`, method: "post" });
    },
    hotCategoryList() {
      return service({ url: `/web/category/hot`, method: "post" });
    },
  };
}
