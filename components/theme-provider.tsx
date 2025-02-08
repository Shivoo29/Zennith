'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { createGlobalStyle, type DefaultTheme } from 'styled-components'

const GlobalStyle = createGlobalStyle<DefaultTheme>`
  :root {
    --neon-pink: #ff2e88;
    --neon-blue: #00fff9;
    --neon-purple: #bd00ff;
    --dark-bg: #0a0a0f;
    --grid-color: rgba(99, 179, 237, 0.05);
  }

  body {
    background: var(--dark-bg);
    background-image: 
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 30px 30px;
    color: #fff;
  }

  ::selection {
    background: var(--neon-pink);
    color: var(--dark-bg);
  }
`

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      {...props}
    >
      <GlobalStyle />
      {children}
    </NextThemesProvider>
  )
}
