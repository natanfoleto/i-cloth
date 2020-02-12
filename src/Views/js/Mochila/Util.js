// #region ========================= Funções =========================

function LoadPage(page) {
   window.location.replace('../../html/' + page + '.phtml');
}

function LoadPageInternal(div, folder, page) {
   $( "#" + div).empty();
   $("#" + div).load('../../html/' + folder + '/' + page + '.phtml');
}

function LoadCSS(folder, url) {
   var lnk = document.createElement('link');
   lnk.setAttribute('href', '../' + folder + '/' + url + '.css' );
   lnk.setAttribute('rel', "stylesheet" );
   document.getElementsByTagName("head").item(0).appendChild(lnk);
}

function limetedLength(element) {
   if (element.value.length > 10) {
      element.value = element.value.substr(0, 10);
   }
}
// #endregion ====================== Fim Funções ======================

// #region ==================== Variáveis de Controle =================
// #endregion ============= Fim | Variáveis de Controle ===============