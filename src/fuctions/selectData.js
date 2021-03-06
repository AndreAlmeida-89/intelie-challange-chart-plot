import getMetaData from "./getMetaData";
import getData from "./getData";
import getHours from "./getHours";

const selectData = (json) => {
  const data = getData(json);
  const metaData = getMetaData(json);

  let begin = {
    time: getHours(metaData.begin),
  };
  let end = {
    time: getHours(metaData.end),
  };
  let configs = [];
  data.forEach((element) => {
    if (element.timestamp === metaData.begin) {
      metaData.select.forEach((selectedData) => {
        const key = `${element.os} ${element.browser} ${selectedData}`;
        begin[key] = element[selectedData];
        configs.push(key)
      });
    }
    if (element.timestamp === metaData.end) {
      metaData.select.forEach((selectedData) => {
        const key = `${element.os} ${element.browser} ${selectedData}`;
        end[key] = element[selectedData];
      });
    }
  });

  return {begin: begin, end: end, configs: configs};
};

export default selectData;
