import { useState, useEffect } from "react";

const useStorage = (key, initValue) => {
  const [data, setData] = useState(initValue);
  const saveData = item => {
    setData(item);
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      localStorage.setItem(key, `${item}`);
    }
  };

  useEffect(() => {
    const loadData = () => {
      const json = localStorage.getItem(key);
      try {
        setData(JSON.parse(json) || initValue);
      } catch (e) {
        setData(json || initValue);
      }
      console.log("loadData", data);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [data, saveData];
};

export default useStorage;
