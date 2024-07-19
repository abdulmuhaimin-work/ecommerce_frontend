import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock global properties
config.global.mocks = {
  $filters: {
    currency: (value) => `$${parseFloat(value).toFixed(2)}`
  }
}

// Mock other global properties or plugins as needed