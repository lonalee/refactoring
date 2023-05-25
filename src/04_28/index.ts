const main = () => {
  const getDefaultOwner = () => {
    return defaultOwner;
  };
  const setDefaultOwner = (arg) => {
    return (defaultOwner = arg);
  };

  let defaultOwner = { firstName: 'YA', lastName: 'Lee' };

  // const result = defaultOwner;
  const result = getDefaultOwner();

  // defaultOwner = {firstName: 'YA2', lastName: 'Lee2'} // 데이터 수정을 함수를 이용해서 수행
  setDefaultOwner({ firstName: 'YA2', lastName: 'Lee2' });

  console.log('2', defaultOwner);

  return defaultOwner;
};

export { main };

// ---------------------------------------------------------------------
let defaultOwnerData = { firstName: 'YA', lastName: 'Lee' };
export function defaultOwnerF() {
  return defaultOwnerData;
}

export function setDefaultOwnerData(params: {
  firstName: string;
  lastName: string;
}) {
  defaultOwnerData = params;
}
