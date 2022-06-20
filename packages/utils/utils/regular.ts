/**
 * @desc 常用正则
 */
export default class index {
  static get email() {
    return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  }

  static get ip() {
    return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  }

  static get password() {
    // 密码强度:  至少 8 位， 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符(~!@#$^()_+)
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$^()_+])[a-zA-Z0-9~!@#$^()_+]{8,20}$/;
  }

  static get buckerName() {
    // 字母或者数字开头或者结尾，位数为 [3, 63]
    return /^[a-zA-Z0-9]\w{1,60}[a-zA-Z0-9]$/;
  }

  static get positiveDecimal() {
    // 正实数
    return /^\d*(\.\d+)?$/;
  }

  static get utf8Reg() {
    // 匹配 utf-8 字符
    return /^[\u{4e00}-\u{9fa5}.\w-]+$/u;
  }

  static get mathLikeIP() {
    // 匹配类 IP 形式的字符串 如: a.b.c 形式
    return /(\w+\.){2}/;
  }
  static get muchDot() {
    // 多于两个 .
    return /\.{2}/;
  }

  static get positiveInteger() {
    // 正整数
    return /^[1-9]\d*$/;
  }

  static get carVIN() {
    return /^[A-HJ-NPR-Z\d]{17}$/;
  }

  static get carNumber() {
    return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领])|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-K][A-HJ-NP-Z0-9]{5})|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][0-9]{5}[A-HJ-K]))$/;
  }

  /**
   * 只能输入数字、字母、下划线，下划线位置不限 1-20字符
   * @readonly
   * @static
   * @memberof index
   */
  static get nameRegEn20() {
    return /^[a-zA-Z0-9_]{1,20}$/;
  }

  // 只能输入汉字、数字、字母、下划线，下划线位置不限， 最少 1位数， 最多 20 位
  static get nameReg20() {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/;
  }

  // 只能输入数字、字母、下划线，下划线位置不限， 最少 1位数， 最多 50 位
  static get nameRegEn50() {
    return /^[a-zA-Z0-9_]{1,50}$/;
  }

  // 只能输入汉字、数字、字母、下划线，下划线位置不限， 最少 1位数， 最多 50 位
  static get nameReg50() {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/;
  }

  static get landlinePreNumber() {
    return /^0\d{2,3}$/;
  }

  static get landlineNumber() {
    return /^\d{7,8}$/;
  }

  static get phoneNumber() {
    return /^1[3-9]\d{9}$/;
  }
  
  /**
   * 字符不限 1-140 字符
   * @readonly
   * @static
   * @memberof index
   */
  static get desc() {
    return /^[\s\S]{0,140}$/;
  }
  
  // 不允许字符串前后出现空格，允许中间有空格
  static get goEmpty() {
    return /^[^\s]+(\s+[^\s]+)*$/;
  }
  
  static get integer() {
    return /^\d*$/;
  }
  
  //0-100的正整数
  static get integerReg100() {
    return /^(([1-9]?\d(\.\d{1,2})?)|100)$/;
  }

  /**
   * 只能输入数字、字母、下划线，下划线位置不限
   * @param {number} min 最少字符 默认 = 1
   * @param {number} max 最长字符 默认 = 20
   * @returns 
   */
  static nameRegEnCustom(min = 1,max = 20){
    return new RegExp("^[a-zA-Z0-9_]{" + min + "," + max + "}$") ;
  }

  /**
     * 只能输入汉字、数字、字母、下划线，下划线位置不限
     * @param {number} min 最少字符 默认 = 1
     * @param {number} max 最长字符 默认 = 20
     * @returns 
     */
  static nameRegCustom(min = 1,max = 20){
    return new RegExp("^[a-zA-Z0-9_\\u4e00-\\u9fa5]{" + min + "," + max + "}$") ;
  }
}
