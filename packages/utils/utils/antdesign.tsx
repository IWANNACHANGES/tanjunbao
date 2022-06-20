import {
  Badge,
  BadgeProps,
  Form,
  FormItemProps,
  Modal,
  ModalFuncProps,
  Popconfirm,
  PopconfirmProps,
  Popover,
  PopoverProps,
  Spin,
  SpinProps,
  Tooltip,
  TooltipProps
} from "antd";
import cs from "classnames";
import styles from "./index.less";

export default class antdUtils {
  static isInvalidNumber = (value: any) => {
    const intValue = Number(value);
    if (typeof value === "undefined" || intValue < 0 || isNaN(intValue)) {
      return true;
    }
    return false;
  };

  static numberCheck = (value: any) => {
    if (this.isInvalidNumber(value)) {
      return Promise.reject("请输入一个大于0的数字");
    }
  };

  static isDecimal = (value: string) => {
    const decimal = value.split(".")[1];
    if (!decimal?.length || this.isInvalidNumber(value)) {
      return Promise.reject("请输入浮点数");
    }
  };

  static integerCheck = (value: any) => {
    const decimal = value.split(".")[1];
    if (decimal?.length > 0 || this.isInvalidNumber(value)) {
      return Promise.reject("请输入大于0的正整数");
    }
  };

  static decimalCheck = (value: any, decimalNum = 4) => {
    const intValue = Number(value);
    if (this.isInvalidNumber(value)) {
      return Promise.reject("请输入一个大于等于0的数字");
    }
    const decimal = intValue.toString().split(".")[1];
    if (decimal?.length > decimalNum) {
      let errorText = `请输入一个小数位数不超过${decimalNum}位数的数字`;
      if (decimalNum < 1) {
        errorText = `请输入一个正整数`;
      }
      return Promise.reject(errorText);
    }
    return Promise.resolve();
  };

  static commonModalConfirm = ({
    okCb,
    contentText = "",
    modalProps = {},
    isModal = true,
    footerCenter = false,
    border = true,
    containerPadding24 = false,
    type = "confirm",
  }: {
    okCb?: () => void | boolean | Promise<unknown>;
    contentText?: string;
    modalProps?: ModalFuncProps;
    isModal?: boolean;
    containerPadding24?: boolean;
    footerCenter?: boolean;
    border?: boolean;
    type?: "info" | "success" | "error" | "warn" | "warning" | "confirm";
  }) => {
    if (isModal) {
      Modal.destroyAll();
      Modal[type]({
        width: 400,
        okText: "确定",
        cancelText: "取消",
        autoFocusButton: null,
        centered: true,
        closable: true,
        icon: "",
        content: (
          <div
            style={{
              width: "100%",
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {contentText}
          </div>
        ),
        onOk: async () => {
          // 兼容promise方式 可以异步关闭
          if (okCb) {
            await okCb();
          }
          return Promise.resolve();
        },
        ...modalProps,
        okButtonProps: {
          style: { height: "32px", minWidth: "auto" },
          ...modalProps?.okButtonProps,
        },
        cancelButtonProps: {
          style: { height: "32px", minWidth: "auto" },
          ...modalProps?.cancelButtonProps,
        },
        className: cs(
          {
            [styles["modal-button-center"]]: footerCenter,
            [styles["no-border"]]: !border,
            [styles["container-padding-24"]]: containerPadding24,
            [styles["common-modal"]]: true,
          },
          modalProps?.className
        ),
      });
    } else {
      Modal.destroyAll();
      if (okCb) {
        okCb();
      }
    }
  };

  static renderBadge = (
    children: any,
    flag = false,
    badgeProps?: BadgeProps
  ) => {
    if (flag) {
      return <Badge {...badgeProps}>{children}</Badge>;
    } else {
      return children;
    }
  };

  static renderPopconfirm = (
    children: any,
    flag = false,
    popconfirmProps?: PopconfirmProps
  ) => {
    if (flag) {
      return <Popconfirm {...popconfirmProps}>{children}</Popconfirm>;
    } else {
      return children;
    }
  };

  static renderPopover = (
    children: any,
    flag = false,
    popoverProps?: PopoverProps
  ) => {
    if (flag) {
      return <Popover {...popoverProps}>{children}</Popover>;
    } else {
      return children;
    }
  };

  static renderTooltip = (
    children: any,
    flag = false,
    tooltipProps?: TooltipProps
  ) => {
    if (flag) {
      return <Tooltip {...tooltipProps}>{children}</Tooltip>;
    } else {
      return children;
    }
  };

  static renderTooltipColumns = (text: string, key: string) => {
    return {
      title: (
        <>
          {text}
          <Tooltip title={text} color="rgb(255,255,255)">
            ?
          </Tooltip>
        </>
      ),
      key: { key },
      dataIndex: { key },
      align: "center",
    };
  };

  static renderColumns = (text: string, key: string) => {
    return {
      title: { text },
      key: { key },
      dataIndex: { key },
      align: "center",
    };
  };

  static renderSpin = (children: any, flag = false, spinProps?: SpinProps) => {
    if (flag) {
      return <Spin {...spinProps}>{children}</Spin>;
    } else {
      return children;
    }
  };

  static renderFormItemStyle = ({
    children,
    label = "",
    labelProps = {},
    info,
    infoPosition = "center",
    infoTop,
    labelWidth,
    required = true,
  }: {
    children: any;
    label?: string | Element;
    labelProps?: FormItemProps;
    info?: any;
    infoPosition?: "top" | "center" | "bottom";
    infoTop?: string;
    labelWidth?: string;
    required?: boolean;
  }) => {
    const width = labelWidth ? labelWidth : 400;
    let top = "calc(50% - 12px)";
    switch (infoPosition) {
      case "top":
        top = "12px";
        break;
      case "bottom":
        top = "calc(100% - 12px)";
        break;
      case "center":
      default:
        top = "calc(50% - 12px)";
        break;
    }
    if (infoTop) {
      top = infoTop;
    }
    return (
      <Form.Item
        label={label}
        required={required}
        style={{ marginBottom: 0 }}
        {...labelProps}
      >
        <div style={{ position: "relative" }}>
          <span style={{ display: "inline-block", width, marginLeft: 24 }}>
            {children}
          </span>
          {info && (
            <span
              style={{
                marginLeft: 32,
                color: "#BDBDBD",
                fontSize: "12px",
                position: "absolute",
                top,
                transform: "translate(0 , -50%)",
              }}
            >
              {info}
            </span>
          )}
        </div>
      </Form.Item>
    );
  };
}
