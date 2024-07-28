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
    };
}
