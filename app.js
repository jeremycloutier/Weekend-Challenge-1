// Hard Mode
// Create a delete button that removes an employee from the form. Note that in hard mode, it need not remove that Employee's salary from the reported total. (Note, you will need to look up the '.remove()' jQuery function).

// Pro Mode
// Once the employee is deleted, also update the total spend on salaries to discount the removed employee's salary. This will require that the logic knows which element was removed. You will need to stretch yourself for this one. I also recommend that you look into jQuery's .data() function to help complete this. Note, you will need to do something both when the employee is added and when they are deleted to make your application 'smart'.
var array = [];
var employeeUniqueID = 0;

$(document).ready(function(){
	$("#employeeinfo").on('submit',function(event){
		event.preventDefault();

		var values = {};
		employeeUniqueID++;

		var serializedArray = $("#employeeinfo").serializeArray();

		$.each(serializedArray, function(i, field){
			values[field.name] = field.value;
		})
		
		$("#employeeinfo").find("input[type=text]").val("");

		values.employeeUniqueID = employeeUniqueID;
		appendDom(values);

		array.push(values);
		totalSalary();
	});
	enable();
});

function enable(){
	$('#container').on('click', 'delete-btn', clickDelete);
}

function clickDelete(){
	var $el = $(this).parent();
	
	for (var i = 0; i < array.length; i++) {
		if(array[i].employeeUniqueID == $el.data("kittyfoo")){
			array.splice(i, 1);
		}
	}
	
	$el.remove();
	totalSalary();
}

function appendDom(object){
	$("#container").append("<div class='employee'></div>");
	var $el = $("#container").children().last();
	$el.data("kittyfoo", employeeUniqueID);
	conso

	$el.append("<p>" + object.employeefirstname + "</p>");
	$el.append("<p>" + object.employeelastname + "</p>");
	$el.append("<p>" + object.employeenumber + "</p>");
	$el.append("<p>" + object.employeejobtitle + "</p>");
	$el.append("<p>" + object.employeesalary + "</p>");
	$el.append("<button class='delete-btn'>Delete</button>");

}


function totalSalary(){
	
	var totalCalcSalary = 0;

	for (var i = 0; i < array.length; i++) {
		var object = array[i];
		totalCalcSalary += parseInt(object.employeesalary);
	}

	totalCalcSalary /= 12;
	$("#totalContainer").text("Total Monthly Salary: " + totalCalcSalary);
	
}



