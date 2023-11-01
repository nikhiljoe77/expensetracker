let signupbutton=document.getElementById("submit")
signupbutton.addEventListener("click",details)
function details(event)
{
    event.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    const user={
        name:name,
        password:password,
        email:email
    }
    console.log(user)
    axios.post("http://localhost:4000/",user)
    .then(()=>{
        console.log("posted")
    })
    .catch((err)=>{
       const failuremessage=document.getElementById("failuremessage")
       failuremessage.innerHTML=err
  
    })
}