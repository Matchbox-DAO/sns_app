import { createGlobalStyle } from 'styled-components'

export const FixedGlobalStyle = createGlobalStyle`

@font-face {
    font-family: Overpass;
    src: url('https://fonts.googleapis.com/css2?family=Overpass:wght@300;400;500;600;700&display=swap');
}

html, input, textarea, button {
  font-family: Overpass, sans-serif;
  font-display: fallback;
 }

 @supports (font-variation-settings: normal) {
  html, input, textarea, button {
  font-family: Overpass, sans-serif;
   }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
    background-color: #44318d;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(400px);
}

body {
  min-height: 100vh;
  background-color: #44318d;
  backdrop-filter: blur(400px);
  background-repeat: no-repeat;
  background-size: cover;
}
`
