import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { emailApi } from './server/api.js'

// https://vite.dev/config/
export default defineConfig({
  // emailApi: local /api routes that run Claude Code for the Create Emailer wizard
  plugins: [react(), emailApi()],
})
