import { useMemo } from "react";
import { Key } from "react";

const useSelectedValue = (selectedKeys: string | Set<Key> | Selection) => {
  return useMemo(() => {
    if (selectedKeys instanceof Set) {
      return Array.from(selectedKeys).join(", ").split("_").join(" ");
    }
    return selectedKeys.toString().split("_").join(" ");
  }, [selectedKeys]);
};

export default useSelectedValue;
