function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function datosLocales() {
    var d = new Date();
    var dia = d.getDate();
    var mes = d.getMonth();
    var año = d.getFullYear();
    mes += 1;
    
    mes = FormatNumberLength(mes, 2);
    dia = FormatNumberLength(dia, 2);
    /*
    if (mes < 10)
        mes = "0" + mes;
        */

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


    var OSName = "Otro";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1)
        OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
        OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
        OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
        OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
        OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
        OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1)
        OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1)
        OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1)
        OSName = "Linux";
    if (window.navigator.userAgent.indexOf("Android 3.0") != -1)
        OSName = "Honeycomb Sandwich Android";
    if (window.navigator.userAgent.indexOf("Android 4.0") != -1)
        OSName = "Ice Cream Sandwich Android";
    if (window.navigator.userAgent.indexOf("Android 5.0") != -1)
        OSName = "Lollipop Android";
    if (window.navigator.userAgent.indexOf("Android 6.0") != -1)
        OSName = "Marshmallow Android";
    if (window.navigator.userAgent.indexOf("Android 7.0") != -1)
        OSName = "Nougat Android";
    if (window.navigator.userAgent.indexOf("Android 8.0") != -1)
        OSName = "Oreo Android";


    document.getElementById("fecha").value = fecha;
    document.getElementById("so").value = OSName;
    document.getElementById("nav").value = navegador;
}




