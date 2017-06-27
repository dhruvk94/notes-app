console.log('Starting app.');

const fs = require('fs');
const os = require('os');

const notes = require('./notes.js');//require user-defined methods
const _ = require('lodash');
const yargs = require('yargs');
//Original line
//fs.appendFile('greetings.txt','Hello world!');

//With callback
/*fs.appendFile('greetings.txt','Hello world!',function(err){
	if(err){
		console.log('Unable to write to file!');
	}
});
*/

//With syncronous method
//fs.appendFileSync('greetings.txt','Hello world!');

//`${user.username}` -> template strings

var user = os.userInfo();

var res = notes.addNote();
console.log(res);

//var sum = notes.add(7,8);
//console.log(sum);

//fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}`);

//console.log(_.isString(true));
//console.log(_.isString('Dhruv'));


var filteredArray = _.uniq([1,6,2,3,2]);
console.log(filteredArray);	

//use npm init ->  toget node modules folder
//use npm install

//nodemon -> auto restart on changes

console.log(process.argv);

//const argv = yargs.argv;
//var command = argv._[0];
//console.log("command:"+command); 
//console.log("process.argv:"+process.argv); 
//console.log("argv:"+argv); 

const argv = yargs.command('add','Add a new note',{
		title:{
			describe : 'Title of note!',
			demand : true,//tells whether this attr is required
			alias : 't'
		},
		body:{
			describe : 'Body of note!',
			demand : true,
			alias : 'b'
		}
	})
	.help()
	.argv;
	
var command = argv._[0];

if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('Note added successfully!');
		notes.logNote(note);
	}
	else{
		console.log('Unable to add note!');
	}
}
else if(command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes!`);
	allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read'){
	var note = notes.getNote(argv.title);
	if(note){
		console.log("Note found");
		notes.logNote(note);
	}
	else
		console.log("Note not found!");
}
else if(command === 'remove'){
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? "Note was removed" : "Not not found" ;
	console.log(message);
}
else{
console.log('Command not recognized!');
}


