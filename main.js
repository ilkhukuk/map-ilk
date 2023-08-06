import { detectType, setStorage, detectIcon } from './helpers.js';

//! html'den gelenler
const form = document.querySelector('form');
const list = document.querySelector('ul');

//! olat izleyicileri
form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleClick);

//! ortak kullanımı alanı (global değiken tanımalama)
var map;
var notes = JSON.parse(localStorage.getItem('notes')) || [];
var coords = [];
var layerGroup = [];

//! kullanıcnın konumunu öğrenme
navigator.geolocation.getCurrentPosition(
  loadMap,
  console.log('Konum Bulunamadı')
);

// haritaya tıklanınca çalışan fonk.
function onMapClick(e) {
  form.style.display = 'flex';
  coords = [e.latlng.lat, e.latlng.lng];
}

//! kullanıcnın konumuna göre ekrana haritayı basma
function loadMap(e) {
  // harita kurulumu
  map = L.map('map').setView(
    [e.coords.latitude, e.coords.longitude],
    14
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  // locasyon seçimi
  layerGroup = L.layerGroup().addTo(map);

  renderNoteList(notes);

  map.on('click', onMapClick);
}

// ! İMLEÇ KISMI
function renderMarker(item) {

  L.marker(item.coords, { icon: detectIcon(item.status) })
    .addTo(layerGroup)
    .bindPopup(` ${item.desc}`);
}

// form olayında çalışır
function handleSubmit(e) {
  e.preventDefault();

  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  // notlar
  notes.push({
    id: new Date().getTime(),
    desc,
    date,
    status,
    coords,
  });

  setStorage(notes);
  renderNoteList(notes);
  form.style.display = 'none';
}

// ! Notları basma fonksiyonu
function renderNoteList(items) {
  list.innerHTML = '';
  layerGroup.clearLayers();
  items.forEach((item) => {
    const listEle = document.createElement('li');
    listEle.dataset.id = item.id;
    listEle.innerHTML = `
           <div>
              <p>${item.desc}</p>
              <p><span>Tarih:</span> ${item.date}</p>
              <p><span>Durum:</span> ${detectType(item.status)}</p>
            </div>
            <i id="fly" class="fa-solid fa-location-crosshairs"></i>
            <i id="delete" class="bi bi-trash3-fill"></i>
    `;

    // htmldeki listeye elemanı ekleme - AMA ARDARDA EKLENECEĞİNDEN BU YÖNTEM KULLANILIR
    list.insertAdjacentElement('afterbegin', listEle);

    renderMarker(item);
  });
}

function handleClick(e) {
  const id = e.target.parentElement.dataset.id;
  if (e.target.id === 'delete') {
    notes = notes.filter((note) => note.id != id); //burada silme yok aslında sadece silmek istediğimizin id si dışındakileri filtre ediyoruz
    setStorage(notes);

    // güncelle
    renderNoteList(notes);
  }

  if (e.target.id === 'fly') {
    const note = notes.find((note) => note.id == id);

    map.flyTo(note.coords);
  }
}
