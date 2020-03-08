console.log("loded app.js file")

 
 const form= document.querySelector("form")
 const search= document.querySelector("input")
 const message_1= document.querySelector("#message_1")
 const message_2= document.querySelector("#message_2")
 "message_2"
 
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var location = search.value
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        
            response.json().then((data)=>{
                if (data.erorr) {
                    message_1.innerHTML=(data.erorr)
                    console.log("you most enter a value,"+data.erorr);
                }else{
                    message_1.textContent= data.location
                    message_2.innerHTML=data.forecast
                console.log(data)
                }
            })
        
        
    })

    console.log("test")
    console.log(location)
})