const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;


app.on('window-all-closed', function() {
  app.quit();
});

let pluginName;
let pluginVersion;


if(process.platform  == 'win32'){
  	pluginName = path.join(__dirname, 'plugins/PepperFlashPlayer.dll');
    pluginVersion = '20.0.0.306'
} else if (process.platform == 'darwin') {
  	pluginName = path.join(__dirname, 'plugins/PepperFlashPlayer.plugin');
  	pluginVersion = '32.0.0.207'
}

app.commandLine.appendSwitch('ppapi-flash-path', pluginName);
app.commandLine.appendSwitch('ppapi-flash-version', pluginVersion);


 app.on('ready', function() {
  mainWindow = new BrowserWindow({
  	'width': 1600, 
  	'height': 750, 
  	'webPreferences': {
  		'webviewTag': true,
  		'plugins': true
  	} 
  });
  mainWindow.loadURL('file://' + __dirname + '/ui/ui.html');
});
