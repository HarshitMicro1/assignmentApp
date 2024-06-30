import Page1 from '../API/CONTENTLISTINGPAGE-PAGE1.json';
import Page2 from '../API/CONTENTLISTINGPAGE-PAGE2.json';
import Page3 from '../API/CONTENTLISTINGPAGE-PAGE3.json';

const images = {
  'poster1.jpg': require('../Slices/poster1.jpg'),
  'poster2.jpg': require('../Slices/poster2.jpg'),
  'poster3.jpg': require('../Slices/poster3.jpg'),
  'poster4.jpg': require('../Slices/poster4.jpg'),
  'poster5.jpg': require('../Slices/poster5.jpg'),
  'poster6.jpg': require('../Slices/poster6.jpg'),
  'poster7.jpg': require('../Slices/poster7.jpg'),
  'poster8.jpg': require('../Slices/poster8.jpg'),
  'poster9.jpg': require('../Slices/poster9.jpg'),
  'placeholder_for_missing_posters.png': require('../Slices/placeholder_for_missing_posters.png'),
};

export const getImage = (imageName: string) => {
  return images[imageName] || images['placeholder_for_missing_posters.png'];
};

export const getData = async (pageNum: number) => {
  let response;
  switch (pageNum) {
    case 1:
      response = Page1;
      break;
    case 2:
      response = Page2;
      break;
    case 3:
      response = Page3;
      break;
    default:
      response = Page1;
      break;
  }

  // Simulate delay for better demonstration of loading indicator
  await new Promise(resolve => setTimeout(resolve, 100));
  const res = response;
  return res;
};

export const backIcon = require('../Slices/Back.png');
export const searchIcon = require('../Slices/search.png');
export const crossIcon = require('../Slices/crossIcon.png');
export const searchHeader = require('../Slices/nav_bar.png');
