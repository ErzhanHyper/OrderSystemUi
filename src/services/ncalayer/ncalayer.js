require('../jquery.blockui.min.js');


var webSocket = new WebSocket('wss://127.0.0.1:13579/');
var callback = null;
var pem = null;
var pemm = null;

function blockScreen() {
    $.blockUI({
        message: 'Подождите, выполняется операция в NCALayer...',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function openDialog() {
    if (confirm("Ошибка при подключении к NCALayer. Запустите NCALayer и нажмите ОК") === true) {
        location.reload();
    }
}

function unblockScreen() {
    $.unblockUI();
}

webSocket.onopen = function(event) {
    console.log("Connection opened");
};

webSocket.onclose = function(event) {
    if (event.wasClean) {
        console.log('connection has been closed');
    } else {
        console.log('Connection error');
        openDialog();
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

webSocket.onmessage = function(event) {
    var result = JSON.parse(event.data);

    if (result != null) {
      if(result.responseObject){
        pem = result.responseObject.pem;
        localStorage.setItem('auth', JSON.stringify(pem));
        console.log(pem);
      }
        var rw = {
            code: result['code'],
            message: result['message'],
            responseObject: result['responseObject'],
            getResult: function() {
                return this.result;
            },
            getMessage: function() {
                return this.message;
            },
            getResponseObject: function() {
                return this.responseObject;
            },
            getCode: function() {
                return this.code;
            }
        };
        if (callback != null) {
            // window[callback](rw);
            getActiveTokensBack(rw);
        }
    }

    // console.log(event);
};

function getActiveTokens(callBack) {
    var getActiveTokens = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getActiveTokens"
    };
    callback = callBack;
    webSocket.send(JSON.stringify(getActiveTokens));
}

function getKeyInfo(storageName, callBack) {
    var getKeyInfo = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getKeyInfo",
        "args": [storageName]
    };
    callback = callBack;

    pemm = JSON.stringify(getKeyInfo);
    webSocket.send(JSON.stringify(getKeyInfo));
}

function signXml(storageName, keyType, xmlToSign, callBack) {
    var signXml = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "signXml",
        "args": [storageName, keyType, xmlToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXml));
}

function signXmls(storageName, keyType, xmlsToSign, callBack) {
    var signXmls = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "signXmls",
        "args": [storageName, keyType, xmlsToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXmls));
}

function createCAdESFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCAdESFromFile = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromFile));
}

function createCAdESFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCAdESFromBase64 = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64));
}

function createCAdESFromBase64Hash(storageName, keyType, base64ToSign, callBack) {
    var createCAdESFromBase64Hash = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64Hash",
        "args": [storageName, keyType, base64ToSign]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64Hash));
}

function applyCAdEST(storageName, keyType, cmsForTS, callBack) {
    var applyCAdEST = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "applyCAdEST",
        "args": [storageName, keyType, cmsForTS]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(applyCAdEST));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
    var showFileChooser = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "showFileChooser",
        "args": [fileExtension, currentDirectory]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(showFileChooser));
}

function changeLocale(language) {
    var changeLocale = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "changeLocale",
        "args": [language]
    };
    callback = null;
    webSocket.send(JSON.stringify(changeLocale));
}

function createCMSSignatureFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCMSSignatureFromFile = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromFile));
}

function createCMSSignatureFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCMSSignatureFromBase64 = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromBase64));
}

function getActiveTokensCall() {
  // blockScreen();
  getActiveTokens("getActiveTokensBack");
}

function getActiveTokensBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelect').empty();
      $('#storageSelect').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelect').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}



var secureme = function secureMe() {
  console.log('secure me');
  blockScreen();
  var selectedStorage = $('#storageSelect').val();
  getKeyInfo(selectedStorage, "secureMeBack");
}

function secureMeBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      // var pem = res['pem'];
      // $("#pem").val(pem);
      // $("form#signIn").submit();
  }
}

