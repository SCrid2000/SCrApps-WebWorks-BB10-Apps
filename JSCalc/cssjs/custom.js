function storeValue() {
sessionStorage.setItem(document.getElementById('hidden').value,document.getElementById('calcScreen').value)
document.getElementById('calcScreen').value = ''
document.getElementById('hidden').value  = parseInt(document.getElementById('hidden').value) + 1
}

function equals() {
	if (sessionStorage.getItem(document.getElementById('hidden').value - 1) == '') { document.getElementById('calcScreen').value = 'Error'}	
	else if (sessionStorage.getItem('nextcalc') == '+') { 
		document.getElementById('calcScreen').value = parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 2)) + 
		parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 1)) 
		sessionStorage.clear('nextcalc')}	
	else if (sessionStorage.getItem('nextcalc') == '-') { document.getElementById('calcScreen').value = parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 2)) - parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 1)) 
		sessionStorage.clear('nextcalc')}	
	else if (sessionStorage.getItem('nextcalc') == '*') { document.getElementById('calcScreen').value = parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 2)) * parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 1)) 
		sessionStorage.clear('nextcalc')}	
	else if (sessionStorage.getItem('nextcalc') == '/') { document.getElementById('calcScreen').value = parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 2)) / parseInt(sessionStorage.getItem(document.getElementById('hidden').value - 1)) 
		sessionStorage.clear('nextcalc')}	
}

function startNew() { 
	if (sessionStorage.getItem('startNew') != null) { document.getElementById('myFuncs').innerHTML = 'History:'}
		sessionStorage.removeItem('startNew')
}



function invite() {
blackberry.bbm.platform.users.inviteToDownload()
}

function setPM() {
blackberry.bbm.platform.self.setPersonalMessage('I\'m using JSCalc, the BlackBerry Calculator written in JavaScript. ' + document.getElementById('myFuncs').innerHTML)
}

function onLoadFunctions() {
// Register the app. Make sure you get a unique UUID!
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '14c13837-9a37-40fb-af86-f1cc88f31e61'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
	}

	