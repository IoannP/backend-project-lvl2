const json = (array) => {
  const result = array.reduce((acc, { name, ...rest }) => ({ ...acc, [name]: rest }), {});
  return JSON.stringify(result);
};

export default json;
