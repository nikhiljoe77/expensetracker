// Retrieve stored expenses from localStorage or initialize an empty array
//activityon
//renderExpenseList()
//const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  axios.get("http://localhost:4000/expense/", {
    headers: { "Authorization": token }
  })
    .then((response) => {
      console.log("I am the user", response);
      for (var i = 0; i < response.data.length; i++) {
        renderExpenseList(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

var submitButton = document.getElementById('submitButton')
submitButton.addEventListener("click",addExpense)

// Function to add an expense
function addExpense(event) {
  event.preventDefault()
  console.log("addexpense is working")
  const expenseamount = document.getElementById('expenseamount').value;
  const description = document.getElementById('description').value;
const expense = {
    expenseamount:expenseamount,
    description:description
  };
console.log(expense.expenseamount)
console.log(expense)
  if(expenseamount!='')
  {
  /*expenses.push(expense);
  saveExpensesToLocalStorage();*/
  const token = localStorage.getItem('token');
  axios.post("http://localhost:4000/expense/",expense, {
    headers: { "Authorization": token }
  })
  .then((response) => {
    window.location.reload();
    renderExpenseList(expense) 
    console.log("render is working")
    console.log(response)
  })
  .catch((err) => {
    console.log("FAILED")
  })
  }
 // renderExpenseList();

 // amountInput.value = '';
 // descriptionInput.value = '';
}

//HELLO
// Function to save expenses to localStorage

/*function saveExpensesToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}*/

// Function to render the expense list
  function renderExpenseList(expense) {
    console.log("render is working FIRSTLY")
    //const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const itemsList = document.getElementById('items');
   // itemsList.innerHTML = ''; // Clear previous list items
  
    //expenses.forEach((expense, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${expense.expenseamount}-${expense.description}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm float-right delete';
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => deleteExpense(expense,listItem));
  
      const editButton = document.createElement('button');
      editButton.className = 'btn btn-primary btn-sm float-right edit';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editExpense(expense,listItem));
  
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
      itemsList.appendChild(listItem);
    //});
  }
// Function to delete an expense
function deleteExpense(expense,listItem) {
  const token = localStorage.getItem('token');
  event.preventDefault()
  //const index = expenses.findIndex(expense => expense.id === id);
 /* if (index !== -1) {
    expenses.splice(index, 1);
    saveExpensesToLocalStorage();
    renderExpenseList(); 
  }*/
  console.log("delete is working")
  axios.delete(`http://localhost:4000/expense/deleteexpense/${expense.id}`, {
    headers: { "Authorization": token }
  })
  .then((response) => {
    // Remove the list item from the user details list
    listItem.parentNode.removeChild(listItem);
    
  })
  .catch((err) => {
    console.log(err);
  });

}


//Function to edit an expense
function editExpense(expense,listItem) 
{
  console.log("EDIT IS WORKING")
  event.preventDefault()
  const submitbutton = document.getElementById('submitButton')
  const savebutton = document.getElementById('saveButton')
 // const expenses = JSON.parse(localStorage.getItem('expenses'))
  const amountInput = document.getElementById('expenseamount');
  const descriptionInput = document.getElementById('description');
  amountInput.value=expense.expenseamount;
  descriptionInput.value=expense.description; 
  axios.delete(`http://localhost:4000/expense/${expense.id}`)
   //submitbutton.style.display="none"
  // savebutton.style.display="block"

//const savebutton = document.getElementById('saveButton')
//savebutton.addEventListener("click",()=>saveExpense(index))
}
/*function saveExpense(expense,listItem)
{
  console.log('Index:', index)
  const expenses = JSON.parse(localStorage.getItem('expenses'))
  const amountInput = document.getElementById('expenseamount');
  const descriptionInput = document.getElementById('description') 
  expenses[index].amount=amountInput.value;
  expenses[index].description=descriptionInput.value; 
  console.log('Expense:', expenses[index]);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenseList();

}
*/
  
document.getElementById('rzp-button1').onclick=async function(e){
  e.preventDefault()
  const token = localStorage.getItem('token');
  const response=await axios.get(`http://localhost:4000/purchase/premiummembership`,{headers:{"Authorization": token}})
  console.log(response)


var options={
  "key":response.data.key_id,
  "order_id":response.data.order.id,
  "handler":async function(response){
    await axios.post(`http://localhost:4000/purchase/updatetransactionstatus`,{
      order_id:options.order_id,
      payment_id:response.razorpay_payment_id,

    },{headers:{"Authorization": token}})
    alert("You are a premium user now")
  }
}

let rzp= new Razorpay(options);
rzp.open();
}