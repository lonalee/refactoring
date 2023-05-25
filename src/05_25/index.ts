const main = () => {
  const organization = { name: '애크미 구스베리', country: 'GB' }; // 레코드 예시
  const something = new Organization(organization);

  // 인스턴스 만들기와는 별도로 organization을 캡슐화 해보자

  console.log(organization.name); // 캡슐화 이전에 데이터 참조 방법이다.

  const getRawDataOfOrganization = () => {
    return organization;
  }; // 캡슐화하였다. 데이터를 참조하려면..

  console.log(getRawDataOfOrganization().name);

  // 레코드를 캡슐화하는 목적은 레코드 자체를 통제 (레코드를 조작하는 방식까지 포함해서 통제.)하기 위함

  const organizationInstance = new Organization2({ organization });
  const getRawDataOfOrganization2 = () => organizationInstance._data;

  const getOrganization = () => organizationInstance;

  return something;
};

class Organization2 {
  constructor(data) {
    this._data = data;
  }
}

class Organization {
  _name = '';
  _country = '';
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }

  get country() {
    return this._country;
  }
  set country(arg) {
    this._country = arg;
  }
}

export { main };
