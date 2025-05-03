const MAX_TRIES = 6
const previousGuesses = []

let globalResults = ''

const pokemon = 'pikachu'

function askWord () {
  const typed = prompt('The Pokemon is...')
  console.log(typed)

  if (typed === undefined) {
    return { error: 'You must be write a pokemon name.' }
  } 
  else if (typed.length !== pokemon.length) {
    return { error: 'Pokemon must be have ' + pokemon.length + ' characteres long'}
  } 
  else if (previousGuesses.includes(typed)) {
    return { error: 'You already try this pokemon name.'}
  } 
  else if (!/^[a-zA-Z]+$/.test(typed)) {
    return { error: 'The pokemon name must be only letters'}
  }

  return { response: typed}
}

let guess = ''
let tries = 0

while (guess === '') {
  const { error, response } = askWord()

  if (error) {
    console.error(error)
    continue
  }

  if (response) guess = response
}