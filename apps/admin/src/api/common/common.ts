import service from "/@/utils/request.ts";

interface RequestLogRecord {
  uri: string;
  method: string;
  ipAddress: string;
  userAgent: string;
  time: string;
}

export interface RequestLog {
  data: RequestLogRecord[];
  total: number;
}

export function commonApi() {
  return {
    login(data: object) {
      return service({ url: `/api/login`, method: "post", data });
    },
    health() {
      return service({ url: `/api/health`, method: "get" });
    },
    requestLog(data: object) {
      return service({ url: `/api/requestLog`, method: "POST", data });
    },
  };
}
