const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.height = 400;
ctx.canvas.width = 1220;


let level = 1;
let engelSayisi = level;
const engel = [];

const daire = {

  jumping: true,
  x: 0,
  yatayHiz: 0,
  y: 0,
  dikeyHiz: 0

};

const yeniBolum = () => {

  level++;

  for (let i = 0; i < engelSayisi; i++) {
    eksenX = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    engel.push(eksenX);
  }

}

const oyuncu = {
  yukari: false,
  sag: false,
  sol: false,

  yonTus: function (event) {

    let yon = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:
        oyuncu.sol = yon;
        break;
      case 38:
        oyuncu.yukari = yon;
        break;
      case 39:
        oyuncu.sag = yon;
        break;

    }

  }

};

const sonsuz = function () {

  if (oyuncu.yukari && daire.jumping == false) {

    daire.dikeyHiz -= 30;
    daire.jumping = true;

  }

  oyuncu.sol ? daire.yatayHiz -= 0.5 : daire.yatayHiz += 0.5;

  daire.dikeyHiz += 0.5;
  daire.x += daire.yatayHiz;
  daire.y += daire.dikeyHiz;
  daire.yatayHiz *= 0.8;
  daire.dikeyHiz *= 0.8;


  if (daire.y > 386 - 16 - 32) {

    daire.jumping = false;
    daire.y = 386 - 16 - 32;
    daire.dikeyHiz = 0;

  }
  daire.x < -10 ? daire.x = 1200 : daire.x > 1200 ? (daire.x = -10, yeniBolum()) :

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1220, 400);

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(daire.x, daire.y, 20, 0, Math.PI * 2, false);
  ctx.fill();


  const height = 200 * Math.cos(Math.PI / 6);

  ctx.fillStyle = "yellow";
  engel.forEach((eksenX) => {
    ctx.beginPath();

    ctx.moveTo(eksenX, 385);
    ctx.lineTo(eksenX + 20, 385);
    ctx.lineTo(eksenX + 10, 510 - height);

    ctx.closePath();
    ctx.fill();

  })


  ctx.strokeStyle = "#000cff";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 385);
  ctx.lineTo(1220, 385);
  ctx.stroke();

  window.requestAnimationFrame(sonsuz);
};
window.alert("BAŞARILAR" + " \n " + "YÖN TUŞLARI İLE OYNAYINIZ");

window.addEventListener("keydown", oyuncu.yonTus)
window.addEventListener("keyup", oyuncu.yonTus);
window.requestAnimationFrame(sonsuz);
