import service from "/src/utils/request.ts";
import { Category } from "/@/api/category.ts";

export interface PhotoCategory extends Category {}

export function photoCategoryApi() {
  return {
    list(data: object) {
      return service({ url: `/api/photoCategory/list`, method: "post", data });
    },
    add(data: object) {
      return service({ url: `/api/photoCategory/add`, method: "post", data });
    },
    update(data: object) {
      return service({
        url: `/api/photoCategory/update`,
        method: "post",
        data,
      });
    },
    del(id: string) {
      return service({ url: `/api/photoCategory/${id}`, method: "delete" });
    },
  };
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

export function photoTvSeriesApi() {
  return {
    list(data: object) {
      return service({ url: `/api/photoTvSeries/list`, method: "post", data });
    },
    add(data: object) {
      return service({ url: `/api/photoTvSeries/add`, method: "post", data });
    },
    update(data: object) {
      return service({
        url: `/api/photoTvSeries/update`,
        method: "post",
        data,
      });
    },
    del(id: string) {
      return service({ url: `/api/photoTvSeries/${id}`, method: "delete" });
    },
    details(id: string) {
      return service({ url: `/api/photoTvSeries/${id}`, method: "get" });
    },
  };
}

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

export function photoApi() {
  return {
    list(data: object) {
      return service({ url: `/api/photo/list`, method: "post", data });
    },
    add(data: object) {
      return service({ url: `/api/photo/add`, method: "post", data });
    },
    update(data: object) {
      return service({
        url: `/api/photo/update`,
        method: "post",
        data,
      });
    },
    del(id: string) {
      return service({ url: `/api/photo/${id}`, method: "delete" });
    },
    details(id: string) {
      return service({ url: `/api/photo/${id}`, method: "get" });
    },
  };
}
