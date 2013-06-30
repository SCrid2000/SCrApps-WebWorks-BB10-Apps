/*  The Following Canvas-toBlog Script is By Eli Grey and Devin Samarin. License: X11/MIT. See LICENSE.md */
(function(a){"use strict";var b=a.Uint8Array,c=a.HTMLCanvasElement,d=/\s*;\s*base64\s*(?:;|$)/i,f,e=function(n){var o=n.length,k=new b(o/4*3|0),m=0,q=0,r=[0,0],g=0,p=0,l,h,j;while(o--){h=n.charCodeAt(m++);l=f[h-43];if(l!==255&&l!==j){r[1]=r[0];r[0]=h;p=(p<<6)|l;g++;if(g===4){k[q++]=p>>>16;if(r[1]!==61){k[q++]=p>>>8}if(r[0]!==61){k[q++]=p}g=0}}}return k.buffer};if(b){f=new b([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])}if(c&&!c.prototype.toBlob){c.prototype.toBlob=function(p,m){if(!m){m="image/png"}var l=Array.prototype.slice.call(arguments,1),h=this.toDataURL.apply(this,l),n=h.indexOf(","),i=h.substring(n+1),o=d.test(h.substring(0,n)),j=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder,k=new j,g;if(j.fake){g=k.getBlob(m);if(o){g.encoding="base64"}else{g.encoding="URI"}g.data=i;g.size=i.length}else{if(b){if(o){k.append(e(i))}else{k.append(decodeURIComponent(i))}g=k.getBlob(m)}}p(g)}}}(self));

/* Everything else Copyright (C) 2013 G. Shane Cridlebaugh. License: X11/MIT. See LICENSE.md */

function saveText(savedata, openat, picker, ext) {
	blackberry.io.sandbox = false;
	if (ext == null) ext = '';
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {create : true}, function (fileEntry) {
				fileEntry.createWriter(function (fileWriter) {
					var blob = new Blob([savedata], {type : 'text/plain'});
					fileWriter.write(blob);
					fileWriter.onwriteend = function () {blackberry.ui.toast.show('Saved!')};
					fileWriter.onerror = function (fileError) {blackberry.ui.toast.show(fileError)};
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_SAVER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path+ext, {create : true}, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						var blob = new Blob([savedata], {type : 'text/plain'});
						fileWriter.write(blob);
						fileWriter.onwriteend = function () {blackberry.ui.toast.show('Saved!')};
						fileWriter.onerror = function (fileError) {blackberry.ui.toast.show(fileError)};
					});
				});
			});
		})
	}
}

function deleteFile(openat, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {create : false}, function (fileEntry) {
				fileEntry.remove(function () {
					blackberry.ui.toast.show('Deleted.');
				}, function (fileError) {
					blackberry.ui.toast.show(fileError);
				});
			});
		});
	}
	else {	
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {create : false}, function (fileEntry) {
					fileEntry.remove(function () {
						blackberry.ui.toast.show('Deleted.');
					}, function (fileError) {
						blackberry.ui.toast.show(fileError);
					});
				});
			});
		})
	}
}

function createFolder(foldername) {
	blackberry.io.sandbox = false;
	window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
		fileSystem.root.getDirectory(foldername, {
			create: true
		}, function(dirEntry) {
			blackberry.ui.toast.show('Directory created.');
		});
	});
}

function deleteFolder(foldername) {
	blackberry.io.sandbox = false;
	window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
		fileSystem.root.getDirectory(foldername, {
			create : false
		}, function (dirEntry) {
			dirEntry.removeRecursively(function () {
				blackberry.ui.toast.show('Directory removed.');
			});
		});
	});
}

function copyFile(foldername, openat, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
					fileEntry.copyTo(dirEntry);
					blackberry.ui.toast.show('File copied.');
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
						fileEntry.copyTo(dirEntry);
						blackberry.ui.toast.show('File copied.');
					});
				});
			});
		})
	}
}

function copyRenameFile(foldername, openat, newname, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
					fileEntry.copyTo(dirEntry, newname);
					blackberry.ui.toast.show('File copied.');
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
						fileEntry.copyTo(dirEntry, newname);
						blackberry.ui.toast.show('File copied.');
					});
				});
			});
		})
	}
}

