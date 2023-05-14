import dogs from "./data.js";
import Dog from "./Dog.js";

let isWaiting = false
let likedDogAvatarArray = []
let dogPost = getNewDogPost()

function getNewDogPost() {
    const nextDogData = dogs.shift() 
    return nextDogData ? new Dog(nextDogData) : {} 
}

document.addEventListener("click", function(event) {
    if(!isWaiting) {
        if(event.target.id === "cross" || event.target.parentElement.id === "cross") {
            reject()
        } else if(event.target.id === "heart" || event.target.parentElement.id === "heart") {
            like()
        } else if(event.target.id === "go-back-btn") {
            goBack()
        }
    }
  
})

function reject() {
    setDogPostState(true, false)
    interactionBtnClick()
}

function like() {
    likedDogAvatarArray.push(dogPost.avatar)
    setDogPostState(true, true)
    interactionBtnClick() 
}

function goBack() {
    setTimeout(() =>{window.location.reload()}, 500)  
}

function setDogPostState(isSwiped, isLiked) {
    dogPost.hasBeenSwiped = isSwiped
    dogPost.hasBeenLiked =  isLiked
}

function interactionBtnClick() {
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
        <p class="liked-posts-title">💗 Here are your favourite posts </p>
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

render()
