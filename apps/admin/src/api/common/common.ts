import service from "/@/utils/request.ts";
import {AxiosResponse} from "axios";

export function commonApi() {
  return {
    login(data: object): Promise<AxiosResponse<any, any>> {
      return service({ url: `/login`, method: "post", data });
    },
  };
}
