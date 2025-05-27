import "dotenv"
import toBoolean from "bool"

// export const isCreative = !!Deno.env.get('CREATIVE_MODE')
export const isCreative = toBoolean(Deno.env.get('CREATIVE_MODE'))