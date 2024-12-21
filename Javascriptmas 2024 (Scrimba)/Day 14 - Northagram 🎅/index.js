/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from "./data.js";

const pageElements = {
    avatarsFeed: document.querySelector(".feed-avatars"),
    imagesFeed: document.querySelector(".feed-images"),
    uxLoading: document.querySelector(".ux-loading"),
};

const Avatar = (name, imageUrl) => {
    const element = document.createElement("div");
    element.classList.add("avatar");
    element.setAttribute("aria-label", `${name} Avatar`);
    element.style.backgroundImage = `url(./images/${imageUrl})`;
    return element;
};

const MainImage = (imageUrl, alt) => {
    const element = document.createElement("img");
    element.classList.add("feature-image");
    element.setAttribute("alt", alt);
    element.src = imageUrl;
    return element;
};

const avatars = feedData.map((obj) => {
    const { avatarUrl: imageUrl, handle: name, features } = obj;
    const avatar = Avatar(name, imageUrl);
    return {
        element: avatar,
        feedImages: features,
    };
});

const cycleImages = (avatars) => {
    const state = {
        currentAvatar: avatars[0],
        currentCount: 1,
        avatarsCount: avatars.length,
        intervalId: undefined,
        loadNextAvatar: function () {
            if (this.currentCount >= this.avatarsCount) return;
            this.avatarsCount += 1;
            this.currentAvatar = avatars[this.currentCount];
        },
    };
};

document.addEventListener("DOMContentLoaded", (e) => {
    pageElements.uxLoading.classList.add("stop-animation");
    pageElements.avatarsFeed.append(...avatars.map((obj) => obj.element));
    const main = MainImage("./images/bike.webp");
    pageElements.imagesFeed.append(main);
});
