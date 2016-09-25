/**
 * Prakhar Sahay 09/23/2016
 *
 * Used by all EJS pages.
 */

var obj;

if (localStorage.length == 0) {
	create();
} else {
	obj = load();
}


// spoof DB methods
function load() {
	return JSON.parse(localStorage.data);
}

function store(x) {
	localStorage.data = JSON.stringify(x);
}

function drop() {
	localStorage.clear();
}

function create() {
	var now = new Date();
	var rootIssue = {
		id: "root",
		title: "Life",
		description: "",
		status: "open",
		parent: null,
		children: [],
		createdAt: now,
		updatedAt: now
	}
	obj = {issues: [rootIssue]};
	store(obj);
}

function find(id) {
	return obj.issues.find(function (item) {
		return id == item.id;
	});
}

function insert(t, d, p) {
	var now = new Date();
	var newIssue = {
		id: makeid(),
		title: t,
		description: d,
		status: "open",
		parent: p,
		children: [],
		createdAt: now,
		updatedAt: now
	};
	obj.issues.push(newIssue);
	store(obj);
	return newIssue;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < 7; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}