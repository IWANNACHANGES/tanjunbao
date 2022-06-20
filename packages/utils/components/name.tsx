import { Form, FormItemProps, Input } from "antd";
import antdUtils from "../utils/antdesign";
import REGS from "../utils/regular";

interface IProps extends FormItemProps {
  formItemProps?: FormItemProps;
  inputProps?: FormItemProps;
  workspaceName?: string;
}

const Name = (props: IProps) => {
  const {
    formItemProps = {},
    inputProps = {},
    workspaceName = "space",
  } = props;

  return (
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: "请输入用户名称",
        },
        {
          validator: (_, value) => {
            if (!value) {
              return Promise.resolve();
            }
            if (!REGS.nameRegEn20.test(value)) {
              return Promise.reject(
                new Error("支持英文、数字、下划线，长度不得超过20个字符")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
      {...formItemProps}
    >
      <Input placeholder="请输入用户名称" addonAfter={`@${workspaceName}`} {...inputProps} />
    </Form.Item>
  );
};

export const renderName = ({
  label = "用户名称",
  info = "支持英文、数字、下划线，长度不得超过20个字符",
  formItemProps,
  workspaceName,
}: {
  label?: string;
  info?: string;
  workspaceName?: string;
  formItemProps?: FormItemProps;
}) =>
  antdUtils.renderFormItemStyle({
    children: (
      <Name formItemProps={formItemProps} workspaceName={workspaceName} />
    ),
    label,
    info,
  });

export default Name;
