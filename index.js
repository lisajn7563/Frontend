//console.log('Hello!')


var variableName = "" // väldigt sällan vi använder var

// variabler som används

let letVariableName = "" 
const constVariableName = "" // string

// primetiva värden

const boolValue = false // så const ändrar sin variabel beroende på vad du skriver efter = 

const constVariableName2 = 5 // number, de blir de atomatiskt om jag lägger till en siffra

const nullValue = null 

const undefinedValue = undefined

const personInfo = {
    id: 1, 
    name: 'Lisa',
    lastName: 'Johansson',
    age: 28
}

const arrayValue = [1, 2, 3, 4]

const arryaValue2 = ["päron", 'äpple', `apelsin ${personInfo.name}`, 1, 2, 3, true, false, null ]

////console.log(personInfo)

arrayValue.push('kiwi')

//console.log(arrayValue)

const cheatCode = new Map

cheatCode.set('infinite gold', 1234567890)
cheatCode.set('god mode', 1177)
cheatCode.set('tank',1990)

//console.log(cheatCode.has('god mode'))
//console.log(cheatCode.get('tank'))
//console.log(cheatCode.keys())

const setVariable = new Set // lista med unika värden

setVariable.add(9)
setVariable.add(4)
setVariable.add(6)
setVariable.add(11)
setVariable.add(11)


const button = document. document.querySelector('button')

function addToCart() {
    alert('knapptryck')
}
button.addEventListener('click', function() {
    alert('du klickar på knappen - hej')
})




