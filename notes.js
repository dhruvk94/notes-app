console.log('Starting notes.js');
var fs = require('fs');
//console.log(module);
//module.exports.age = 25;

//To convert to arrow function: replace function keyword by =>

/*module.exports.addNote = function(){

}*/


/*module.exports.addNote = () => {
	console.log('addNote');
	return 'New Note';
}*/

/*module.exports.add = (a,b) => {
	return a+b;
}*/

var fetchNotes = (notes) => {
	try{
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	}
	catch(e){
		return [];	
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));	
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	
	/*var duplicateNotes = notes.filter((note) =>{
		if(note.title === title)
			return true;
		else 
			return false;	
	});*/
	
	//Using ES6 if only one line
	var duplicateNotes = notes.filter((note) => note.title === title);
	if(duplicateNotes.length == 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
	else{
		console.log(`${note.title} title taken!`);
	}
	//console.log('Adding note',title,body);
};

var getAll = () => {
	return fetchNotes();
};

var removeNote = (title) => {
	//fetch
	//filter
	//save
	//if one line in function, method can b written like this in es6
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	
	saveNotes(filteredNotes);
	if(notes.length!=filteredNotes.length)
		return true;
	else
		return false;
};

var getNote = (title) => {
	var notes = fetchNotes();
	var notesArr = notes.filter((note) => note.title === title);
	return notesArr[0];	
};

var logNote = (note) => {
	debugger;
	console.log('----------------------------------');
	console.log(`Title : ${note.title}`);
	console.log(`Body : ${note.body}`);
};

module.exports = {
	//addNote : addNote
	addNote, // In ES6, if you have property whose name is equal to value variable 
//because property is same as method name	 
	getAll,
	removeNote,
	getNote,
	logNote
};

