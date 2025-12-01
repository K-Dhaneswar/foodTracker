if ( !localStorage.getItem("arr") && !localStorage.getItem("lastday")) {
  // If no data exists, set default
    localStorage.setItem("arr", JSON.stringify([3,2]));
    let today=new Date();
    let lastday=new Date(today);
    lastday.setDate(today.getDate()-1);
    localStorage.setItem("lastday",lastday.toLocaleDateString());
}

$(document).ready(function(){
    loadTable();
    checkDayChange();
    let username = localStorage.getItem("username");

    if (!username) {
      // Ask user once
      alert("⚠️ Important: Once you enter your username, it cannot be changed later! ")
      username = prompt("Please enter your username:");
      if (username) {
        localStorage.setItem("username", username);
      }
    }
    $("h1").text(username);

});

let messages=["Yesterday you nailed it — today's another chance to shine!",
                "Yesterday wasn't perfect, but today is a fresh chance — you've got this!",
                "A Tifin and Two meals more to Go!!!",
                "A Tifin and a Meal to GO!!",
                "A Tifin or A snack item to GO!!",
                "Two more meals to Go!!",
                "Keep going one more meal to Go!",
                "Meals and tiffin completed — star performance!"];

function checkDayChange() {
    const now = new Date();
    const today = now.toDateString();
      // Compare with stored day
    if (localStorage.getItem("lastDay") !== today) {
        let arr= JSON.parse(localStorage.getItem("arr"));
        if(arr[0]+arr[1]==0){
            $("p").text(messages[0]);
        }
        else{
            $("p").text(messages[1]);
        }
        localStorage.setItem("arr",JSON.stringify([3,2]));
        // Save the new day
        localStorage.setItem("lastDay", today);
    }
}




function loadTable(){
    let foodData = JSON.parse(localStorage.getItem("foodData")) || [];
    let $tbody=$("#myTable tbody");
    $tbody.empty();
    let arr= JSON.parse(localStorage.getItem("arr"));

    $.each(foodData, function(index,value){
        let revIndex = foodData.length -1 -index;
        let entry=foodData[revIndex];
        let $row= "<tr><td>"+ 
                        entry.date +"\n"+entry.time +
                    "</td><td>"+ 
                        entry.fooditems +
                    "</td><td>"+ 
                        entry.quantity +
                    "</td><td>"+ 
                        entry.category +
                    "</td></tr>";
        $tbody.append($row);
        if(entry.date>localStorage.getItem("lastday")){
            if(entry.category=="Meals" && arr[1]!=0){
                arr[1]--;
            }
            else if((entry.category=="BreakFast" || entry.category=="snacks") && arr[0]!=0){
                arr[0]=0;
            }
        }
    });
    $("p").text(messages[7-(arr[0]+arr[1])]);
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