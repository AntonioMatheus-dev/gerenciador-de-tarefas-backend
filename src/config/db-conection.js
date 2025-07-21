import 'dotenv/config'
import postgres from 'postgres'

const DATABASE_URL_DEV = process.env.DATABASE_URL_DEV

export const sql = postgres(DATABASE_URL_DEV, {})

