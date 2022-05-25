import { userStats } from "../controllers/auth";

var incrementAmount = 1;
var cultstage = userStats.cultstage;
var cultStageName = " ";

function StageName(cultstage){
    if(cultstage<100) {
        cultStageName = "Body Refinement Stage 1";
    } else if(cultstage<250) {
        cultStageName = "Body Refinement Stage 2";
    } else    if(cultstage<500) {
        cultStageName = "Body Refinement Stage 3";
    } else if(cultstage<1000) {
        cultStageName = "Qi Transformation Stage 1";
    } else    if(cultstage<1500) {
        cultStageName = "Qi Transformation Stage 2";
    } else if(cultstage<2000) {
        cultStageName = "Qi Transformation Stage 3";
    } else    if(cultstage<4000) {
        cultStageName = "Void Tribulation Stage 1";
    } else if(cultstage<5000) {
        cultStageName = "Void Tribulation Stage 2";
    } else    if(cultstage<6000) {
        cultStageName = "Void Tribulation Stage 3";
    } else if(cultstage<10000) {
        cultStageName = "Limbo Realm 1st Order";
    } else    if(cultstage<12500) {
        cultStageName = "Limbo Realm 2nd Order";
    } else if(cultstage<15000) {
        cultStageName = "Limbo Realm 3rd Order";
    } else if(cultstage<25000) {
        cultStageName = "Bhagavan Lower Stage";
    } else    if(cultstage<35000) {
        cultStageName = "Bhagavan Middle Stage";
    } else if(cultstage<45000) {
        cultStageName = "Bhagavan Upper Stage";
    } else if(cultstage<70000) {
        cultStageName = "True God Lower Stage";
    }  else   if(cultstage<85000) {
        cultStageName = "True God Middle Stage";
    } else if(cultstage<100000) {
        cultStageName = "True God Great Perfection Stage";
    }

    return cultStageName;
}

function increase_cultStage(cultstage, incrementAmount){

    cultstage = cultstage + incrementAmount;

    document.getElementById("progress").setAttribute("value", cultstage);
    document.getElementById("cultstagename").innerHTML = "Cultivation: " + StageName(cultstage) ;

    if(isAtMax(cultstage, document.getElementById("progress").getAttribute("max")) == true) {
        document.getElementById("advanceButton").setAttribute("style","display: block;");
    }
}

function advance()
