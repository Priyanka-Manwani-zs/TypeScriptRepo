import React, { useEffect, useState } from "react";

const useImgaes = (url: string) => {
  const [data, setData] = useState<{ src: string; alt: string; id: Number }[]>(
    []
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const [err, setErr] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(url);
        const res = await data.json();
        setData(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };

    fetchData();
  }, []);

  return { data, err, loading };
};

export default useImgaes;
