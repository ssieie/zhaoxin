enum ResponseStatusCode {
    /**
     * 成功
     */
    success = 200,
    /**
     * 参数错误
     */
    error = 400,
    /**
     * 无效的token
     */
    invalidToken = 401,
    /**
     * 系统错误
     */
    sysError = 500,
}
/**
 * 公共的请求响应，所有接口都应该遵循这个接口
 */
declare type RequestResponse<T> = {
    data: T;
    message?: string;
    status: ResponseStatusCode;
};