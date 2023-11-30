// Retrieve stored expenses from localStorage or initialize an empty array
//activityon
//renderExpenseList()
//const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const url="http://localhost:4000"
const limit=document.getElementById("limit")
document.getElementById('downloadexpense').style.display = "none"
limit.addEventListener("change", (e) =>{
  const itemsList = document.getElementById('items');
   itemsList.innerHTML = ''; // Clear previous list items
  localStorage.setItem("offset", e.target.value);
  console.log(e.target.value)
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:4000/expense?page=1&&limit=${e.target.value}`, {
    headers: { "Authorization": token }})                             
    .then((response) => {
      console.log("I am the user", response);
      for (var i = 0; i < response.data.results.length; i++) {
        renderExpenseList(response.data.results[i]);
      }
      pagination(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
});
window.addEventListener("DOMContentLoaded", () => {
  let offset  = localStorage.getItem('offset');
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:4000/expense?page=1&&limit=${offset}`, {
    headers: { "Authorization": token }})                             
    .then((response) => {
      console.log("I am the user", response);
      for (var i = 0; i < response.data.results.length; i++) {
        renderExpenseList(response.data.results[i]);
      }
      pagination(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
})
const prevPage = (num,event) => {
  event.preventDefault()
  console.log("this is prev number",num)
  const itemsList = document.getElementById('items');
  itemsList.innerHTML=" "
  const token = localStorage.getItem('token');
  axios.get(`${url}/expense?page=${num}&&limit=5`, {
    headers: { "Authorization": token }})
    .then((response) => {
      for (var i = 0; i < response.data.results.length; i++) {
        renderExpenseList(response.data.results[i]);
      }
      console.log(response.data);
      pagination(response.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(`error in something`);
    });
};
const nextPage = (num,event) => {
  event.preventDefault()
  
  const itemsList = document.getElementById('items');
  itemsList.innerHTML=" "
  const token = localStorage.getItem('token');
  console.log(token)
  console.log("this is next number",num)
  
  axios.get(`${url}/expense?page=${num}&&limit=5`, {
    headers: { "Authorization": token }})
    .then((response) => {
      for (var i = 0; i < response.data.results.length; i++) {
        renderExpenseList(response.data.results[i]);
      }
      console.log(response.data);
      pagination(response.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(`error in something`);
    });
};
const pagination = (data) => {
  console.log(`76`);
  console.log(data);
  
  const paginationprev = document.getElementById("paginationprev");
  paginationprev.innerHTML = "";
  const paginationnext = document.getElementById("paginationnext");
  paginationnext.innerHTML = "";
  if (data.previous) {
   
    console.log("prev page from pagination ", data.previous.page);
    const previousPageButton = document.createElement("button");
    previousPageButton.textContent = data.previous.page;    
    previousPageButton.addEventListener("click",(event)=>prevPage(data.previous.page,event));
    paginationnext.appendChild(previousPageButton);
  }

  if (data.next) {
    console.log("next page from pagination ", data.next.page);
    const nextPageButton = document.createElement("button");
    nextPageButton.textContent = data.next.page;
    nextPageButton.addEventListener("click",()=>nextPage(data.next.page,event));
    paginationnext.appendChild(nextPageButton);
};
}

var submitButton = document.getElementById('submitButton')
submitButton.addEventListener("click",addExpense)

// Function to add an expense
function addExpense(event) {
  event.preventDefault()
  console.log("addexpense is working")
  const expenseamount = document.getElementById('expenseamount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
const expense = {
    expenseamount:expenseamount,
    description:description,
    category:category
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
      listItem.textContent = `${expense.expenseamount}-${expense.description}-${expense.category}`;
  
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
{ const token = localStorage.getItem('token');
  console.log("EDIT IS WORKING")
  event.preventDefault()
  const submitbutton = document.getElementById('submitButton')
  const savebutton = document.getElementById('saveButton')
 // const expenses = JSON.parse(localStorage.getItem('expenses'))
  const amountInput = document.getElementById('expenseamount');
  const descriptionInput = document.getElementById('description');
  const categoryInput = document.getElementById('category');
  amountInput.value=expense.expenseamount;
  descriptionInput.value=expense.description; 
  categoryInput.value=expense.category; 
  axios.delete(`http://localhost:4000/expense/deleteexpense/${expense.id}`, {
    headers: { "Authorization": token }
  })
  .then((result)=>{
    console.log("edited successfully")
  })
  .catch((err)=>{
    console.log("edit failed")
  })
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
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded",()=>{
  const token=localStorage.getItem('token')
  const decodetoken=parseJwt(token)
  console.log(decodetoken)
  const ispremiumuser=decodetoken.ispremiumuser
  if(ispremiumuser){
    document.getElementById('rzp-button1').style.display = "none"
    document.getElementById('downloadexpense').style.display = "block"
    document.querySelector('.message').innerHTML="You are a premium user now"
    showLeaderboard()
  }
})
document.getElementById('downloadexpense').addEventListener("click",()=>{
  download()
})
  
document.getElementById('rzp-button1').onclick=async function(e){
  e.preventDefault()
  const token = localStorage.getItem('token');
  const response=await axios.get(`http://localhost:4000/purchase/premiummembership`,{headers:{"Authorization": token}})
  console.log("viewing response",response)


var options={
  "key":response.data.key_id,
  "order_id":response.data.order.id,
  "handler":async function(response){
 let paymentId
  paymentId = response.razorpay_payment_id ? response.razorpay_payment_id : 1; 
  console.log("this is the id",paymentId)
    const res=await axios.post(`http://localhost:4000/purchase/updatetransactionstatus`,{
      order_id:options.order_id,
      payment_id:paymentId,

    },{headers:{"Authorization": token}})
    console.log(res)
   
    alert("You are a premium user now")
    document.getElementById('rzp-button1').style.display = "none"
    document.querySelector('.message').innerHTML="You are a premium user now"
    localStorage.setItem('token',res.data.token)
    showLeaderboard()
  }
}

let rzp= new Razorpay(options);
rzp.open();
}

function showLeaderboard()
{
  console.log("leaderboard is working")
  const inputElement=document.createElement("input")
  inputElement.type="button"
  inputElement.value="Show leaderboard"
  inputElement.onclick=async()=>{
    const token=localStorage.getItem('token')
    const userLeaderBoardArray=await axios.get(`http://localhost:4000/premium//showLeaderBoard`,{headers:{"Authorization": token}})
    console.log(userLeaderBoardArray)
    var leaderboardElem=document.getElementById('leaderboard')
    leaderboardElem.innerHTML+='<h1> Leader Board</h1>'
    userLeaderBoardArray.data.forEach((userDetails)=>{
      leaderboardElem.innerHTML+=`<li>Name-${userDetails.name} Total Expense- ${userDetails.totalexpense}`
    })
  }
  document.getElementById("message1").appendChild(inputElement)
}
function download(){
  const token = localStorage.getItem('token');
  event.preventDefault()
  axios.get('http://localhost:4000/expense/download', { headers: {"Authorization" : token} })
  .then((response) => {
    console.log(response)
      if(response.status === 200){
        console.log("got the file dude")
        //console.log(response)
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          var a = document.createElement("a");
          a.href = response.data.fileURL;
          console.log(response.data.fileURL)
         // a.download = 'myexpense.csv';
          setTimeout(() => {
            a.click();
          }, 100);
      } else {
          throw new Error(response.data.message)
      }

  })
  .catch((err) => {
      window.alert(err)
  });
}