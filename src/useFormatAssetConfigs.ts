import { useJsonFileReader } from './useJsonFileReader';

export const useFormatAssetConfigs = () => {
  const json = useJsonFileReader('/file_info.json');
  const images = getJpgItems(json);
};

interface Item {
  name: string;
  type: string;
  size: number;
  created: string;
}

interface Folder {
  [key: string]: Folder | Item;
}

const getJpgItems = (folder): Item[] => {
  const jpgItems: Item[] = [];

  const traverseFolder = folder => {
    for (const key in folder) {
      const item = folder[key];
      if (item && typeof item === 'object') {
        if ('type' in item && item.type === '.jpg') {
          jpgItems.push(item as Item);
        } else {
          traverseFolder(item as Folder);
        }
      }
    }
  };

  traverseFolder(folder);

  return jpgItems;
};
