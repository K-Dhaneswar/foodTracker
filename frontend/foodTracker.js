$(document).ready(function(){
    loadTable();
});

function loadTable(){
    let foodData = JSON.parse(localStorage.getItem("foodData")) || [];
    let $tbody=$("#myTable tbody");
    $tbody.empty();

    $.each(foodData, function(index,entry){
        let $row= "<tr><td>"+ 
                        entry.date +"\n"+entry.time +
                    "</td><td>"+ 
                        entry.fooditems +
                    "</td><td>"+ 
                        entry.quantity +
                    "</td><td>"+ 
                        entry.category +
                    "</td></tr>";
        console.log($row);
        $tbody.append($row);
    });
}

$("#entryForm").on("submit",function(e){
        e.preventDefault();
        let now=new Date();
        let date=now.toLocaleDateString();
        let time=now.toLocaleTimeString();

        let fooditems=$("#fooditems").val();
        let quantity=$("#quantity").val();
        let category=$("#category").val();

        let foodData= JSON.parse(localStorage.getItem("foodData")) || [];
        foodData.push({date, time, fooditems, quantity, category});
        localStorage.setItem("foodData",JSON.stringify(foodData));

        loadTable();
        this.reset();
});

$("#remove").on("click", function(e){
    e.preventDefault();
    let foodData=JSON.parse(localStorage.getItem("foodData")) || [];
    if(foodData.length > 0){
        let confrimation=confirm("Are you sure about removing latest entry?");
        if(confrimation){
            foodData.pop();
            localStorage.setItem("foodData",JSON.stringify(foodData));
            loadTable();
        }else{
            alert("deletion cancelled");
        }
    }else{
        alert("No entries to remove!");
    }
});