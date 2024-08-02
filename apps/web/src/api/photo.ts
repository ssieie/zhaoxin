import service from "/src/utils/request.ts";

export interface Photo {
  id: number;
  photoCategoryId: number;
  photoCategoryName: string;
  tvSeriesId: number;
  tvSeriesName: string;
  photoUrl: string;
  previewUrl: string;
  author: string;
  like?: string;
  width: number;
  height: number;
  createTime?: string;
  updateTime?: string;
}

export interface PhotoTvSeries {
  id: number;
  name: string;
  coverImage?: string;
  previewImage?: string;
  author?: string;
  describe?: string;
  createTime?: string;
  updateTime?: string;
}

export function photoApis() {
  return {
    new(data: object) {
      return service({ url: `/web/photo/new`, method: "post", data });
    },
    hot(data: object) {
      return service({ url: `/web/photo/hot`, method: "post", data });
    },
    tvSeries() {
      return service({
        url: `/web/photo/tvSeries`,
        method: "post",
        data: { name: "" },
      });
    },
  };
}
