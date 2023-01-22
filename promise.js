//post array
let posts =[{
    title: "post one",
    body: "this is post one",
    createdAt : new Date().getTime()
},{
    title: "post two",
    body: "this is post two",
    createdAt : new Date().getTime()
}]
let intervalId;
//show post to the body
function getPost(){
    clearInterval(intervalId);
    intervalId =setInterval(()=>{
        let output = "";
        posts.forEach((post)=>{
            output+= `<li>${post.title} - last updated ${(new Date().getTime()-`${post.createdAt}`)/1000} seconds ago</li>`
        })
        document.body.innerHTML = output;
    
    },1000)
    
}
//createpost function 
function createPost (post){
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push({...post,createdAt :new Date().getTime()})
           const error=false;
           if(!error){
            resolve();
           }else{
            reject('Error:something went wrong')
           }
        },3000)
    })
   
} 

//deletepost fucntion
function deletePost(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           if (posts.length>0) {
            posts.pop()
           }
            let error;
            if(posts.length == 0){
                error =true
            }else{
                error = false
            }
            if(!error){
                resolve()
            }else{
                reject('Error: Array is empty now.')
            }
        },1000)
    })
}

function updateLastUserActivityTime(){
    return new Promise((resolve,reject) =>{
        user.lastActivityTime = new Date().getTime();
        let error = false
        if(!error){
            resolve(user.lastActivityTime)
        }else{
            reject("update time failed")
        }
},1000)
    
}

let user ={
    userName : "praveen",
    lastActivityTime : new Date().getTime()
}
createPost({ title: "post three",
body: "this is post three"}).then(()=>{
    getPost()
    Promise.all([createPost,updateLastUserActivityTime])
    .then(()=>{
        console.log(`${user.userName} last activity time is ${(user.lastActivityTime)} ago`)
        deletePost().then(()=>{
            console.log(posts)
        })
    }).catch(err=>(console.log(err)))

})

   


