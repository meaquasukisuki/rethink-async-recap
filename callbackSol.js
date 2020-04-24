function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
	
	console.log("Requesting: " + url);
	
	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

let resFileObj = {};

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way



function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		handleResponse(file,text)
	});
}

function handleResponse(fileName,textContent) {
	
	const correctOrderNames = ["file1","file2","file3"];
	if(!(fileName in resFileObj)) {
		resFileObj[fileName] = textContent
	}
	
	// loop through responses in order for rendering
	for (let i = 0; i < correctOrderNames.length; i++) {
		//received correct ordered response?
		if (correctOrderNames[i] in resFileObj) {
			//response needs to be rendered?(only render the correct ordered response)
			if (typeof resFileObj[correctOrderNames[i]] === "string") {
				output(resFileObj[correctOrderNames[i]]);
				//make sure response only render once
				resFileObj[correctOrderNames[i]] = false;
			}
		}
		//haven't receive correct ordered response
		else {
			return;
		}
	}
	output("complete!")
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
