
class Dog {
    constructor(data) {
        Object.assign(this, data)
        this.badgeHtml = ''
    }


    setBadgeHtml() {
        this.badgeHtml = this.hasBeenLiked ? '<img class="badge" src="images/badge-like.png">'
         : !this.hasBeenLiked && this.hasBeenSwiped ? '<img class="badge" src="images/badge-nope.png">'
         : ''
    }

    getDogPostHtml() {
        const {name, avatar, age, bio, badgeHtml} = this

        return `<div class="dog-post-container">
                    <img class="dog-img" src=${avatar}>
                    <div class="dog-text">
                        <p class="dog-description">${name}, ${age}</p>
                        <p class="dog-bio">${bio}</p>
                    </div>
                    <div class="badge-logo" id="badge-logo">
                        ${badgeHtml}
                    </div>
                </div>
            `
    }
    
}

export default Dog
