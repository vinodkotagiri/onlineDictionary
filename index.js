function initApp(){
    function getData(word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => initialize(data))
            .catch(error => console.log(error))
            .finally(console.log("fetched successfully!"));
        function initialize(data) {
            let wordData = data;
            updateUI(wordData);
        }
    }
    
    function updateUI(data) {
        //Get DOM elements
        let word = document.getElementById("word");
        let phonetic = document.getElementById("phonetic");
        let playBtn = document.getElementById("playBtn");
        let audio = document.getElementById("audio");
        let content = document.getElementById("content");
    
        //Set elements values to the fetched Data
        word.innerText = data[0].word;
        phonetic.innerText = data[0].phonetic;
        audio.setAttribute("src", data[0].phonetics[0].audio);
        let meanings = []
        data[0].meanings.map((meaning) => meanings.push(meaning));
        console.log(meanings[0].partOfSpeech, meanings[0].definitions[0].definition)
        meanings.map((meaning) => {
            content.innerHTML +=
                `<p id="pos">${meaning.partOfSpeech}</p><hr>`
            meaning.definitions.map(def => {
                content.innerHTML += `<p id="def">${def.definition}</p>`
            })
        })
        playBtn.addEventListener("click", () => {
            audio.play();
        })
    }
    
    // function to handle the search event
    function getSearchWord(){
        let search=document.getElementById("searchField");
        let searchBtn=document.getElementById("searchBtn");
        let container=document.getElementById("word-details");
        // Add event listener to search button
        searchBtn.addEventListener("click",()=>{
            let word=search.value;
            container.style.visibility="visible";
            getData(word);

        });
        //Add event listener to return key
        search.addEventListener("keypress",(event)=>{
            if(event.key=="Enter"){
                let word=search.value;
                container.style.visibility="visible";
                getData(word);
            }

        })

    }
    getSearchWord();
}
window.onload=initApp;