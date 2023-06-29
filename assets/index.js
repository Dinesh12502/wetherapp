const sharedata = {
    title : "WeatherApp",
    text : "Know weather details in your city!",
    url : "/"
};

const btn = document.querySelector(".share-button");
btn.addEventListener("click", async()=>{
    try{
        await navigator.share(sharedata);
    }
    catch(err){
        window.alert("Error in sharing link!");
    }
});

const today = new Date('June 29, 2023 8:11:30');
const index = today.getDay();
// Sunday - Saturday : 0 - 6
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayspan = document.querySelector(".today");
todayspan.textContent = days[index];