// редактирование товара
function getActiveTokensCallEditGood() {
  blockScreen();
  getActiveTokens("getActiveTokensBackEditGood");
}

function getActiveTokensBackEditGood(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectEditGood').empty();
      $('#storageSelectEditGood').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectEditGood').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// аннулирование товара
function getActiveTokensCallAnnulGoods() {
  blockScreen();
  getActiveTokens("getActiveTokensBackAnnulGoods");
}

function getActiveTokensBackAnnulGoods(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectAnnulGoods').empty();
      $('#storageSelectAnnulGoods').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectAnnulGoods').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// Удаление товара
function getActiveTokensCallDeleteGood() {
  blockScreen();
  getActiveTokens("getActiveTokensBackDeleteGood");
}

function getActiveTokensBackDeleteGood(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectDeleteGood').empty();
      $('#storageSelectDeleteGood').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectDeleteGood').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// Добавление товара
function getActiveTokensCallAddGood() {
  blockScreen();
  getActiveTokens("getActiveTokensBackAddGood");
}

function getActiveTokensBackAddGood(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectAddGood').empty();
      $('#storageSelectAddGood').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectAddGood').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// аннулирование ТС
function getActiveTokensCallAnnulCar() {
  blockScreen();
  getActiveTokens("getActiveTokensBackAnnulCar");
}

function getActiveTokensBackAnnulCar(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectAnnulCar').empty();
      $('#storageSelectAnnulCar').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectAnnulCar').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// Редактирование ТС
function getActiveTokensCallEditCar() {
  blockScreen();
  getActiveTokens("getActiveTokensBackEditCar");
}

function getActiveTokensBackEditCar(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectEditCar').empty();
      $('#storageSelectEditCar').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectEditCar').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

// Заявки на корректирование
function signCorrectionRequest() {
  //var selectedStorage = 'PKCS12';
  var selectedStorage = $('#storageSelect').val();
  var flag = false;
  var profileHash = $("#profileHash").val();
  var correctionRequestUser = $("#correctionRequestUser").val();
  var correctionAcceptFile = $("#correctionAcceptFile").val();
  var correctionRequestComment = $("#correctionRequestComment").val();

  if (correctionRequestUser == 'moderator') {
      if (profileHash !== null && profileHash !== "" && correctionRequestComment !== "" && correctionAcceptFile !== "") {
          $.blockUI();
          createCAdESFromBase64(selectedStorage, "SIGNATURE", profileHash, flag, "signCorrectionRequestBack");
      } else {
          alert(
              'Убедитесь что вы верно заполнили все поля \n\n' +
              '\ 1. Оставьте комментарий  \n' +
              '\ 2. Загрузите файл  \n' +
              '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
              '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
          );
      }
  } else {
      if (profileHash !== null && profileHash !== "" && correctionRequestComment !== "") {
          $.blockUI();
          createCAdESFromBase64(selectedStorage, "SIGNATURE", profileHash, flag, "signCorrectionRequestBack");
      } else {
          alert(
              'Убедитесь что вы верно заполнили все поля \n\n' +
              '\ 1. Оставьте комментарий  \n' +
              '\ 2. Выберите данных для подписи(ЭЦП)\n\n' +
              '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
          );
      }
  }
}

function signCorrectionRequestBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#profileSign").val(res);
      $("form#formCorrectionRequestSign").submit();
  }
}

// Подписать заявление(Клиент в Order_View)
function getActiveTokensCallSignApp() {
  blockScreen();
  getActiveTokens("getActiveTokensBackSignApp");
}

function getActiveTokensBackSignApp(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var listOfTokens = result['responseObject'];
      $('#storageSelectSignApp').empty();
      $('#storageSelectSignApp').append('<option value="PKCS12">Файл</option>');
      for (var i = 0; i < listOfTokens.length; i++) {
          $('#storageSelectSignApp').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
      }
  }
}

function signFund(type) {
  //var selectedStorage = 'PKCS12';
  var flag = false;
  var fundHash = $("#fundHash").val();
  $("#orderType").val(type);
  var selectedStorage = $('#storageSelect').val();
  if (fundHash !== null && fundHash !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorage, "SIGNATURE", fundHash, flag, "signFundBack");
  } else {
      alert("Нет данных для подписи!");
  }
}

function signFundBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#fundSign").val(res);
      $("form#formFund").submit();
  }
}

