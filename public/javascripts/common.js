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

function find(id) {
	return obj.issues.find(function (item) {
		return id == item.id;
	});
}

function update(issue) {
	var idx = obj.issues.findIndex(function (item) {
		return issue.id == item.id;
	});
	issue.updatedAt = new Date();
	obj.issues[idx] = issue;
	store(obj);
}

function insert(t, d, p) {
	var now = new Date();
	var newIssue = {
		id: makeid(),
		title: t,
		description: d,
		open: true,
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


// load, store, create, drop
function load() {
	return JSON.parse(localStorage.data);
}

function store(x) {
	localStorage.data = JSON.stringify(x);
}

function create() {
	var now = new Date();
	var rootIssue = {
		id: "root",
		title: "Life",
		description: "",
		open: true,
		parent: null,
		children: [],
		createdAt: now,
		updatedAt: now
	}
	obj = {issues: [rootIssue]};
	store(obj);
}

function drop() {
	localStorage.clear();
}

// forest.ejs, leaf.ejs
function makeIssueDiv(issue) {
	var issueRow = $('<tr>', {class: 'leaf-link forest-row'});
	issueRow.click(function () {
		location.href = '/leaf/' + issue.id;
	});
	var title = $('<td>');
	title.text(issue.title);
	issueRow.append(title);

	var description = $('<td>', {class: 'leaf-desc'});
	description.text(issue.description || 'no description');
	issueRow.append(description);

	// issueRow.append(issueDiv);
	return issueRow;
}