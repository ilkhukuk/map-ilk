// tipi anlaiz edip ona göre fonksiyonun çağrıldığı yere
// tipe denk gelen açıklamayı gönderme
export const detectType = (type) => {
  switch (type) {
    case 'park':
      return 'Park Yeri';
    case 'home':
      return 'Ev';
    case 'job':
      return 'İş Yeri';
    case 'goto':
      return 'Ziyaret';
    case 'school':
      return 'Okul';
    case 'shopping':
      return 'A 101';
    case 'hospital':
      return 'Doktor';
  }
};

export const setStorage = (data) => {
  // veriyi local'e göndermek için hazırlar
  const strData = JSON.stringify(data);

  // local stroage'ı günceller
  localStorage.setItem('notes', strData);
};

var carIcon = L.icon({
  iconUrl: './images/park.png',

  iconSize: [40, 55], // size of the icon
});

var homeIcon = L.icon({
  iconUrl: './images/home.png',

  iconSize: [40, 55], // size of the icon
});

var companyIcon = L.icon({
  iconUrl: './images/work.png',

  iconSize: [40, 55], // size of the icon
});

var vacationIcon = L.icon({
  iconUrl: './images/holiday.png',

  iconSize: [40, 55], // size of the icon

});

var shomeIcon = L.icon({
  iconUrl: './images/university-pin.png',

  iconSize: [40, 55], // size of the icon
});

var shopIcon = L.icon({
  iconUrl: './images/shop.png',

  iconSize: [40, 55], // size of the icon
});

var hosIcon = L.icon({
  iconUrl: './images/hospital.png',

  iconSize: [40, 55], // size of the icon
});



export function detectIcon(type) {
  switch (type) {
    case 'park':
      return carIcon;
    case 'home':
      return homeIcon;
    case 'job':
      return companyIcon;
    case 'goto':
      return vacationIcon;
    case 'school':
      return shomeIcon;
    case 'shopping':
      return shopIcon;
    case 'hospital':
      return hosIcon;
  }
}
