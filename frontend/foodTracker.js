$(document).ready(function(){
    $("#submit").click(function(){
        let now=new Date();
        let dateTime=now.toLocaleString();

        let fooditems=$("[name='fooditems']").val();
        let quantity=$("[name='quantity']").val();
        let category=$("[name='category']").val();

        if(fooditems=="" || quantity=="" || category==""){
            alert("Enter all values");
        }
        else{
            $("#myTable").append("<tr><td>"+dateTime+"</td><td>"+fooditems+"</td><td>"+category+"</td><td>"+quantity+"</td></tr>");
        }
        
    });
});