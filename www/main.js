///////////////////Main.js
///// o arquivo PRINCIPAL de javascript
///// sim
//////obs.: ARQUIVO CHAMADO NO PARENT APENAS

function getUrlParameter(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

//<script type="text/javascript" charset="utf-8" src="phonegap-1.0.0.js"></script>
var mainFrame = $('#mainFrame');
var PORTA_SIO = 11000;
var PORTA_ARQ = 10000;
var sIP = getUrlParameter('aceip'); 
var DEFAULT_URL = "http://" + sIP +":"+ PORTA_ARQ + "/controller";
var socket = undefined;



var socketIoImportado = function () {
    socket = io.connect("http://" + sIP + ":" + PORTA_SIO);
    //não sei se precisa da porta
    
    
   socket.on('reload', function (data) {
       reload(data);
   });
   
   socket.on('beep', function (data) {
       //iphone ignora as vezes. aliás ele ignora tudo
       //não tem beep nativo, vc tem que especificar o audio chamado beep.wav de até 30s
       //como não especifiquei nem vai funfar isso
       var vezes = data.vezes || 1;
       navigator.notification.beep(vezes);
   });
   
   socket.on('vibrate', function (data) {
       //iphone ignora o tempo
       var tempo = data.tempo || 500;
       navigator.notification.vibrate(tempo);
   });
}


socketIoImportado();
//$.getScript("http://" + sIP + ":" + PORTA_SIO + "/socket.io/socket.io.js", socketIoImportado);
//não sei se precisa da porta


//$.getScript("phonegap-1.0.0.js", function () {});
// vai pro child \/
//jquery.getScript("components/platform/platform.js", function(){});

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function getSocket() {
    return socket;
}

function getsIP(){
    if(typeof sIP === "undefined")
        sIP = getUrlParameter('aceip'); 
    return sIP;   
}

function onDeviceReady() {
    var networkState = navigator.network.connection.type;
    if (networkState != Connection.ETHERNET && networkState != Connection.WIFI) {
        navigator.notification.alert("Você não está conectado a nenhuma rede cabível", function(){});
        console.log('erro de rede');
    }
    console.log(networkState + " tipo de rede conectado");
}

function 
onPause() {
    console.log('pausou hehe');
    //alertar o server que pausou
    socket.emit('pause');
}

function onResume() {
    navigator.notification.alert("RESUME", function(){});
    console.log('resumou uhul');
    //alertar o server que resumou
    
    socket.emit('resume');
}

function reload(data){
   var url = null;
   if (data == null || typeof data === "undefined") url = DEFAULT_URL;
   
    var url = url || data.url;
    mainFrame.attr('src', url);
}





//document.addEventListener("online", onOnline, false);
//document.addEventListener("offline", onOffline, false);

//android only
//document.addEventListener("backbutton", yourCallbackFunction, false);
//document.addEventListener("menubutton", yourCallbackFunction, false);
//document.addEventListener("searchbutton", yourCallbackFunction, false);

//audio

//var media = new Media(src, mediaSuccess, [mediaError], [mediaStatus]);
