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

const insertWord = () =>{
    containerWord.innerText = state.word;
    console.log(containerWord)
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
        console.log(item)

        state = {
            ...state,
            meanings:item.meanings,
            phonetics:item.phonetics,

        }

        insertWord()
        
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
        const soundUS = state.phonetics[2]
    if(soundUS.audio){
        new Audio(soundUS.audio).play()
    }
    }
}


form.addEventListener('submit',submitHandler)
input.addEventListener('keyup',inputHandler)
soundButtonGB.addEventListener('click',soundGBHandler)
soundButtonUS.addEventListener('click', soundUSHandler)
