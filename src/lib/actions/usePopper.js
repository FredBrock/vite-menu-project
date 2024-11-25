

const defaultConfig = {
  placement: "left", // 提示框在上方
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 16], // 调整偏移量
      },
    },
    { name: "arrow" },
  ],
};
export const usePopper = (reference, popperEl, opts = {}) => {
  return {
    destroy() {},
  };
};
