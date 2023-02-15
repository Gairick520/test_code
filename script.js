let id = [];//declaring variable id globally
var selectedRow = null;//declared globally to find out if it is insert or update operation during insert it will be null and during update it will go back to onEdit fn with corresponding employee row

// }

function onFormSubmit() {
    event.preventDefault();
    //function to deal with form submission 
    // e.preventDefault();
    var formData = readFormData();
    //  (empid.includes(updateData.empid) && updateData.empid != currentid

    if (id.includes(formData.id)) {
        document.getElementById("warning-message").style.display = "block";
        return false;

    }
    else {
        // document.getElementById("warning-message").style.display = "none";
        // id.push(formData.id);
        // insertNewRecord(formData);
        // resetForm();
        document.getElementById("warning-message").style.display = "none";
    }
    //console.log("dgd",formData.name)
    var regex = /^[a-zA-Z]*$/;
    let a = formData.name.match(regex)
    if (!a) {
        console.log(document.getElementById("name"))
        document.getElementById("warning-name").style.display = "block";
    }
    else {
        document.getElementById("warning-name").style.display = "none";
    }
    var age = formData.age;
    let b = (age < 19 || age > 60);
    console.log(b)
    if (b) {
        document.getElementById("warning-age").style.display = "block";
    }
    if (a && !b) {
        document.getElementById("warning-age").style.display = "none";
        id.push(formData.id);
        insertNewRecord(formData);
        resetForm();
    }




}





function update() {
    //console.log("hi")
    event.preventDefault();
    var updatedata = readupdatedData();
    var formData = readFormData();
    //console.log(updatedata.updateid);
    var currentid = localStorage.getItem("currid");
    if (id.includes(updatedata.id) && updatedata.id != currentid) {

        document.getElementById("warning-message").style.display = "block";
    }
    var regex = /^[a-zA-Z]*$/;
    let a = formData.name.match(regex)
    if (!a) {
        console.log(document.getElementById("name"))
        document.getElementById("warning-name").style.display = "block";
    }
    else {
        document.getElementById("warning-name").style.display = "none";
    }
    var age = formData.age;
    let b = (age < 19 || age > 60);
    console.log(b)
    if (b) {
        document.getElementById("warning-age").style.display = "block";
    }
    if (a && !b) {
        if (confirm('Do you want to update this record?')) {
        document.getElementById("warning-age").style.display = "none";//if the property is not null we will perform update operation
        
       
         
            updateRecord(updatedata);
            // document.getElementById("updatewarning").style.display = "none"; }
        }
        resetForm();


    }
}


//console.log(formData);
// resetForm();

//we have retrieved all values from these controls
// insertNewRecord(formData);//passing formdata objects


function readFormData() {
    //before onFormSubmit we need this function to retreive values from fields
    var formData = {};//declared variable to push value in column wise text box
    formData["id"] = document.getElementById("id").value;
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["gender"] = document.getElementById("gender").value;
    console.log(formData, "fo")
    return formData;//return object from this function at last
}
function insertNewRecord(data) {

    //function to insert new record over table
    var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];//insert new records in tbody element
    var newRow = table.insertRow(table.length);//insert a new row in tbody and calling insertRow function and passing index of new row(table.length) new record insertion increment by 1
    //insert new cells for new employee details
    cell1 = newRow.insertCell(0);
    //pass the value of columns
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell5 = newRow.insertCell(4);
    //edit and delete elements
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;


}
function resetForm() {
    //function to reset form
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("gender").value = '';
    selectedRow = null;//necessary to reset the property during onformsubmit

}
function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {

        //storing corresponding td elements here
        row = td.parentElement.parentElement;
        console.log(row);
        //to delete that corresponding row
        document.getElementById('employeelist').deleteRow(row.rowIndex);
        resetForm();//after deleting we need to reset the form
    }
}

function readupdatedData() {
    var updatedata = {};//declared variable to push value in column wise text box
    updatedata["id"] = document.getElementById("id").value;
    updatedata["name"] = document.getElementById("name").value;
    updatedata["age"] = document.getElementById("age").value;
    updatedata["gender"] = document.getElementById("gender").value;
    return updatedata;

}

function onEdit(td) {
    console.log(td, "td is here")
    //declaring a variable selectedRow and store the corresponding html row
    selectedRow = td.parentElement.parentElement;
    //console.log(selectedRow, "sr is here")
    //putting employee details from table back to form
    localStorage.setItem("currid", selectedRow.cells[0].innerHTML);
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;


}
function updateRecord(formData) {
    //to update form
    //in corresponding employee row in innerhtml we are storing formData in the cell
    //console.log(formData.updateid);
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.gender;
}
function validatename() {
    let getUserName = formData;

    if (getUserName) {
        console.log("it is cop", (/^[A-Za-z]+$/i.test(getUserName.name)))
        let a = (/^[A-Za-z]+$/i.test(getUserName.name))
        if (!a) {
            //  alert("please enter characters only in name");
            document.getElementById("warning-name").style.display = "block";
            return false;
        }

    }
    function validateage() {
        if (age < 19 || age > 60) {
            document.getElementById("warning-age").style.display = "block";
        }

        return true;
    }

}