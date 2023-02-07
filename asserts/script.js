


let state = {
    word: "",
    meanings:[],
    phonetics:[],
}
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById("word-input");
const form = document.querySelector(".form");
const containerWord = document.querySelector('.results-word')
const soundButton = document.querySelector('.results-sound')
const soundButtonUSA = document.querySelector('.sound-usa')
const resultsWrapper = document.querySelector('.results')
const resultsList = document.querySelector('.results-list')


const renderItem = (item) =>{
    const itemDefinition = item.definitions[0];
    return `<div class="result-item">
    <div class="results-item__part">${item.partOfSpeech}</div>

    <div class="results-item__definitions">
        <div class="results-item__definition">
            <p>${itemDefinition.definition}</p>
            <div class="results-item_examle">${itemDefinition.example}</div>
        </div>
        </div>
    </div>`

}

const showResults = () =>{
    resultsWrapper.style.display = 'block';

    resultsList.innerHTML = "";

    state.meanings.forEach((item)=> resultsList.innerHTML += renderItem(item))
};


const insertmainWord = () => {
    containerWord.innerText = state.word;
};

const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!state.word.trim()) return;

    try{
    const response = await fetch(`${url}${state.word}`);
    const data = await response.json();

        if(response.ok && data.length){
            const item = data[0];

            state = {
                ...state,
                meanings: item.meanings,
                phonetics:  item.phonetics,
            }
            showResults();
            insertmainWord();
        }
    }catch (err){
        console.log(err)
}
}

const handleKeyup= (e) =>{
    const value = e.target.value;
    state.word = value;
}

const handleSound = () =>{
    if(state.phonetics.length){
        const sound = state.phonetics[0];
        if(sound.audio){
            new Audio(sound.audio).play()
        }
    }
}

const handleSoundUSA = () =>{
    if(state.phonetics.length){
        const soundUSA = state.phonetics[1];
        if(soundUSA.audio){
            new Audio(soundUSA.audio).play()
        }
    }
}

input.addEventListener('keyup',handleKeyup);
form.addEventListener('submit',handleSubmit);
soundButton.addEventListener('click',handleSound);
soundButtonUSA.addEventListener('click',handleSoundUSA);

