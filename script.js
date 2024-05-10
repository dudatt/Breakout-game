var canvas = document.getElementById("canvas");
var desenho = canvas.getContext("2d");

var setaDireita = false;
var setaEsquerda = false;

var rebatedorAltura = 10;
var rebatedorLargura = 70;
var rebatedorX = (canvas.width - rebatedorLargura) / 2;

var bolaRadius = 15;
var bolaX = canvas.width / 2;
var bolaY = canvas.height - rebatedorAltura - bolaRadius;
var bolaDX = 6;
var bolaDY = -2;

var tijolosPorLinha = 5;
var tijolosPorColuna = 3;
var tijoloLargura = 75;
var tijoloAltura = 25;
var tijoloPadding = 10;
var tijoloOffsetTop = 30;
var tijoloOffsetLeft = 30;
var tijolos = [];

document.addEventListener("keydown", descerTecla);
document.addEventListener("keyup", subirTecla);

function descerTecla(tecla) {
    if (tecla.key == "Right" || tecla.key == "ArrowRight") {
        setaDireita = true;
    } else if (tecla.key == "Left" || tecla.key == "ArrowLeft") {
        setaEsquerda = true;
    }
}

function subirTecla(tecla) {
    if (tecla.key == "Right" || tecla.key == "ArrowRight") {
        setaDireita = false;
    } else if (tecla.key == "Left" || tecla.key == "ArrowLeft") {
        setaEsquerda = false;
    }
}

function desenharRebatedor() {
    desenho.beginPath();
    desenho.rect(rebatedorX, canvas.height - rebatedorAltura, rebatedorLargura, rebatedorAltura);
    desenho.fillStyle = "green";
    desenho.fill();
    desenho.closePath();
}

function desenharBola() {
    desenho.beginPath();
    desenho.arc(bolaX, bolaY, bolaRadius, 0, Math.PI * 2);
    desenho.fillStyle = "red";
    desenho.fill();
    desenho.closePath();
}

function desenhar() {
    desenho.clearRect(0, 0, canvas.width, canvas.height);
    desenharRebatedor();
    desenharBola();

    if (bolaX + bolaDX > canvas.width - bolaRadius || bolaX + bolaDX < bolaRadius) {
        bolaDX = - bolaDX;
    }

    if (bolaY + bolaDY < bolaRadius) {
        bolaDY = -bolaDY;
    } else if (bolaY + bolaDY > canvas.height - bolaRadius) {
        if (bolaX > rebatedorX && bolaX < rebatedorX + rebatedorLargura) {
            bolaDY = -bolaDY;
        } else {
            document.location.reload();
        }
    }

    if (setaDireita && rebatedorX < canvas.width - rebatedorLargura) {
        rebatedorX += 7;
    } else if (setaEsquerda && rebatedorX > 0) {
        rebatedorX -= 7;
    }

    bolaX += bolaDX;
    bolaY += bolaDY;

    requestAnimationFrame(desenhar);
}

desenhar();
