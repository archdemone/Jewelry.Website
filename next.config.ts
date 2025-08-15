import type { NextConfig } from 'next'
import configJs from './next.config.js'
const configTs: NextConfig = configJs as unknown as NextConfig
export default configTs


