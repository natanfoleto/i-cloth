// #region ========================= Funções =========================

function LoadPage(page) {
   window.location.replace('../../html/' + page + '.phtml');
}

function LoadCSS(url) {
   var lnk = document.createElement('link');
   lnk.setAttribute('type', "text/css" );
   lnk.setAttribute('rel', "stylesheet" );
   lnk.setAttribute('href', './assets/css/' + url + '.css' );
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