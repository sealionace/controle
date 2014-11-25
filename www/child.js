var j_query = document.createElement("script");
jsPai.type = "text/javascript";
jsPai.src = "jquery-2.1.1.min.js";
document.body.appendChild(j_query);

//se importa o javascript do pai para pegar a conexao (Socket)
var jsPai = document.createElement("script");
jsPai.type = "text/javascript";
jsPai.src = "main.js";
document.body.appendChild(jsPai);


var socket = parent.getSocket();