function signApplication() {
  //var selectedStorage = 'PKCS12';
  var selectedStorage = $('#storageSelectSignApp').val();
  var flag = false;
  var profileHash = $("#profileHash").val();
  if (profileHash !== null && profileHash !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorage, "SIGNATURE", profileHash, flag, "signApplicationBack");
  } else {
      alert("Нет данных для подписи!");
  }
}

function signAnnulGoods() {
  //var selectedStorage = 'PKCS12';
  var flag = false;
  var annulGoodHash = $("#annulGoodHash").val();
  var annulGoodComment = $("#annulGoodComment").val();
  var annulGoodFile = $("#annulGoodFile").val();
  var selectedStorageAnnulGoods = $('#storageSelectAnnulGoods').val();
  if (annulGoodHash !== null && annulGoodHash !== "" && annulGoodComment !== "" && annulGoodFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageAnnulGoods, "SIGNATURE", annulGoodHash, flag, "signAnnulGoodsBack");
  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signAnnulGoodsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#annulGoodSign").val(res);
      $("form#annulGoodForm").submit();
  }
}

function signAddGoods() {
  //var selectedStorage = 'PKCS12';
  var flag = false;
  var addGoodHash = $("#addGoodHash").val();
  var addGoodComment = $("#addGoodComment").val();
  var addGoodFile = $("#addGoodFile").val();
  var selectedStorageAddGood = $('#storageSelectAddGood').val();
  if (addGoodHash !== null && addGoodHash !== "" && addGoodComment !== "" && addGoodFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageAddGood, "SIGNATURE", addGoodHash, flag, "signAddGoodsBack");
  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signAddGoodsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#addGoodSign").val(res);
      $("form#addGoodForm").submit();
  }
}

function signEditGoods() {
  //var selectedStorage = 'PKCS12';
  var flag = false;
  var EditGoodHash = $("#EditGoodHash").val();
  var EditGoodComment = $("#EditGoodComment").val();
  var EditGoodFile = $("#EditGoodFile").val();
  var selectedStorageEditGood = $('#storageSelectEditGood').val();
  if (EditGoodHash !== null && EditGoodHash !== "" && EditGoodComment !== "" && EditGoodFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageEditGood, "SIGNATURE", EditGoodHash, flag, "signEditGoodsBack");

  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signEditGoodsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#EditGoodSign").val(res);
      $("form#editGoodForm").submit();
  }
}

function signDeleteGoods() {
  // var selectedStorage = 'PKCS12';
  var flag = false;
  var deleteGoodHash = $("#deleteGoodHash").val();
  var deleteGoodComment = $("#deleteGoodComment").val();
  var deleteGoodFile = $("#deleteGoodFile").val();
  var selectedStorageDeleteGood = $('#storageSelectDeleteGood').val();
  if (deleteGoodHash !== null && deleteGoodHash !== "" && deleteGoodComment !== "" && deleteGoodFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageDeleteGood, "SIGNATURE", deleteGoodHash, flag, "signDeleteGoodsBack");
  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signDeleteGoodsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#deleteGoodSign").val(res);
      $("form#deleteGoodForm").submit();
  }
}

function signEditCars() {
  // var selectedStorage = 'PKCS12';
  var flag = false;
  var EditCarHash = $("#EditCarHash").val();
  var EditCarComment = $("#EditCarComment").val();
  var EditCarFile = $("#EditCarFile").val();
  var selectedStorageEditCar = $('#storageSelectEditCar').val();
  if (EditCarHash !== null && EditCarHash !== "" && EditCarComment !== "" && EditCarFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageEditCar, "SIGNATURE", EditCarHash, flag, "signEditCarsBack");
  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signEditCarsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#EditCarSign").val(res);
      $("form#editCarForm").submit();
  }
}

