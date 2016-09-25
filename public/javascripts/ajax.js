/**
 * Prakhar Sahay 02/26/2016
 *
 * Requesters for PUT, POST, DELETE HTTP methods.
 */

function putItem(){
	var item=$("#addInput").val();
	if(item==="") return;
	$("#addInput").val("");
	var li=$("<li>"+item+"</li>");
	li.addClass("unconfirmed");
	li.on("dragstart",dragStart);
	li.attr("draggable",true);
	$("#name_list").append(li);

	$.ajax({
		url:"/db",
		method:"PUT",
		success:function(data,status,jqXHR){
			li.toggleClass("unconfirmed",false);
		},
		data:{name:item}
	});
}

function deleteItem(ev){
	ev.preventDefault();
	var item=$("#"+ev.dataTransfer.getData("text"));
	item.attr("id","");
	item.addClass("deleting");

	$.ajax({
		url:"/db",
		method:"DELETE",
		success:function(data,status,jqXHR){
			item.remove();
		},
		data:{name:item.text()}
	});
}


function dragEnd(ev){
	ev.target.id="";
}

function dragStart(ev){
	ev.target.id="motion";
	ev.dataTransfer.setData("text",ev.target.id);
}

function enter(ev,elem){
	if(ev.keyCode!=32) return;
	console.log(ev);
	console.log(elem);
}