import { bold, white, bgGreen, bgYellow, bgBrightBlack } from "jsr:@std/fmt/colors"
import { isCreative } from './env.js'
import { writePokemonFile } from './file.js'

const tries = 1
const MAX_TRIES = 6
const previousGuesses = []
const colorMethods = {
  green: bgGreen,
  yellow: bgYellow,
  gray: bgBrightBlack
}

let globalResults = ''
const POKEMON_AVAILABLE = 850
const randomId = Math.ceil(Math.random() * (POKEMON_AVAILABLE - 1))

const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  .then(res => res.json())
  .then(response => response.name.toUpperCase())

if (isCreative) {
  writePokemonFile(pokemon)
}

function askWord () {
  const typed = prompt('The Pokemon is...')

  if (typed == null) {
    return { error: 'You must be write a pokemon name.' }
  } 
  else if (typed.length !== pokemon.length) {
    return { error: 'Pokemon must be have ' + pokemon.length + ' characteres long'}
  } 
  else if (previousGuesses.includes(typed.toUpperCase())) {
    return { error: 'You already try this pokemon name.'}
  } 
  else if (!/^[a-zA-Z]+$/.test(typed)) {
    return { error: 'The pokemon name must be only letters'}
  }

  return { typed: typed.toUpperCase() }
}

function colorLetters (color, letter) {
  const bg = colorMethods[color]
  const styledLetter =  bg(bold(` ${white(letter)} `))
  return ` ${styledLetter} `
}

function print (guess) {
  console.clear()

  let results = ''
  const letters = [...guess]

  letters.forEach((letter, index) => {
    if (letter === pokemon[index]) {
      results += colorLetters('green', letter)
    } else if (pokemon.includes(letter)) {
      results += colorLetters('yellow', letter)
    } else {
      results += colorLetters('gray', letter)
    }
  })

  globalResults += `${results}\n\n`
  console.log(globalResults)
}

function start (tries) {
  if (tries >= MAX_TRIES) {
    console.log('You lost')
    console.log('The pokemon was ' + pokemon)
    return
  }

  let guess = ''
  while (guess === '') {
    const { error, typed } = askWord()
  
    if (error) {
      console.error(error)
      continue
    }
  
    if (typed) guess = typed
  }

  if (guess === pokemon) {
    print(guess)
    console.log('You Won!')
  } else {
    print(guess)
    tries++
    console.log('')
    console.log(tries)
    start(tries)
  }

}

console.log('Let\'s play a game!! Guess the pokemon name')
console.log(`Hint: It has ${pokemon.length} characters...`)
start(tries)