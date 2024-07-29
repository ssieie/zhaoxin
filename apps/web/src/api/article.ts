import service from "/src/utils/request.ts";

export interface Article {
    id: string;
    title: string;
    cName: string;
    describe: string;
    createTime?: string;
    updateTime?: string;
}

export function articleApi() {
    return {
        list() {
            return service({ url: `/web/article`, method: "get" });
        },
        details(id:string) {
            return service({ url: `/web/article/${id}`, method: "get" });
        },
        hotList() {
            return service({ url: `/web/article/hot`, method: "get" });
        },
    };
}
