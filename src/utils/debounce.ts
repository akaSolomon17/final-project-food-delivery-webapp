
export const debounce = (func: (value:string) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null;
  return (value: string, ...args: []) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(value, ...args);
    }, delay);
  };
}

