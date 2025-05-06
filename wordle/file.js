export const writePokemonFile = (pokemon) => {
  // Forma "sencilla"
  return Deno.writeTextFile("solution.txt", pokemon)
  // Forma con encode
  // const encoder = new TextEncoder()
  // const bytes = encoder.encode(pokemon)

  // return Deno.writeFile('./solution.txt', bytes)
}


