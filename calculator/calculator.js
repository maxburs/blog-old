var lastResult = undefined;
var formula = [];
//saves inner html propery so we don't have to find it over and over
//idk if this is actualy worth it
var display;

function isOperator(char){
	if (char === "/" || char === "*" || char === "-" || char === "+"){
		return true;
	}
	else {
		return false;
	}
}

function updateDisplayFormula(){
	var outputTentative = formula.join("");
	if (outputTentative.length < 24){
		display.innerHTML = outputTentative;
	}
	else {
		display.innerHTML = outputTentative.slice(outputTentative.length - 23, outputTentative.length);
	}
}

//after the doculment is loaded make display the location of the display
window.onload = function() {
	display = document.getElementById("display");
}
//push the new number to the array and then update the display
function inputNumber(char){
	if (formula[formula.length - 1] !== "%"){
		formula.push(char);
		updateDisplayFormula();
	}
}
function inputOperator(char){
	//if there is stuff in the formula
	if (formula.length > 0){
		//if the previous formula entry is already an operator replace it
		if(isOperator(formula[formula.length - 1])){
			formula[formula.length - 1] = char;
		}
		else {
			formula.push(char);
		}
		updateDisplayFormula();
	}
}
function inputPercent(){
	console.log(formula[formula.length - 1]);
	if (parseInt(formula[formula.length - 1], 10)){
		console.log("test");
		formula.push("%");
		updateDisplayFormula();
	}
}
function inputDecimal(){
	formula.push(".");
	updateDisplayFormula();
}
function inputPreviousAns() {
	if (lastResult !== undefined){
		formula.push(lastResult);
		updateDisplayFormula();
	}
}
//delete the last entry into the formula and then update the display
function deleteLastOperation(){
	formula.pop();
	updateDisplayFormula();
}
//clears the formula
function clearFormula() {
	formula = [];
	updateDisplayFormula();
}

function solve(){
	//replace % with something eval can understand
	for (var i = 0; i < formula.length; i++){
		if (formula[i] === "%"){
			formula[i] = "/100";
		}
	}
	console.log("formula", formula);
	var result = eval(formula.join(""));
	console.log("result", result);
	if (result !== undefined){ 
		lastResult = result;
		display.innerHTML = lastResult;
		formula = [];
	}
}