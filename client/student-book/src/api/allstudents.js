//Разбиение массива на подмассивы по id
function createPairs_arr(arr) {
  let tmp = new Set();
  for (let index = 0; index < arr.length; index++) {
    tmp.add(arr[index]["id"]);
  }
  let allId = [...tmp];
  let result = {};
  for (let el of allId) {
    result[`${el}`] = [];
  }
  for (let index = 0; index < arr.length; index++) {
    for (let id of allId) {
      if (arr[index]["id"] === id) {
        result[`${id}`].push(arr[index]);
      }
    }
  }
  return result;
}

//Обновление записей в подмассивах в соответствии с записями по предметам
function filterPairds(arr, subjects) {
  let result = [];
  for (let key in arr) {
    if (arr[`${key}`].length === 1) {
      result.push(...arr[`${key}`]);
    } else {
        result.push(middlefilter(arr[`${key}`]));
    }
  }
  return result;
}

// initArray = начальный массив данных
function middlefilter (initArray) {
  let newArrData = initArray[0];
  for (let index = 0; index < initArray.length; index++) {
    Object.keys(newArrData).forEach((el, i, arr) => {
      if (
        Object.values(newArrData)[i] !== Object.values(initArray[index])[i] &&
        Object.values(newArrData)[i] === "-"
      ) {
        newArrData = {
          ...newArrData,
          [Object.keys(newArrData)[i]]: Object.values(initArray[index])[i],
        };
      }
    });
  }
  return newArrData;
};
export default { createPairs_arr, filterPairds };
