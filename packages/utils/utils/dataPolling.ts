import { Polling } from "./polling";

/**
 * 数据集列表 标注任务列表 处理任务列表 轮询集成
 */
export class DataPolling extends Polling {
  constructor() {
    super();
  }

  public getPromiseParamsList = (dataSource: any[]): any[] => {
    return [];
  };

  public pollingResult = ({
    result,
    dataSource,
    promiseParamsList,
    setDataSource,
    api,
  }: {
    result: any;
    dataSource: any[];
    promiseParamsList: any[];
    setDataSource: (newDataSource: any) => void;
    api: (data: any) => Promise<any>;
  }): boolean => {
    const resultList: any[] = result.map((item: any) => {
      return {
        ...item?.value?.dataset,
        ...item?.value,
        key: item?.value?.id,
        id: item?.value?.list[0]?.id,
      };
    });
    const newDataSource = JSON.parse(JSON.stringify(dataSource)).map((item) => {
      const resultListItem = resultList?.find((v: any) => v.id === item?.id);
      if (resultListItem) {
        return {
          ...item,
          ...resultListItem.list[0],
          statusProgress: resultListItem.list[0].statusProgress
            ? resultListItem.list[0].statusProgress
            : null,
        };
      } else {
        return item;
      }
    });
    setDataSource(newDataSource);
    const newPromiseParamsList = this.getPromiseParamsList(newDataSource);

    if (newPromiseParamsList?.length !== promiseParamsList?.length) {
      this.startDataPolling({
        promiseParamsList: newPromiseParamsList,
        dataSource: newDataSource,
        setDataSource,
        api,
      });
      return true;
    }
    return false;
  };

  public startDataPolling = ({
    promiseParamsList,
    dataSource,
    setDataSource,
    api,
    getPromiseParamsList,
  }: {
    setDataSource: (newDataSource: any) => void;
    promiseParamsList?: any[];
    dataSource: any[];
    api: (data: any) => Promise<any>;
    getPromiseParamsList?: (dataSource: any[]) => any[];
  }) => {
    let promiseParamsLists = promiseParamsList ?? [];
    if (getPromiseParamsList) {
      this.getPromiseParamsList = getPromiseParamsList;
      promiseParamsLists = getPromiseParamsList(dataSource);
    }
    this.cancel();
    this.startPolling(
      () => Promise.allSettled(promiseParamsLists.map(api)),
      (result: any) => {
        return this.pollingResult({
          result,
          dataSource,
          promiseParamsList: promiseParamsLists,
          setDataSource,
          api,
        });
      },
      10 * 60 * 1000,
      1000 * 10
    );
  };
}
export default new DataPolling();
