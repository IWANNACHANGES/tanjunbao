export class Polling {
  private timeout: any;
  private canceled: boolean;
  constructor() {
    this.timeout = null;
    this.canceled = false;
  }
  /**
   * 接口轮询
   * @param request Promise接口
   * @param isCancel 取消轮询的方法
   * @param timeout 轮询超时限制，默认60s
   * @param interval 轮训间隔时间
   */
  public startPolling = (
    request: () => Promise<any>,
    isCancel: (result: any) => boolean,
    timeout = 60 * 1000,
    interval = 1000
  ) => {
    return new Promise((resolve, reject) => {
      this.canceled = false;
      const startTime = new Date().getTime();
      const notTimeout = new Date().getTime() - startTime < timeout;
      const toRequest = () => {
        this.timeout = setTimeout(async () => {
          try {
            request().then((result) => {
              if (this.canceled) {
                return;
              }
              if (isCancel(result)) {
                resolve(result);
                this.timeout = null;
              } else if (notTimeout) {
                toRequest();
              } else {
                reject({
                  message: "Polling timeout",
                });
                this.timeout = null;
              }
            });
          } catch (e) {
            resolve(e);
          }
        }, interval);
      };
      toRequest();
    });
  };
  public cancel = () => {
    this.canceled = true;
    window.clearTimeout(this.timeout);
    this.timeout = null;
  };
  public isPolling = () => this.timeout !== null;
}

export default new Polling();
