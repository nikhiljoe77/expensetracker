let signupbutton=document.getElementById("submit")
signupbutton.addEventListener("click",details)
const url='http://localhost:4000'
console.log(url)
function details(event)
{
    event.preventDefault();
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    const user={
        password:password,
        email:email
    }
    console.log(user)
    axios.post(`/user/login`, user)
    .then((response)=>{
        alert(response.data.message);
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        window.location.href="/expensetracker"
       
    })
    .catch((err)=>{
        console.log(JSON.stringify(err))
       const failuremessage=document.getElementById("failuremessage")
       failuremessage.innerHTML="Login failed"
  
    })
}