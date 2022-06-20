
export default class commonUtils {
  /**
   * 检查是否非空 有值为true
   * @param {any} value 
   * @returns {boolean}
   */
  static notEmpty = (value: any) =>
    value !== undefined && value !== null && value !== "";

  /**
   * 检查是否为 false
   * @param {any} value 
   * @returns {boolean}
   */
  static isFalsy = (value: any) =>
    value === 0 || value === "0" ? false : !value;

  /**
   * 检查是否为 array类型
   * @param {any} value 
   * @returns {boolean}
   */
  static isArray = (data: any) =>
    Object.prototype.toString.call(data) === "[object Array]";

   /**
   * 检查是否为 object类型
   * @param {any} value 
   * @returns {boolean}
   */
  static isObject = (data: any) =>
    Object.prototype.toString.call(data) === "[object Object]";

  /**
   * 检查是否为 blob类型
   * @param {any} value 
   * @returns {boolean}
   */
  static isBlob = (data: any) =>
    Object.prototype.toString.call(data) === "[object Blob]";

   /**
   * 检查是否为 number类型
   * @param {any} value 
   * @returns {boolean}
   */
  static isNumber = (data: any) =>
    Object.prototype.toString.call(data) === "[object Number]";

  /**
   * 首字母转大写
   * @param {string} value 
   * @returns {string}
   */
  static firstUpper = ([first, ...rest]: string) =>
    first?.toUpperCase() + rest.join("");

  /**  */
  /**
   * h5的运行环境检测
   * @returns {{
   *  trident: boolean // IE
   *  presto: boolean // Opera
   *  webKit: boolean // Chrome
   *  gecko: boolean // Firefox
   *  mobile: boolean // 手机
   *  ios: boolean // IOS
   *  android: boolean // Android
   *  iPhone: boolean // iPhone
   *  iPad: boolean // iPad
   *  webApp: boolean // safari
   *  wechat: boolean // 微信
   *  qq: boolean // QQ浏览器
   * }}
   */
  static h5RunningEnvironment = () => {
    const u = window.navigator.userAgent;
    return {
      trident: u.indexOf("Trident") > -1, // IE
      presto: u.indexOf("Presto") > -1, // Opera
      webKit: u.indexOf("AppleWebKit") > -1, // Chrome
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, // Firefox
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 手机
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS
      android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // Android
      iPhone: u.indexOf("iPhone") > -1, // iPhone
      iPad: u.indexOf("iPad") > -1, // iPad
      webApp: u.indexOf("Safari") === -1, // safari
      wechat: u.indexOf("MicroMessenger") > -1, // 微信
      qq: u.match(/\sQQ/i) === "qq", // QQ浏览器
    };
  };

  /**
   * 文件下载，可传路径或者文本
   * @param {*} fileData 路径或者文本
   * @param {*} name
   */
  static downloadFile(fileData = "", name: string) {
    const pom = document.createElement("a");
    if (
      fileData.indexOf("http") === 0 ||
      fileData.indexOf("/api/repository/") === 0
    ) {
      pom.setAttribute("href", decodeURIComponent(fileData));
    } else {
      pom.setAttribute(
        "href",
        `data:text/plain;charset=UTF-8,${encodeURIComponent(fileData)}`
      );
    }
    pom.setAttribute("download", name);
    document.body.appendChild(pom);
    pom.style.display = "none";
    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
    document.body.removeChild(pom);
  }

