if ( !localStorage.getItem("arr") && !localStorage.getItem("lastday")) {
  // If no data exists, set default
    localStorage.setItem("arr", JSON.stringify([3,2]));
    let today=new Date();
    let lastday=new Date(today);
    lastday.setDate(today.getDate()-1);
    localStorage.setItem("lastday",lastday.toLocaleDateString("en-GB"));
    localStorage.setItem("reset",0);
    localStorage.setItem("para","Welcome! Have a Good Day!!");
}

function updateValues(){
    if(!localStorage.getItem("newupdate")){
        let foodData = JSON.parse(localStorage.getItem("foodData")) || [];
        $.each(foodData,function(index,value){
            let parts=value.date.split("/");
            value.date=parts[1]+"/"+parts[0]+"/"+parts[2];
        });
        localStorage.setItem("foodData",JSON.stringify(foodData));
        localStorage.setItem("newupdate","true");
    }
}
updateValues();

$(document).ready(function(){
    checkDayChange();
    loadTable();
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
    //date max attribute
    let yyyy=now.getFullYear();
    let mm=String(now.getMonth() + 1).padStart(2, '0');
    let dd = String(now.getDate()).padStart(2, '0');
    let maxdate=yyyy+'-'+mm+'-'+dd;
    $("#prevDate").attr({max:maxdate,value:maxdate});

    const today = now.toLocaleDateString("en-GB");
      // Compare with stored day
    if (localStorage.getItem("lastday") !== today) {
        let arr= JSON.parse(localStorage.getItem("arr"));
        if(localStorage.getItem("reset")==1){
            if(arr[0]+arr[1]==0){
            localStorage.setItem("para",messages[0]);
        }
        else{
            localStorage.setItem("para",messages[1]);
        }
        }

        // Save the new day and reset values
        localStorage.setItem("arr",JSON.stringify([3,2]));
        localStorage.setItem("lastday", today);
        localStorage.setItem("reset",0);
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
        if(entry.date==localStorage.getItem("lastday")){
            if(entry.category=="Meals" && arr[1]!=0){
                arr[1]--;
            }
            else if((entry.category=="BreakFast" || entry.category=="snacks") && arr[0]!=0){
                arr[0]=0;
            }
        }
    });
    if(localStorage.getItem("reset")==1){
        localStorage.setItem("para",messages[7-(arr[0]+arr[1])]);
    }
    $("p").text(localStorage.getItem("para"));
}

$("#entryForm").on("submit",function(e){
        e.preventDefault();
        let now=new Date();
        let date=now.toLocaleDateString("en-GB");
        let time=now.toLocaleTimeString();
        let prevday=0;
        let prevDate;

        localStorage.setItem("reset",1);

        let fooditems=$("#fooditems").val();
        let quantity=$("#quantity").val();
        let category=$("#category").val();
        if($("#prevDate").val()){
            prevDate=new Date($("#prevDate").val());
            prevDate=prevDate.toLocaleDateString("en-GB")
            if(prevDate<date){
                date=prevDate;
                prevday=1;
                localStorage.setItem("reset",0);
            }
        }

        let foodData= JSON.parse(localStorage.getItem("foodData")) || [];
        if(prevday==0 || foodData.length==0){
            foodData.push({date, time, fooditems, quantity, category});
        }
        else{
            let newData=[];
            let flag=0;
            $.each(foodData, function(index,value){
                if(flag==0 && value.date >= prevDate)
                {
                    newData.push({date,time,fooditems,quantity,category});
                    flag=1
                }
                newData.push(value);
            });
            foodData=newData;
        }
        
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