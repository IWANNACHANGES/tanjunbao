export default class timeUtils {
  /**
   * 日期计算
   * @param time
   * @returns {'yyyy/mm/dd'}
   */
  static getCurrentTime(time: number) {
    if (!time || time <= 0) {
      return "—";
    }
    const date = new Date(time * 1000);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  /**
   * 日期计算 YYYY-MM-DD h:mm:ss
   * @param time
   * @returns {'yyyy/mm/dd'}
   */
  static getTime(time: number) {
    if (!time) {
      return "-";
    }
    const date = new Date(time * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
      date.getHours().toString()?.length > 1
        ? date.getHours()
        : "0" + date.getHours()
    }:${
      date.getMinutes().toString()?.length > 1
        ? date.getMinutes()
        : "0" + date.getMinutes()
    }:${
      date.getSeconds().toString()?.length > 1
        ? date.getSeconds()
        : "0" + date.getSeconds()
    }`;
  }

  // 返回mm:ss格式
  static secondsToMinute = (seconds: number) => {
    if (!(seconds > 0)) {
      return "00:00";
    }
    const d = Math.floor(seconds / (60 * 60 * 24));
    const h = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    let m = Math.floor((seconds % (60 * 60)) / 60);
    const s = Math.floor(seconds % 60);
    if (d > 0) {
      m += d * 24 * 60 + h * 60;
    } else if (h > 0) {
      m += h * 60;
    }
    return [m < 10 ? `0${m}` : `${m}`, s < 10 ? `0${s}` : `${s}`].join(":");
  };

  /**
   * 获取固定格式的时间
   */
  static dateFormat = (d, format = "yyyy-MM-dd hh:mm:ss") => {
    const date = d ? new Date(d) : new Date();
    const o = {
      "y+": date.getFullYear(),
      "M+": `${date.getMonth() + 1}`.padStart(2, "0"),
      "d+": date.getDate().toString().padStart(2, "0"),
      "h+": date.getHours().toString().padStart(2, "0"),
      "m+": date.getMinutes().toString().padStart(2, "0"),
      "s+": date.getSeconds().toString().padStart(2, "0"),
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, o[k]);
      }
    }
    return format;
  };

  /**
   * 将秒数换成时分秒格式
   */
  static formatSeconds = (value, format = "hh:mm:ss", auto = false) => {
    /* if (!value) {
    return ''
  } */
    const hhIndex = format.indexOf("h");
    const mmIndex = format.indexOf("m");
    const ssIndex = format.indexOf("s");

    let ss = parseInt(value, 10) || 0; // 秒
    let mm = 0; // 分
    let hh = 0; // 小时
    if (ss > 59) {
      mm = parseInt(ss / 60, 10);
      ss = parseInt(ss % 60, 10);
      if (mm > 59) {
        hh = parseInt(mm / 60, 10);
        mm = parseInt(mm % 60, 10);
      }
    }

    const o = {
      "h+": hh.toString().padStart(2, "0"),
      "m+": mm.toString().padStart(2, "0"),
      "s+": ss.toString().padStart(2, "0"),
    };
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, o[k]);
      }
    }
    if (auto) {
      const arr1 = [];
      if (hhIndex > -1 && o["h+"] === "00") {
        arr1.push(format.substring(0, mmIndex));
      }
      if (mmIndex > -1 && o["m+"] === "00") {
        arr1.push(format.substring(mmIndex, ssIndex));
      }
      if (ssIndex > -1 && o["s+"] === "00") {
        arr1.push(format.substring(ssIndex, format.length));
      }
      for (const index in arr1) {
        if (new RegExp(`(${arr1[index]})`).test(format)) {
          format = format.replace(RegExp.$1, "");
        }
      }
    }
    return format;
  };

  /**
   * 解析 两个时间间的时长 - 时 分 秒标识, stamp 为毫秒
   * @returns {hours, minutes, seconds, milliseconds}
   */
  static duration(
    stamp1: number,
    stamp2: number
  ): { hours: number; minutes: number; seconds: number; milliseconds: number } {
    if (!stamp1 || !stamp2) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }
    const durationTime = stamp2 - stamp1; // 相差的毫秒数
    const hours = Math.floor(durationTime / (3600 * 1000)); // 计算剩余的小时数
    const minutes = Math.floor(durationTime / (60 * 1000) - 60 * hours); // 计算剩余的分钟数
    const seconds = Math.floor(
      durationTime / 1000 - minutes * 60 - 3600 * hours
    ); // 计算剩余的秒数
    const milliseconds = Math.floor(
      durationTime - seconds * 1000 - minutes * 60 * 1000 - hours * 3600 * 1000
    ); // 计算剩余的秒数
    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  /**
   * 回去某天的开头或者结束时间戳
   * @param date
   * @param type
   * @returns
   */
  // static getUnix = (date: any, type?: "start" | "end") => {
  //   if (!date || !moment(date).isValid()) {
  //     return undefined;
  //   }
  //   date = moment(date);
  //   if (type === "start") {
  //     return date.startOf("day").unix();
  //   }
  //   if (type === "end") {
  //     return date.endOf("day").unix();
  //   }
  //   return date.unix();
  // };

  /**
   * 获取当前字节下大小的展示
   * @param size
   */
  static getSizeString = (size: number) => {
    const MB = 1024 * 1024;
    const GB = 1024 * MB;
    if (!size || size <= 0) {
      return "";
    }
    if (size > GB) {
      const newNum = size / GB;

      return `${newNum.toFixed(2)} GB`;
    }

    const newNum = size / MB;

    return `${newNum.toFixed(2)} MB`;
  };
}
