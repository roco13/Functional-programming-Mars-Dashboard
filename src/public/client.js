let store =  {
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}
//create content
const App = (state) => {
    //console.log('state, ', state)
    let { rovers, apod } = state
    //display data in the browser
    return `${ImageOfTheDay(apod, 'curiosity')}`

}

window.addEventListener('load', ()=> {
    console.log('rendering image')

    render(root, store)
})
// ------------------------------------------------------  COMPONENTS




const ImageOfTheDay = (apod, rover) => {
    //getImageOfTheDay(store)
    
    if (!apod){
        getLatestImage(store, rover)
    }


    if (apod.galleryImages.latest_photos){
        apod.galleryImages.latest_photos.map((img,index) =>{
            return `<div>
                        <img src="${ img.img_src}" />
                        <p>earth_date ${img.earth_date}</p>
                        <p>landing_date: ${img.rover.landing_date}</p>
                        <p>launch_date: ${img.rover.launch_date}</p>
                        <p>status: ${img.rover.status}</p>
                    </div>`
        })
    }           
    

}

// ------------------------------------------------------  API CALLS
const getLatestImage = (state, rover) => {
    let { apod } = state

    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
