import { useEffect, useState } from 'react';

interface MyData {
  // Define the structure of your JSON data here
  // For example:
  id: number;
  name: string;
  // ...
}

export const useJsonFileReader = (filePath: string) => {
  const [data, setData] = useState<MyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error('Failed to fetch JSON file');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filePath]);

  return data;
};
