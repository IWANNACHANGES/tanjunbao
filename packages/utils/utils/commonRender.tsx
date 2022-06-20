export default class commonRender {
  static renderDetailItem = ({
    title,
    content,
    contentStyle,
  }: {
    title: string;
    content: { name?: string; value: any; key?: string }[];
    contentStyle?: any;
  }) => (
    <>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          padding: "4px 8px",
          marginBottom: 24,
          borderLeft: "4px solid #679AFF",
        }}
      >
        {title}
      </div>
      {content?.length > 0
        ? content?.map((item) => (
            <div
              style={{
                display: "flex",
                marginBottom: content?.length > 1 ? 24 : 0,
                ...contentStyle,
              }}
              key={item?.key}
            >
              {item?.name && (
                <>
                  <div
                    style={{
                      width: 128,
                      color: "#A1A1A1",
                      marginRight: 24,
                      padding: "4px 12px",
                      display: "flex",
                      alignItems: "start",
                    }}
                  >
                    {item?.name}
                  </div>
                </>
              )}
              {item?.value && (
                <>
                  <span
                    style={{
                      width: content?.length > 1 ? 200 : "auto",
                      flex: content?.length > 1 ? "" : 1,
                      color: "#4B4B4B",
                      padding: "4px 0",
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                    }}
                  >
                    {item?.value}
                  </span>
                </>
              )}
            </div>
          ))
        : content}
    </>
  );

  /**
   * 用户名样式
   * @param username
   * @returns
   */
  static getUsername = (username: string) => {
    try {
      const usernameList = username.split("@");
      return (
        <span>
          <span>{usernameList[0]}</span>
          <span style={{ color: "#F29B18" }}>@{usernameList[1]}</span>
        </span>
      );
    } catch (error) {
      return username;
    }
  };

  static renderImagesItem = ({
    title,
    content,
  }: {
    title: string;
    content: any;
  }) => (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 50,
            marginRight: 24,
            display: "flex",
            // alignItems: 'center',
          }}
        >
          {title}
        </div>
        <span
          style={{
            width: 186,
            wordWrap: "break-word",
          }}
        >
          {content}
        </span>
      </div>
    </>
  );
}
