const NewsActiveDeactiveFormData = (value) => {
  const formData = new FormData();

  const item1 = value["id"];
  const item2 = value["isActive"];

  // console.log(item1);
  // console.log(item2);

  formData.append("Id", item1);
  formData.append("Active", item2);
  return formData;
};

export { NewsActiveDeactiveFormData };
