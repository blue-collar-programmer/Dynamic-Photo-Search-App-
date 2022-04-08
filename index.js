const container = document.getElementById('mainContainer');
const header = document.getElementById('header');
const content = document.getElementById('content')

/* 
    LEFT OFF-- Sticky bar is working well, consider remove the click event, does seem like it is needed
    What other features would be useful?
    could I add prewritten topics, that When click links to a different page 
    -1. has the same html design
    -2. sends a fetch request which already populates the page with results?

    consider: Onload sending a fetch request that automatically sends for a random photo to 
    render as a cover image under the header bar!

    then sort the rest
*/


function addStickyClass() {
    return header.classList.add('sticky');
}

function addStickyContent() {
    return content.classList.add('stickyContent');
}


window.onscroll = () => {
    addStickyClass()
    addStickyContent()
}

let ranURL = 'https://api.unsplash.com/photos/random?query=background&orientation=portrait&content_filter=high&client_id=BMOohXS2YcYfJKQkYYADqtZkkSWVQGpgRZ3qfiK_9Tk&SameSite=strict'

async function getCoverPhoto(url) {
    try {
        const res = await fetch(url);
        const data = await res.json(); //get the random photo api url 
        console.log('data, COVER PHOTO CALL=>', data);
        return data
    } catch (err) {
        console.log('THE CALL FAILED REASON =>', err);
    }
}
getCoverPhoto(ranURL)
    .then(photoObj => {
        let div = document.createElement('div');
        div.id = 'coverImage';
        div.classList.add('randomImage');

        div.innerHTML = `
       <div class="cover-photo-container">
       <img class="coverPhoto" src= "${photoObj.urls.raw}&w=1360">
       <h4 class='greetingText'> <span>"A picture is worth a thousand words"</span>
       <span>"Photography is the art of transporting the past to the future"</span>
       <span>"Photography is the story I fail to put ito words"</span>
       <span>"Life is like Photography, you need the negatives to develop"</span>
       <span>"You don't take a photograph, you make it"</span>
       <span>"Life is like Photography, you need the negatives to develop"</span>
       <span>"There are no rules for good photographs, there are only good photographs"</span>
       </h4>
       </div>
       `
        container.appendChild(div);
    })
//_______________________________________________________________________________________


//getting the form id and storing it in a const variable- this means this variable name cannot be reassigned  
const inputText = document.getElementById("inputText"); // get the input el id and store in a variable

let clearTextField = () => {
    return inputText.value = "";
}

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the event from refreshing page

    let searchTopic = inputText.value; // store the users typed searc as a variable in or der to pass into the query string dynamically

    console.log('form event fired');
    console.log('input text value =>', searchTopic)


    let url = `https://api.unsplash.com/search/photos?query=${searchTopic}&per_page=21&client_id=BMOohXS2YcYfJKQkYYADqtZkkSWVQGpgRZ3qfiK_9Tk`;
    // This is the ajax/fetch call that gets the content for the body    
    async function getPhotoData(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            console.log('HERES THE DATA=>', data);
            return data.results;
        } catch (e) {
            console.log('failed reason =>', e)
        }

    }

    let h1 = document.createElement('h1');
    content.appendChild(h1);

    if (searchTopic === "" || searchTopic === undefined) {
        h1.id = 'searchMessage';
        h1.innerHTML = "Please type in a search topic";
    } else {
        content.removeChild(h1);
        // here I called the async function 
        getPhotoData(url)
            .then(objs => {
                console.log('pObjs results =>', objs)
                objs.forEach((e, i) => {
                    console.log('Each OBJECT LOOING=>', e); // give it an id tor reassign it  
                    let div = document.createElement('div');
                    //    let divId = div.id = 'resultsContainer';
                    div.classList.add('results-container');
                    div.innerHTML = `
            <a href=${e.links.download} target="_blank">
            <img class="photo" src="${e.urls.small}"/>
            </a>
            <div class= photo-details-container>
            <div class= photographer-info>
            <h4 class="photographer-sourceSite-name">
            <span class="photo-by"> Photo by </span><a class= "unsplash-and-portfolio-links" href=${e.user.links.html} target="_blank"> ${e.user.name}</a>
               <span class="photo-by"> on </span> <a class= "unsplash-and-portfolio-links" href="https://unsplash.com" target="_blank"> Unsplash </a> 
               </h4>
            </div>
            <a href=${e.links.html} target="_blank">
            <div class="download-button">
            Download
            </div>
            </a>
            <div>
            `
                    content.appendChild(div);
                    clearTextField();
                });
            })
    }
})





/*
LEFT OFF-- IMAGES ARE OVERFLOWING BECAUSE THEY ARE 400PX AND SCREEN 310PX
1. turn off overflow-x to none
2. header bar is no longer sticking, why?
3. maybe needed to reverse the orders of the calls, so that the last ajax call
is loaded on to the page las i.e. the top?
NOTE I FIXED THE ABOVE- SOLUTION? THE EAXCT GUESS FOR BOTH ABOVE
4. now flex the results-container after a 600px media query, only up to 3 pics per line


4/06/22--
!. create a flex-container
2.next add the author name and favicon on left side
3.an option to download or a link to the original site to download
4.wrap the whole picture in a link?

4/07/22--
1.wrap the getResults ajax call in a search/ form or input eventlistener
2.refactor the loop to add an id to each  results container about 10 per-page why?
3.this will cause each search to reassign new content to each containers id -- rather than adding on more to the page
4.probably add more pages? if so search unsplah docs to see how to do this 

*/