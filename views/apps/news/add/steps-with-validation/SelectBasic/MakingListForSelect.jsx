const MakingListForSelect = (arr, id, propName) => {
  const sampleArr = [];
  arr.map((items) => {
    const SampleObj = { value: items[id], label: items[propName] };
    sampleArr.push(SampleObj);
  });
  return sampleArr;
};

export { MakingListForSelect };
