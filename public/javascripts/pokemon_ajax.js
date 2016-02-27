// Prakhar Sahay 02/26/2016
// Requesters for PUT, POST, DELETE HTTP methods.

function put_pokemon(){
	var pokemon=$("#add").val();
	var li=$("<li>"+pokemon+"</li>");
	li.addClass("unconfirmed");
	$("#name_list").append(li);

	$.ajax({
		url:"/db",
		method:"PUT",
		success:function(data,status,jqXHR){
			li.toggleClass("unconfirmed",false);
		},
		data:{name:pokemon}
	});
}