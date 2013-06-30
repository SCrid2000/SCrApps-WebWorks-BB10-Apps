BBFiles
=======

BlackBerry File API Framework

Disclaimer: This is the first release of this framework. It is not extensively tested, although everything does appear to work.
It's open source, so if there's a bug, don't complain - fix it!

License: MIT/X11 License.

The following are the commands for the BlackBerry File API.

Save text to a specified file:
saveText(Text to save, save location and file name)
Example: saveText('Hello World!', '/accounts/1000/shared/misc/helloWorld.txt')

Save text to a file of the user's choice:
saveText(Text to save, location to open the file picker, 'picker')
Example: saveText('Hello World', '/accounts/1000/shared/misc/', 'picker')

Load text from a file:
loadData(location of document)
Example: loadData('/accounts/1000/shared/misc/helloWorld.txt')

Load text from a file of the user's choice:
loadData(location to open the file picker, 'picker')
Example: loadData('/accounts/1000/shared/misc/', 'picker')

Delete a specified file: 
deleteFile(file location and name)
Example: deleteFile('/accounts/1000/shared/misc/helloWorld.txt')

Delete a file of the user's choice:
deleteFile(location to open the file picker, 'picker')
Example: deleteFile('/accounts/1000/shared/misc/', 'picker')

Create a folder:
createFolder(folder to create)
Example: createFolder('/accounts/1000/shared/misc/New')

Delete a folder:
deleteFolder(folder to delete)
Example: deleteFolder('/accounts/1000/shared/misc/New')

Move a file:
moveFile(location to move the file to, current file location and name)
Example: moveFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/helloWorld.txt')

Move a file of the user's choice:
moveFile(location to move the file to, location to open the file picker, 'picker')
Example: moveFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/', 'picker')

Move and Rename a file:
moveRenameFile(location to move the file to, current file location and  current file name, new name)
Example: moveRenameFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/helloWorld.txt', 'newFile.txt')

Move and Rename a file of the user's choice:
moveRenameFile(location to move the file to, location to open the file picker, new name, 'picker')
Example: moveRenameFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/', 'newFile.txt', 'picker')

Copy a file:
copyFile(location to move the file to, current file location and file namee)
Example: copyFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/helloWorld.txt')

Copy a file of the user's choice:
copyFile(location to move the file to, location to open the file picker, 'picker')
Example: copyFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/', 'picker')

Copy and Rename a file: 
copyRenameFile(location to copy the file to, current file location and current file name, new name)
Example: copyRenameFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/helloWorld.txt', 'newFile.txt')

Copy and Rename a file of the user's choice:
copyRenameFile(location to copy the file to, location to open the file picker, new name, 'picker')
Example: copyRenameFile('/accounts/1000/shared/misc/downloads/', '/accounts/1000/shared/misc/', 'newFile.txt', 'picker')

Rename a file:
renameFile(file location and current name, new name)
Example: renameFile('/accounts/1000/shared/misc/helloWorld.txt', 'yay.txt')

Rename a file of the user's choice:
renameFile(file location, new name, 'picker')
Example: renameFile('/accounts/1000/shared/misc/', 'yay.txt', 'picker')

Save Canvas to an image:
saveCanvas(canvas element, location and name you want to save canvas to)
Example: saveCanvas(document.getElementById('canvas'), '/accounts/1000/shared/misc/image.png')

Save Canvas to an image of the user's choice:
saveCanvas(canvas element, location to open the file picker, 'picker')
Example: saveCanvas(document.getElementById('canvas'), '/accounts/1000/shared/misc/', 'picker')

Load image to Canvas:
loadCanvas(canvas element, image to load', 'nopicker', width you want image to load, height you want image to load)
loadCanvas(document.getElementById('canvas'), '/accounts/1000/shared/misc/image.png', 'nopicker', 500, 300)
Note: 'nopicker' can be any text except 'picker'. It is optional, unless you specify a height and width (which are also optional).

Save image of the user's choice to Canvas:
loadCanvas(canvas element, location to open the file picker, 'picker', width you want image to load, height you want image to load)
loadCanvas(document.getElementById('canvas'), '/accounts/1000/shared/misc/', 'picker',  500, 300)

Locations:
For locations, you can use a hardcoded location (for example, '/accounts/1000/shared/misc/'). You can also use blackberry.io.SDCard, blackberry.io.home, or blackberry.io.sharedFolder.
You may use the file API to save to and delete from the app storage by using blackberry.io.home; however, the BlackBerry File Picker (as far as I can tell) CAN NOT access the app file storage.
Examples of accessing app storage:
saveText('Hello World!', blackberry.io.home+'/helloWorld.txt')
deleteFile(blackberry.io.home+'/helloWorld.txt')
App files (the files included in the app when you packaged it) cannot be deleted, modified, or moved. However, ou can view them (for example, to load images into canvas) using:
blackberry.io.home+'/../app/native/'
As an example, to access the app icon, you might use blackberry.io.home+'/../app/native/images/icon.png'

Saving Data:
Data can be hardcoded into the attribute within the function, (such as "Hello World") or can be retrieved from an element within the DOM (such as document.getElementById('textbox').value) or from device storage. Or any other way that makes sense.

Dependencies:
Although bbUI is used in the sample app, there are no unincluded dependencies.
The CanvasToBlob Script is included courtesy of Eli Grey. http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js

You will need to add the following to your config.xml:
<feature id="blackberry.invoke.card" />
<feature id="blackberry.io" />
<feature id="blackberry.ui.toast" />
<rim:permissions>
	<rim:permit>access_shared</rim:permit>
</rim:permissions>

Usage: 
Add bbfiles.js to your document.
Example: <script type="text/javascript" src="cssjs/bbfiles.js"></script>