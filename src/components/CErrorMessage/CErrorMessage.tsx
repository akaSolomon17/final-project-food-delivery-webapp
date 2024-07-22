import { FC } from "react";

interface IErrorMessageProps {
  message?: string;
}

const CErrorMessage: FC<IErrorMessageProps> = ({ message }) => {
  return message ? (
    <span className="text-danger text-sm ms-2">{message}</span>
  ) : null;
};

export default CErrorMessage;