function moveFile(foldername, openat, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
					fileEntry.moveTo(dirEntry);
					blackberry.ui.toast.show('File moved.');
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
						fileEntry.moveTo(dirEntry);
						blackberry.ui.toast.show('File moved.');
					});
				});
			});
		})
	}
}

function moveRenameFile(foldername, openat, newname, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
					fileEntry.moveTo(dirEntry, newname);
					blackberry.ui.toast.show('File moved.');
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileSystem.root.getDirectory(foldername, {}, function (dirEntry) {
						fileEntry.moveTo(dirEntry, newname);
						blackberry.ui.toast.show('File moved.');
					});
				});
			});
		})
	}
}


function renameFile(openat, newname, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
			var path2 = (""+openat).split('/');
			path2.pop();
			path2=path2.join().replace(/,/g,'/')+'/';
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileSystem.root.getDirectory(path2, {}, function (dirEntry) {
					fileEntry.moveTo(dirEntry, newname);
					blackberry.ui.toast.show('File renamed.');
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			var path2 = (""+path).split('/');
			path2.pop();
			path2=path2.join().replace(/,/g,'/')+'/';
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileSystem.root.getDirectory(path2, {}, function (dirEntry) {
						fileEntry.moveTo(dirEntry, newname);
						blackberry.ui.toast.show('File renamed.');
					});
				});
			});
		})
	}
}

function saveCanvas(canvas, openat, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {create : true}, function (fileEntry) {
				fileEntry.createWriter(function (fileWriter) {
					canvas.toBlob(function (blob) {fileWriter.write(blob)}, 'image/png');
					fileWriter.onwriteend = function () {blackberry.ui.toast.show('Saved!')};
					fileWriter.onerror = function (fileError) {blackberry.ui.toast.show(fileError)};
				});
			});
		});
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_SAVER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path+'.png', {create : true}, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						canvas.toBlob(function (blob) {fileWriter.write(blob)}, 'image/png');
						fileWriter.onwriteend = function () {blackberry.ui.toast.show('Saved!')};
						fileWriter.onerror = function (fileError) {blackberry.ui.toast.show(fileError)};
					});
				});
			});
		})
	}
}

function loadData(openat, picker) {
	blackberry.io.sandbox = false;
	if (picker != 'picker') {
		window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
			fileSystem.root.getFile(openat, {}, function (fileEntry) {
				fileEntry.file(function (file) {
					var reader = new FileReader();
					reader.onloadend = function (e) {
						onLoad(this.result)
					};
					reader.readAsText(file);
				});
			});
		})
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fileSystem) {
				fileSystem.root.getFile(path, {}, function (fileEntry) {
					fileEntry.file(function (file) {
						var reader = new FileReader();
						reader.onloadend = function (e) {
							onLoad(this.result)
						};
						reader.readAsText(file);
					});
				});
			})
		});
	}
}

function loadCanvas(canvas, openat, picker, imgwidth, imgheight) {
	blackberry.io.sandbox = false;
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (picker != 'picker') {
		var img = new Image();   
		img.src = 'file://'+openat;
		img.onload = function () {
				if (parseInt(imgwidth) && parseInt(imgheight)) ctx.drawImage(img, 0, 0, parseInt(imgwidth), parseInt(imgheight))
				else ctx.drawImage(img, 0, 0)
				};
	}
	else {
		blackberry.invoke.card.invokeFilePicker({
			mode: blackberry.invoke.card.FILEPICKER_MODE_PICKER,
			directory: [openat],
			viewMode: blackberry.invoke.card.FILEPICKER_VIEWER_MODE_GRID, 
			sortBy: blackberry.invoke.card.FILEPICKER_SORT_BY_NAME, 
			sortOrder: blackberry.invoke.card.FILEPICKER_SORT_ORDER_ASCENDING
		}, function (path) {
			var img = new Image();   
			img.src = 'file://'+path;
			img.onload = function () {
				if (parseInt(imgwidth) && parseInt(imgheight)) ctx.drawImage(img, 0, 0, parseInt(imgwidth), parseInt(imgheight))
				else ctx.drawImage(img, 0, 0)
				};
		});
	}
}