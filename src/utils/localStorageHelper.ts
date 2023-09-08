export const ls = {
  get<T extends Record<string, any>>(key: string) {
    const dataFromLs = localStorage.getItem(key);
    if (!dataFromLs) return null;
    return JSON.parse(dataFromLs) as T;
  },
};

type App = {
  name: string;
};

const app = ls.get<App>("app");
