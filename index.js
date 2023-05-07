import dogs from "./data.js";
import Dog from "./Dog.js";

let isWaiting = false
let likedDogAvatarArray = []

function getNewDogPost() {
    //save the first object from dogs array, in nextDogsData, and remove it from the array
    const nextDogData = dogs.shift() 
    
   // if there is at least one object in the array => create a new object with the data taken from the object saved in nextDogsData, then return it
    //otherwise, if it doesn't exist anymore, return an empty object (i.e. it won't display anything)
    return nextDogData ? new Dog(nextDogData) : {} 
}

document.addEventListener("click", function(event) {
    if(!isWaiting) {
        if(event.target.id === "cross") {
            setDogPostState(true, false)
            InteractionBtnClick()
    
        } else if(event.target.id === "heart") {
            likedDogAvatarArray.push(dogPost.avatar)
            setDogPostState(true, true)
            InteractionBtnClick() 

        } else if(event.target.id === "go-back-btn") {
            setTimeout(() =>{window.location.reload();}, 500)  
        }
    }
  
})

function setDogPostState(isSwiped, isLiked) {
    dogPost.hasBeenSwiped = isSwiped
    dogPost.hasBeenLiked =  isLiked
}

function InteractionBtnClick() {
    isWaiting = true
    dogPost.setBadgeHtml()
    render()
   if(dogs.length >0) {
        setTimeout(()=>{
            dogPost = getNewDogPost()
            render()
            isWaiting = false
        }, 1500)
    }    
   else {
        endApplication()
   }
}

function endApplication() {
    isWaiting = true
    const likedDogPostsHtml = likedDogAvatarArray.map((avatar)=> 
        `<div class="liked-post">
            <img src=${avatar} class="liked-img">
        </div>`).join('')

    const likedPostsContainer = `
    <div class="liked-posts-container">
        <p class="liked-posts-title">💗 Your favourite posts are: </p>
        <button class="go-back-btn" id="go-back-btn">Go back</button>
        ${likedDogPostsHtml}
    </div>`

    setTimeout(()=> {
      document.querySelector("main").innerHTML = likedPostsContainer
    }, 1500)

    isWaiting = false
}

function render() {
    document.getElementById("dog-posts-section").innerHTML = dogPost.getDogPostHtml()
}

let dogPost = getNewDogPost()
render()
