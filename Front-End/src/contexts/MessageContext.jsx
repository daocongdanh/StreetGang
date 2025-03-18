import React, { createContext, useContext, useCallback } from "react";
import { message } from "antd";

const MessageContext = createContext();
export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback(
    (type, content) => {
      messageApi.open({ type, content });
    },
    [messageApi]
  );

  const success = (content) => showMessage("success", content);
  const error = (content) => showMessage("error", content);
  const warning = (content) => showMessage("warning", content);

  return (
    <MessageContext.Provider value={{ success, error, warning }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
