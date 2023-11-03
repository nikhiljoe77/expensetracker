let signupbutton=document.getElementById("submit")
signupbutton.addEventListener("click",details)
const url = "http://localhost:4000"
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
    axios.post(`${url}/login`, user)
    .then(()=>{
        window.alert("Login successful!");
       // window.location="/expense/getfile"
        window.location.href="expensetracker.html"
    })
    .catch((err)=>{
       const failuremessage=document.getElementById("failuremessage")
       failuremessage.innerHTML="Login failed"
  
    })
}