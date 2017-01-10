var cleanScript = {
    'type': 'script',
    'api_key': api_key,
    'data': data,
    'inputs': inputs,
    'timeoutSeconds': timeoutSeconds
};
var jsonse = JSON.stringify(cleanScript);
var blob = new Blob([jsonse], {type: "application/json"});
var url  = URL.createObjectURL(blob);

var a = document.createElement('a');
a.href        = url;
a.download    = "backup.json";
a.textContent = "Download backup.json";

document.getElementById('json').appendChild(a);