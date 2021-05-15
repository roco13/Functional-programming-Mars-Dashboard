let store =  Immutable.Map({
    title: 'Mars Dashboard',
    rovers: ['opportunity', 'curiosity','spirit'],
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    //root.innerHTML = App(rover, state)
    root.innerHTML = App(state)
    console.log("data shuld be displayed on the secreen")
}

//create navigation with inputs
const createRoverNav = ()=> {
    const nav = document.getElementById('menu')
    const title = document.getElementById('title')
    title.innerHTML = `${store.get("title")}`
    nav.innerHTML
    for ( rover of store.get("rovers")) {
        let ele =  `<input type="button" value="${rover}" id="${rover}" name="${rover}" onClick="getLatestImage('${rover}')">`
        nav.innerHTML += ele;
    }
}
window.addEventListener("load", () => {
    //On load create menu with onclick
    createRoverNav();
});


const RoverImages = (state) => {
    let imgList =  state.latestPhotos       
    //get all the images and use .map to create a div containing the image
    console.log("state.latest_photos", state.latestPhotos)
    return imgList.map((img, index) => {
        while(index < 10){
            return `
            <div class="gallery-image">
                <img src="${ img.img_src}" />
                <p><span>Photo taken on: </span>${img.earth_date}</p>
            </div>`
        }
        
    });
  }
const RoverData = (state) => {
    //get the information about the rover, it is the same for each image. Get it from the first image
    let firstImage =  state.latestPhotos[0]
    return `
    <div class="gallery-rover-description">
        <p><span>Rover Name:</span> ${firstImage.rover.name}</p>
        <p><span>Landing Date</span>: ${firstImage.rover.landing_date}</p>
        <p><span>Launch Date</span>: ${firstImage.rover.launch_date}</p>
        <p><span>Status</span>: ${firstImage.rover.status}</p>
    </div>`
}

//create HTML content
const App = (state) => {
    return `
    <div class="gallery">
        ${RoverData(state)}
        <div class="gallery-list">
            ${RoverImages(state)}
        </div>
    </div>`
}

// ------------------------------------------------------  API CALLS

const getLatestImage = (rover) => {
    console.log('rover api', rover)
    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())  
        .then((galleryImages) => {
            latestPhotos = galleryImages.latest_photos;
            updateStore(store, { latestPhotos });          
        });      
}

