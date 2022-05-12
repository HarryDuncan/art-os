export const useEvents = () => {};

export const ev = (eventName, data?, once = false) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