  /**
   * 文件下载，可传路径或者文本 iframe方式
   * @param {string} url 下载路径
   * @param {*} name
   */
  static downloadFileByIframe = (url: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => {
      iframe.remove();
    }, 5 * 60 * 1000);
  };

  /**
   * 下载二进制文件
   * @param {octet-stream} data
   * @param {String} fileName
   */
  static downloadOctet(
    data: octet,
    fileName,
    type = "application/octet-stream"
  ) {
    // 将二进制流转为 blob
    const blob = new Blob([data], { type });
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      // 兼容 IE，window.navigator.msSaveBlob：以本地方式保存文件
      return window.navigator.msSaveBlob(blob, decodeURI(fileName));
    }
    // 创建新的 URL 并指向 File 对象或者 Blob 对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(fileName));
    // 兼容：某些浏览器不支持 HTML5 的 download 属性
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放 blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }

  /**
   * 文件下载（blob）
   * {responseType: 'blob'}
   * @param {Blob} blobData  blob
   * @param {string} filename 文件格式
   * @param {string} suffix 文件格式
   */
  static blobFileDownload(blobData: Blob, filename = "file", suffix = "") {
    if (!blobData) {
      return;
    }
    const blob = new Blob([blobData], { type: "application/zip" });
    if (!window.navigator.msSaveBlob) {
      const elink = document.createElement("a");
      elink.download = filename + suffix;
      elink.style.display = "none";
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, filename);
    }
  }

  /**
   * 复制文本
   * @param {string} text 
   * @returns 
   */
  static copyText(text: string) {
    if (!this.notEmpty(text)) {
      return false;
    }
    const inputDom = document.createElement("input");
    inputDom.setAttribute("value", text);
    document.body.appendChild(inputDom);
    inputDom.select();
    const status = document.execCommand("copy");
    document.body.removeChild(inputDom);
    return status;
  }

  /**
   * 字符串排序
   * @param {string[]} list 
   * @returns 
   */
  static customSort = (list: string[]) => {
    const newList = JSON.parse(JSON.stringify(list));
    newList?.sort((a, b) => {
      const valueA = a?.toUpperCase();
      const valueB = b?.toUpperCase();
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
    return newList;
  };

  /**
   * Blob 转 json
   * @param {Blob} blobData 
   * @returns {Promise}
   */
  static blobToJson(blobData: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(blobData);
      reader.onload = function () {
        resolve(JSON.parse(this.result));
      };
      reader.onerror = function () {
        reject(new Error(""));
      };
    });
  }

  /**
   *  随机生成密码
   * @param {Number} length 密码长度
   * @returns string
   */
  static randomPassword(length: number) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = length; i > 0; --i) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }

  /**
   * jsonParser
   * @param {any} content 
   * @param {any} defaultValue 
   * @returns 
   */
  static jsonParser = (content: any, defaultValue: any = {}) => {
    try {
      if (typeof content === "string") {
        return JSON.parse(content);
      } else {
        return this.isObject(content) ? content : defaultValue;
      }
    } catch (e) {
      return defaultValue;
    }
  };

  /**
   * 加载图片
   * @param {string} imgSrc 
   * @returns {Promise} 
   */
  static loadImage = (imgSrc: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = imgSrc;
      image.onload = () => {
        setTimeout(() => {
          resolve(image);
        }, 300);
      };
      image.onerror = () => {
        // 无返回则默认为空
        resolve("");
      };
    });
  };

  /**
   * 格式pathname 去掉末尾 '/'
   * @param pathname 
   * @returns 
   */
  static formatPathname = (pathname: string) => {
    return `/${pathname
      ?.split("/")
      ?.filter((i) => !!i)
      ?.join("/")}`;
  };

  //  拼接get 请求字符串
  static getRequestURI(uri: string, params: any, filterEmptyString = false) {
    uri += "?";
    for (const i in params) {
      const value = params[i];
      if (filterEmptyString && !this.isNumber(value) && !value) {
        continue;
      }
      if (this.isArray(value)) {
        uri += value
          .map((item: number | string) => `${i}=${encodeURIComponent(item)}&`)
          .join("");
      } else {
        uri += `${i}=${encodeURIComponent(value)}&`;
      }
    }
    return uri.slice(0, -1);
  }

  /**
   * 获取当前项目的路径
   */
  static getCurrentBasePath() {
    const { pathname, origin } = window.location;
    return `${origin}${pathname}#`;
  }

  /**
   * 判断当前的 key value 是否在 inputList 里面
   *
   * @export
   * @param {string} key
   * @param {string} value
   * @param {IInputList[]} inputList
   */
  static judgeResultIsInInputList(
    key: string,
    value: string,
    inputList: any[]
  ) {
    if (!key || !value || !inputList) {
      return false;
    }

    const a = inputList.filter((v) => {
      if (v.value === key) {
        const resultValue = value?.split(";");
        return (
          v?.subSelected.filter((i) => resultValue.indexOf(i.value) > -1)
            .length > 0
        );
      }

      return false;
    });

    return a.length > 0;
  }

  static getUrlParameter = (queryString: any) => {
    const query = {};
    const pairs = (
      queryString[0] === "?" ? queryString.substr(1) : queryString
    ).split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  };
}
