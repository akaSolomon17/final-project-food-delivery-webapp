import { FC } from "react";
import { CCheckoutLayoutProps } from "../../types/checkout.type";
import { Divider } from "@nextui-org/react";

const CCheckoutLayout: FC<CCheckoutLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className="min-w-[624px] w-[624px] h-fit bg-white mt-[10px] mb-[30px] mx-auto rounded-md">
      <h2 className="font-semibold text-xl p-4">{header}</h2>
      <Divider />
      {children}
      {footer && (
        <div className="flex justify-between p-5 text-sm">{footer}</div>
      )}
    </div>
  );
};

export default CCheckoutLayout;
