
function datosLocales(){
var d = new Date();
var dia = d.getDate();
var mes = d.getMonth();
var año = d.getFullYear();
mes += 1;
if (mes < 10)mes = "0" + mes;

var fecha = dia + "/" + mes + "/" + año;

var OSName = "Desconocido";
if (navigator.appVersion.indexOf("Win") !== -1) {
    OSName = "Windows";
} else if (navigator.appVersion.indexOf("Mac") !== -1) {
    OSName = "MacOS";
} else if (navigator.appVersion.indexOf("Linux") !== -1) {
    OSName = "Linux";
} else if (navigator.appVersion.indexOf("Android") !== -1) {
    OSName = "Android";
} else {
    OSName = "Otros";
}
var navegador = "";
if (navigator.userAgent.search("Chrome") >= 0) {
    navegador = "Chrome";
}
if (navigator.userAgent.search("Firefox") >= 0) {
    navegador = "Firefox";
}
if (navigator.userAgent.search("MSIE") >= 0) {
    navegador = "Internet Explorer";
}
if (navigator.userAgent.search("Opera") >= 0) {
    navegador = "Opera";
}
if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    navegador = "Safari";
}
document.forms['reg']['fecha'].value = "Fecha     "+fecha; 
document.forms['reg']['so'].value = "Sistema Operativo   "+OSName ;
document.forms['reg']['nav'].value ="Navegador     "+navegador;
}




