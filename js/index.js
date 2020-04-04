const API_KEY = "AIzaSyB0no0jwLwehJSX3vvxMqoCv3cCDTcq9yM";

function fetchVideos(searchTerm){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchTerm}`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function displayResults( data ){
    let results = document.querySelector( '.results' );

    results.innerHTML= "";

    for( let i = 0; i < data.items.length; i ++ ){
        results.innerHTML += `
            <div>
               <h2>
                    <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">
                    ${data.items[i].snippet.title}
                    </a>
                </h2>
                
               <div>
                    <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">
                    <img src="${data.items[i].snippet.thumbnails.medium.url}" />
                    </a>
                </div>
            </div>
        `;
   }

}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchVideos( searchTerm );

    });
}

function init(){
    watchForm();
}

init();