function signAnnulCars() {
  // var selectedStorage = 'PKCS12';
  var flag = false;
  var annulCarHash = $("#annulCarHash").val();
  var annulCarComment = $("#annulCarComment").val();
  var annulCarFile = $("#annulCarFile").val();
  var selectedStorageAnnulCar = $('#storageSelectAnnulCar').val();
  if (annulCarHash !== null && annulCarHash !== "" && annulCarComment !== "" && annulCarFile !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorageAnnulCar, "SIGNATURE", annulCarHash, flag, "signAnnulCarsBack");
  } else {
      alert(
          'Убедитесь что вы верно заполнили все поля \n\n' +
          '\ 1. Оставьте комментарий  \n' +
          '\ 2. Загрузите документ \n' +
          '\ 3. Выберите данных для подписи(ЭЦП)\n\n' +
          '▬▬▬▬▬▬▬▬▬ Оператор РОП ▬▬▬▬▬▬▬▬▬\n\n'
      );
  }
}

function signAnnulCarsBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#annulCarSign").val(res);
      $("form#annulCarForm").submit();
  }
}

function signApplicationBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#profileSign").val(res);
      $("form#formSign").submit();
  }
}

function getKeyInfoCall() {
  blockScreen();
  var selectedStorage = $('#storageSelect').val();
  getKeyInfo(selectedStorage, "getKeyInfoBack");
}

function getKeyInfoBack(result) {

  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];

      var alias = res['alias'];
      $("#alias").val(alias);
      console.log(alias);

      var keyId = res['keyId'];
      $("#keyId").val(keyId);

      var algorithm = res['algorithm'];
      $("#algorithm").val(algorithm);

      var subjectCn = res['subjectCn'];
      $("#subjectCn").val(subjectCn);

      var subjectDn = res['subjectDn'];
      $("#subjectDn").val(subjectDn);

      var issuerCn = res['issuerCn'];
      $("#issuerCn").val(issuerCn);

      var issuerDn = res['issuerDn'];
      $("#issuerDn").val(issuerDn);

      var serialNumber = res['serialNumber'];
      $("#serialNumber").val(serialNumber);

      var dateString = res['certNotAfter'];
      var date = new Date(Number(dateString));
      $("#notafter").val(date.toLocaleString());

      dateString = res['certNotBefore'];
      date = new Date(Number(dateString));
      $("#notbefore").val(date.toLocaleString());

      var authorityKeyIdentifier = res['authorityKeyIdentifier'];
      $("#authorityKeyIdentifier").val(authorityKeyIdentifier);

      // var pem = res['pem'];
      // $("#pem").val(pem);
      // $("form#signIn").submit();
  }
}

function signXmlCall() {
  var xmlToSign = $("#xmlToSign").val();
  var selectedStorage = $('#storageSelect').val();
  blockScreen();
  signXml(selectedStorage, "SIGNATURE", xmlToSign, "signXmlBack");
}

function signXmlBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#signedXml").val(res);
  }
}

function signXmlsCall() {
  var xmlToSign1 = $("#xmlToSign1").val();
  var xmlToSign2 = $("#xmlToSign2").val();
  var xmlsToSign = new Array(xmlToSign1, xmlToSign2);
  var selectedStorage = $('#storageSelect').val();
  blockScreen();
  signXmls(selectedStorage, "SIGNATURE", xmlsToSign, "signXmlsBack");
}

function signXmlsBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#signedXml1").val(res[0]);
      $("#signedXml2").val(res[1]);
  }
}

