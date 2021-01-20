var sseInput = document.getElementById('sse_input');
var addCustomUseCaseButton = document.getElementById('addCustomUseCaseButton');

sseInput.value = '';

// decode the base64 string when it is pasted in
sseInput.addEventListener("change", (event) => decodeSSEbase64(event));

// update the exported base64 when a new use case is added
addCustomUseCaseButton.addEventListener("click", (event) => addCustomUseCase(event));

// build JSON object from the user inputs
var showcaseIdInput = document.getElementById('showcaseId');
var channelInput = document.getElementById('channel');
var jsonInput = document.getElementById('json');
var userInput = document.getElementById('user');
var keyInput = document.getElementById('key');
var nameInput = document.getElementById('name');
var inSplunkInput = document.getElementById('inSplunk');
var journeyInput = document.getElementById('journey');
var usecaseInput = document.getElementById('usecase');
var highlightInput = document.getElementById('highlight');
var alertvolumeInput = document.getElementById('alertvolume');
var severityInput = document.getElementById('severity');
var categoryInput = document.getElementById('category');
var descriptionInput = document.getElementById('description');
var domainInput = document.getElementById('domain');
var killchainInput = document.getElementById('killchain');
var SPLEaseInput = document.getElementById('SPLEase');
var searchkeywordsInput = document.getElementById('searchkeywords');
var advancedtagsInput = document.getElementById('advancedtags');
var printable_imageInput = document.getElementById('printable_image');
var iconInput = document.getElementById('icon');
var company_logoInput = document.getElementById('company_logo');
var company_logo_widthInput = document.getElementById('company_logo_width');
var company_logo_heightInput = document.getElementById('company_logo_height');
var company_nameInput = document.getElementById('company_name');
var company_descriptionInput = document.getElementById('company_description');
var company_linkInput = document.getElementById('company_link');
var dashboardInput = document.getElementById('dashboard');
var relevanceInput = document.getElementById('relevance');
var helpInput = document.getElementById('help');
var howToImplementInput = document.getElementById('howToImplement');
var knownFPInput = document.getElementById('knownFP');
var operationalizeInput = document.getElementById('operationalize');
var searchInput = document.getElementById('search');
var data_source_categoriesInput = document.getElementById('data_source_categories');
var mitre_techniqueInput = document.getElementById('mitre_technique');
var mitre_sub_techniqueInput = document.getElementById('mitre_sub_technique');
var mitre_tacticInput = document.getElementById('mitre_tactic');

var sseExport = document.getElementById('sse_export');
var sseJson = document.getElementById('sse_json');

// construct the showcase ID and _key when the name is changed
nameInput.addEventListener("change", (event) => updateShowcaseAndKey(event));

var sseJsonObject = new Object({});

function decodeSSEbase64(event) {
  var decoded = atob(event.srcElement.value);
  sseJsonObject = JSON.parse(decoded);
  sseJson.innerHTML = JSON.stringify(sseJsonObject, undefined, 2);
  populateForm();
};

