import service from "/src/utils/request.ts";

export interface Article {
  id: string;
  title: string;
  cName: string;
  describe: string;
  heat: number;
  likeNumber: number;
  createTime?: string;
  updateTime?: string;
}

export interface CommentRes {
  id: number;
  pId?: number;
  articleId: number;
  name: string;
  comment: string;
  createTime: string;
}

export interface CommentTree {
  item: CommentRes;
  depth?: number;
  children: CommentTree[] | null;
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
    commentList(id: string) {
      return service({ url: `/api/comment/${id}`, method: "get" });
    },
    delComment(id: string) {
      return service({ url: `/api/comment/${id}`, method: "delete" });
    },
  };
}
