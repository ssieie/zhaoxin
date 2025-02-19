import service from "/src/utils/request.ts";

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

export function commentApi() {
  return {
    add(data: object) {
      return service({
        url: `/web/comment/add`,
        method: "post",
        data,
      });
    },
    get(id: string) {
      return service({
        url: `/web/comment/${id}`,
        method: "get",
      });
    },
  };
}
