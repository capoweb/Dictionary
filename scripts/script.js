
let state = {
    word:"",
    meanings:[],
    phonetics:[],
}

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const input = document.getElementById('word-input')
const form = document.querySelector('.form')
const containerWord = document.querySelector('.results-word')
const soundButtonGB = document.querySelector('.results-sound-gb')
const soundButtonUS = document.querySelector('.results-sound-usa')
const resultsWrapper = document.querySelector('.results')
const resultsList = document.querySelector('.results-list')
const errorBlock = document.querySelector('.error-block')

const showError = (error) =>{
    errorBlock.style.display = "block"
    resultsWrapper.style.display ="none"
    errorBlock.innerText = error.message;
}



const renderDefinition = (ItemDefinition) =>{
const example = ItemDefinition.example 
    ?`<div class="results-item-example">Example: ${ItemDefinition.example}
    </div>`
    : ""

return `<div class="results-item-definition">
        <p>${ItemDefinition.definition}</p>
        ${example}
    </div>`
};

const getDefinitions = (definitions) =>{
    return definitions.map(renderDefinition).join("")
}




const renderItem = (item) =>{
    const ItemDefinition = item.definitions[0]
    return `<div class="results-item">
    <div class="results-item-part">${item.partOfSpeech}</div>
    <div class="results-item-definitions">
        ${getDefinitions(item.definitions)}
    </div>
</div>`
}


const showResult = () =>{
    resultsWrapper.style.display = 'block';
    resultsList.innerHTML = ""
    state.meanings.forEach((item)=> resultsList.innerHTML += renderItem(item)) 
}

const insertWord = () =>{
    containerWord.innerText = state.word;
}

const submitHandler = async(e) =>{
    e.preventDefault();

    if(!state.word.trim()) return ;
    try{
    const response = await fetch (`${url}${state.word}`)
    const data = await response.json()
    console.log(data)

    if(response.ok && data.length){
        const item = data[0]
        console.log('это data от [0]' + item)

        state = {
            ...state,
            meanings:item.meanings,
            phonetics:item.phonetics,

        }
        showResult()
        insertWord()
        
    }else{
        showError(data)
    }
} catch(err){
        console.log(err)
   }
}

const inputHandler = (e) =>{
    const value = e.target.value
    state.word = value
}

const soundGBHandler = () =>{
    if(state.phonetics.length){
        const soundGB = state.phonetics[1]
    if(soundGB.audio){
        new Audio(soundGB.audio).play()
    }
    }
}

const soundUSHandler = () =>{
    if(state.phonetics.length){
        const soundUS = state.phonetics[0]
    if(soundUS.audio){
        new Audio(soundUS.audio).play()
    }
    }
}

form.addEventListener('submit',submitHandler)
input.addEventListener('keyup',inputHandler)
soundButtonGB.addEventListener('click',soundGBHandler)
soundButtonUS.addEventListener('click', soundUSHandler)