function addCustomUseCase(event) {

  sseJsonObject.name = "imported by Ben's script";

  var newUseCase = {};

  newUseCase._time = new Date().getTime() / 1000;
  newUseCase.showcaseId = nameInput.value;
  newUseCase.channel = channelInput.value;
  newUseCase.user = userInput.value;
  newUseCase._user = "nobody";
  newUseCase._key = nameInput.value.replace(/ /g, "_");

  newUseCaseJson = {};
  newUseCaseJson.name = nameInput.value;
  newUseCaseJson.inSplunk = inSplunkInput.value;
  newUseCaseJson.journey = journeyInput.value;
  newUseCaseJson.usecase = usecaseInput.value;
  // newUseCaseJson.highlight = highlightInput.value;
  // newUseCaseJson.alertvolume = alertvolumeInput.value;
  // newUseCaseJson.severity = severityInput.value;
  newUseCaseJson.category = categoryInput.value;
  newUseCaseJson.description = descriptionInput.value;
  newUseCaseJson.domain = domainInput.value;
  // newUseCaseJson.killchain = killchainInput.value;
  // newUseCaseJson.SPLEase = SPLEaseInput.value;
  // newUseCaseJson.searchkeywords = searchkeywordsInput.value;
  // newUseCaseJson.advancedtags = advancedtagsInput.value;
  // newUseCaseJson.printable_image = printable_imageInput.value;
  // newUseCaseJson.icon = iconInput.value;
  // newUseCaseJson.company_logo = company_logoInput.value;
  // newUseCaseJson.company_logo_width = company_logo_widthInput.value;
  // newUseCaseJson.company_logo_height = company_logo_heightInput.value;
  // newUseCaseJson.company_name = company_nameInput.value;
  // newUseCaseJson.company_description = company_descriptionInput.value;
  // newUseCaseJson.company_link = company_linkInput.value;
  // newUseCaseJson.dashboard = dashboardInput.value;
  // newUseCaseJson.relevance = relevanceInput.value;
  // newUseCaseJson.help = helpInput.value;
  // newUseCaseJson.howToImplement = howToImplementInput.value;
  // newUseCaseJson.knownFP = knownFPInput.value;
  // newUseCaseJson.operationalize = operationalizeInput.value;
  // newUseCaseJson.search = searchInput.value;
  newUseCaseJson.data_source_categories = data_source_categoriesInput.value;
  newUseCaseJson.mitre_technique = mitre_techniqueInput.value;
  newUseCaseJson.mitre_sub_technique = mitre_sub_techniqueInput.value;
  newUseCaseJson.mitre_tactic = mitre_tacticInput.value;

  // add the JSON to the use case
  newUseCase.json = JSON.stringify(newUseCaseJson);
  // console.log(newUseCase);

  // add the use case to the root object
  sseJsonObject.json.customContent.push(newUseCase)
  sseJsonObject.num_custom_items = sseJsonObject.json.customContent.length;

  sseJson.innerHTML = JSON.stringify(sseJsonObject, undefined, 4);
  sseExport.innerHTML = btoa(JSON.stringify(sseJsonObject));
};

function populateForm(event) {

  // use the last use case as starting values
  useCaseCount = sseJsonObject.json.customContent.length;
  lastUseCase = sseJsonObject.json.customContent[useCaseCount-1];

  // open the nested json
  var lastUseCaseJson = JSON.parse(lastUseCase.json);

  channelInput.value = lastUseCase.channel;
  userInput.value = lastUseCase.user;

  nameInput.value = lastUseCaseJson.name;
  inSplunkInput.value = lastUseCaseJson.inSplunk;
  journeyInput.value = lastUseCaseJson.journey;
  usecaseInput.value = lastUseCaseJson.usecase;
  categoryInput.value = lastUseCaseJson.category;
  descriptionInput.value = lastUseCaseJson.description;
  domainInput.value = lastUseCaseJson.domain;
  // killchainInput.value = lastUseCaseJson.killchain;
  // SPLEaseInput.value = lastUseCaseJson.SPLEase;
  // searchkeywordsInput.value = lastUseCaseJson.searchkeywords;
  // advancedtagsInput.value = lastUseCaseJson.advancedtags;
  // printable_imageInput.value = lastUseCaseJson.printable_image;
  // iconInput.value = lastUseCaseJson.icon;
  // company_logoInput.value = lastUseCaseJson.company_logo;
  // company_logo_widthInput.value = lastUseCaseJson.company_logo_width;
  // company_logo_heightInput.value = lastUseCaseJson.company_logo_height;
  // company_nameInput.value = lastUseCaseJson.company_name;
  // company_descriptionInput.value = lastUseCaseJson.company_description;
  // company_linkInput.value = lastUseCaseJson.company_link;
  // dashboardInput.value = lastUseCaseJson.dashboard;
  // relevanceInput.value = lastUseCaseJson.relevance;
  // helpInput.value = lastUseCaseJson.help;
  // howToImplementInput.value = lastUseCaseJson.howToImplement;
  // knownFPInput.value = lastUseCaseJson.knownFP;
  // operationalizeInput.value = lastUseCaseJson.operationalize;
  // searchInput.value = lastUseCaseJson.search;
  data_source_categoriesInput.value = lastUseCaseJson.data_source_categories;
  mitre_techniqueInput.value = lastUseCaseJson.mitre_technique;
  mitre_sub_techniqueInput.value = lastUseCaseJson.mitre_sub_technique;
  mitre_tacticInput.value = lastUseCaseJson.mitre_tactic;

};

function updateShowcaseAndKey(event) {
  showcaseIdInput.value = nameInput.value;
  keyInput.value = nameInput.value.replace(/ /g, "_");
};

// populateForm();
