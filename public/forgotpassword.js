function forgotpassword(e) {
    const url=http://35.154.157.46:4000
    const token=localStorage.getItem('token')
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),

    }
    console.log(userDetails)
    axios.post('${url}/password/forgotpassword',userDetails,{headers:{"Authorization": token}}).then(response => {
        
        if(response.status === 202){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}