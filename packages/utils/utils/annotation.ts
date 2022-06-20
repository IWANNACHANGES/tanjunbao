import cloneDeep from "lodash/cloneDeep";
import commonUtils from "./common";

export const SPECIFIC_CHARACTER =
  "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] _ ` ~";
export const Number_CHARACTER = "0 1 2 3 4 5 6 7 8 9";
export const ENGLISH_CHARACTER =
  "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
export const REGEXP_NUMBER = "^[0-9]*$";
export const REGEXP_ENGLISH = "^[A-Za-z]*$";
export const SPECIFIC_CHARTER =
  "^[0-9A-Za-z!\"#\\\\\\$%&\\'()*+,-./:;<=>?@\\[\\]_`~]*$";

export default class annotationUtils {
  // static getTextType = (textCheckType: ETextType) => {
  //   switch (textCheckType) {
  //     case ETextType.Order:
  //       return ETextType.Order;
  //     case ETextType.NumberOnly:
  //       return ETextType.NumberOnly;
  //     case ETextType.EnglishOnly:
  //       return ETextType.EnglishOnly;
  //     case ETextType.CustomFormat:
  //       return ETextType.CustomFormat;
  //     case ETextType.SpecificCharter:
  //       return ETextType.CustomFormat;
  //   }
  // };

  // /**
  //  * 获取正则校验的string
  //  * @param textCheckType
  //  * @param customFormat
  //  */
  // static checkString = (textCheckType: ETextType, customFormat = "") => {
  //   let regExpString: string | RegExp = "";
  //   switch (textCheckType) {
  //     case ETextType.Order:
  //     case ETextType.NumberOnly:
  //       regExpString = REGEXP_NUMBER;
  //       break;
  //     case ETextType.EnglishOnly:
  //       regExpString = REGEXP_ENGLISH;
  //       break;
  //     case ETextType.CustomFormat:
  //       regExpString = customFormat;
  //       break;
  //     case ETextType.SpecificCharter:
  //       regExpString = SPECIFIC_CHARTER;
  //       break;
  //   }
  //   return regExpString;
  // };

  // static getCharacterSet = (textCheckType: ETextType) => {
  //   switch (textCheckType) {
  //     case ETextType.Order:
  //     case ETextType.NumberOnly:
  //       return Number_CHARACTER.replaceAll(" ", "\n");
  //     case ETextType.EnglishOnly:
  //       return ENGLISH_CHARACTER.replaceAll(" ", "\n");
  //     case ETextType.CustomFormat:
  //       return "";
  //     case ETextType.SpecificCharter:
  //       return SPECIFIC_CHARACTER.replaceAll(" ", "\n");
  //   }
  // };

    /**
   * 根据配置获取所有二级标签
   * @param result
   * @param inputList
   * @returns
   */
     static getAllBinaryTagsWithConfig = (
      result: { [a in string]: string },
      inputList: any[]
    ): string[] => {
      const keyList = Object.keys(result);
      return keyList.map((key) => {
        const i = inputList?.find((item) => {
          if (key === "attributeLabel") {
            return item.subSelected?.find((info) => info.key === result[key]);
          }
          return item?.key === key;
        });
        if (i) {
          const v = i?.subSelected?.find((item) => item?.key === result[key]);
          if (v) {
            return `${v.value}`;
          }
          return `${result[key]}`;
        } else {
          return `${result[key]}`;
        }
      });
    };

     /**
   *
   * @param result
   * @param inputList
   * @returns
   */
  static getShowLabel = (result: any, inputList: any[]) => {
    const showText = Object.keys(result)?.map((key) => {
      const i = inputList?.find((item) => {
        if (key === "attributeLabel") {
          return item.subSelected?.find((info) => info.key === result[key]);
        }
        return item?.key === key;
      });
      if (i) {
        const v = i?.subSelected?.find((item) => item?.key === result[key]);
        if (v) {
          return `${i.value}-${v.value}`;
        }
        return `${i.value}-${result[key]}`;
      } else {
        return `${key}-${result[key]}`;
      }
    });
    return showText.join(";");
  };