function createCAdESFromFileCall() {
  var selectedStorage = $('#storageSelect').val();
  var flag = $("#flag").is(':checked');
  var filePath = $("#filePath").val();
  if (filePath !== null && filePath !== "") {
      blockScreen();
      createCAdESFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCAdESFromFileBack");
  } else {
      alert("Не выбран файл для подписи!");
  }
}

function createCAdESFromFileBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMS").val(res);
  }
}

function createCAdESFromBase64Call() {
  var selectedStorage = $('#storageSelect').val();
  var flag = $("#flagForBase64").is(':checked');
  var base64ToSign = $("#base64ToSign").val();
  if (base64ToSign !== null && base64ToSign !== "") {
      $.blockUI();
      createCAdESFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCAdESFromBase64Back");
  } else {
      alert("Нет данных для подписи!");
  }
}

function createCAdESFromBase64Back(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMSforBase64").val(res);
  }
}

function createCAdESFromBase64HashCall() {
  var selectedStorage = $('#storageSelect').val();
  var base64ToSign = $("#base64HashToSign").val();
  if (base64ToSign !== null && base64ToSign !== "") {
      $.blockUI();
      createCAdESFromBase64Hash(selectedStorage, "SIGNATURE", base64ToSign, "createCAdESFromBase64HashBack");
  } else {
      alert("Нет данных для подписи!");
  }
}

function createCAdESFromBase64HashBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMSforBase64Hash").val(res);
  }
}

function applyCAdESTCall() {
  var selectedStorage = $('#storageSelect').val();
  var cmsForTS = $("#CMSForTS").val();
  if (cmsForTS !== null && cmsForTS !== "") {
      $.blockUI();
      applyCAdEST(selectedStorage, "SIGNATURE", cmsForTS, "applyCAdESTBack");
  } else {
      alert("Нет данных для подписи!");
  }
}

function applyCAdESTBack(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMSWithAppliedTS").val(res);
  }
}

function showFileChooserCall() {
  blockScreen();
  showFileChooser("ALL", "", "showFileChooserBack");
}

function showFileChooserBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#filePath").val(res);
  }
}

function showFileChooserForTSCall() {
  blockScreen();
  showFileChooser("ALL", "", "showFileChooserForTSBack");
}

function showFileChooserForTSBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#filePathWithTS").val(res);
  }
}

function changeLocaleCall() {
  var selectedLocale = $('#localeSelect').val();
  changeLocale(selectedLocale);
}

function createCMSSignatureFromFileCall() {
  var selectedStorage = $('#storageSelect').val();
  var flag = $("#flagForCMSWithTS").is(':checked');
  var filePath = $("#filePathWithTS").val();
  if (filePath !== null && filePath !== "") {
      blockScreen();
      createCMSSignatureFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCMSSignatureFromFileBack");
  } else {
      alert("Не выбран файл для подписи!");
  }
}

function createCMSSignatureFromFileBack(result) {
  unblockScreen();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMSWithTS").val(res);
  }
}

function createCMSSignatureFromBase64Call() {
  var selectedStorage = $('#storageSelect').val();
  var flag = $("#flagForBase64WithTS").is(':checked');
  var base64ToSign = $("#base64ToSignWithTS").val();
  if (base64ToSign !== null && base64ToSign !== "") {
      $.blockUI();
      createCMSSignatureFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCMSSignatureFromBase64Back");
  } else {
      alert("Нет данных для подписи!");
  }
}

function createCMSSignatureFromBase64Back(result) {
  $.unblockUI();
  if (result['code'] === "500") {
      alert(result['message']);
  } else if (result['code'] === "200") {
      var res = result['responseObject'];
      $("#createdCMSforBase64WithTS").val(res);
  }
}


setTimeout(function(){
    getActiveTokensCall();
}, 600);


class Ncalayer {
  kazToken(){
    blockScreen();
    var selectedStorage = $('#storageSelect').val();
    getKeyInfo(selectedStorage, "secureMeBack");
  }

  getPem(){
    return pemm;
  }
}

export default Ncalayer;