   /**
   *
   * @param result
   * @returns
   */
    static getAllBinaryTagsFromResult = (
      result: unknown | string,
      inputList: any[],
      EToolName: any
    ): string[] => {
      const resultObj = commonUtils.jsonParser(result);
      const resultList: any[] = [];
      Object.keys(JSON.parse(JSON.stringify(resultObj))).map((key: string) => {
        if (key.startsWith("step")) {
          if (resultObj[key]?.toolName === EToolName.Tag) {
            resultObj[key]?.result.map((item: any) => {
              resultList.push(
                ...this.getAllBinaryTagsWithConfig(item?.result, inputList)
              );
            });
          } else if (resultObj[key]?.toolName === EToolName.RectLabel) {
            resultObj[key]?.result.map((item: any) => {
              if (item?.result) {
                resultList.push(
                  ...this.getAllBinaryTagsWithConfig(item?.result, inputList)
                );
              }
            });
          } else {
            resultObj[key]?.result.map((item: any) => {
              resultList.push(item?.attribute);
            });
          }
        }
      });
      return [...new Set(resultList)];
    };

    static getFilterTags = (config: string | any) => {
      let configObj: any;
      let tagList: string[] = [];
      if (typeof config === "string") {
        configObj = commonUtils.jsonParser(config);
      } else {
        configObj = JSON.parse(JSON.stringify(config));
      }
      if (configObj?.inputList) {
        configObj?.inputList?.forEach((item: any) => {
          item?.subSelected?.map((tag: any) => {
            tagList?.push(tag);
          });
        });
      } else if (configObj?.attributeList) {
        tagList = configObj?.attributeList?.map((item: any) => item?.value);
      }
      return tagList;
    };

  /**
   * coco 数据格式 转 sae json 数据格式
   * 在coco数据基础上添加
   * result 框的数据列表
   * attributeList 属性标签列表
   * resultString 包含图片信息的sae格式json
   * @param list {}[]
   * @returns
   */
  static formatCOCOData = (coco: ICocoData, inputList: any[], EToolName: any) => {
    const dataResult = coco?.annotations?.map((rect: ICocoAnnotations) => ({
      x: rect.bbox[0],
      y: rect.bbox[1],
      width: rect.bbox[2],
      height: rect.bbox[3],
      id: rect?.id,
      sourceID: "0",
      attribute:
        inputList?.find((item) => item?.key === rect.category.name)?.value ??
        rect.category.name,
    }));
    const attributeList = coco?.annotations?.reduce(
      (acc: string[], cur: ICocoAnnotations) => {
        let label = cur.category.name;
        const item = inputList?.find((item) => item?.key === cur.category.name);
        if (item) {
          label = item?.value;
        }
        if (!acc.includes(label)) {
          return [...acc, label];
        }
        return acc;
      },
      []
    );
    return {
      ...coco,
      result: dataResult,
      attributeList,
      imgInfo: { width: coco.width, height: coco.height },
      resultString: {
        width: coco?.width,
        height: coco?.height,
        valid: true,
        step_1: {
          dataSourceStep: 0,
          toolName: EToolName.RectLabel,
          result: dataResult,
        },
      },
    };
  };

  

  /**
   * sae string 数据格式 转 sae json 数据格式
   * 在sae string 数据基础上添加
   * result 框的数据列表
   * attributeList 属性标签列表
   * resultString 包含图片信息的sae格式json
   * @param list {}[]
   * @returns
   */
  static formatSAEData = (sae: any, inputList: any[], attributeExtra = "", EToolName: any) => {
    const result = commonUtils.jsonParser(sae);
    const resultList: any[] = [];
    Object.keys(cloneDeep(result)).map((key: string) => {
      if (key.startsWith("step")) {
        if (result[key]?.toolName === EToolName.Tag) {
          return;
        }
        // 拉框标签工具 转为拉框+属性标签显示
        if (result[key]?.toolName === EToolName.RectLabel) {
          resultList.push(
            ...result[key]?.result?.map((item) => ({
              ...item,
              toolName: result[key].toolName,
              attribute: `${this.getShowLabel(
                item.result,
                inputList
              )}${attributeExtra}`,
              thickness: 1,
              fill: "transparent",
            }))
          );
          return;
        }
        resultList.push(
          ...result[key]?.result.map((item) => ({
            ...item,
            toolName: result[key].toolName,
          }))
        );
      }
    });
    return {
      ...sae,
      attributeList: resultList?.reduce((acc, cur) => {
        if (!acc.includes(cur.attribute)) {
          return [...acc, cur.attribute];
        }
        return acc;
      }, []),
      imgInfo: { width: result.width, height: result.height },
      result: resultList,
      resultString: result,
    };
  };

  /**
   *  根据meta解析成imgInfo
   * @param meta
   */
  static formatMetaToImgInfo = (meta: any) => {
    return {
      width: meta?.imageWidth,
      height: meta?.imageHeight,
    };
  };
}
