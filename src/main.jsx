import React from 'react'
import ReactDOM from 'react-dom/client'
import * as amplitude from '@amplitude/analytics-browser'
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser'
import './styles/globals.css'
import App from './App'

// Plugin must be added before init() — Amplitude's device/session ID
// matching relies on the session replay plugin being present when the
// analytics SDK first establishes its config.
amplitude.add(sessionReplayPlugin({ sampleRate: 1 }))
amplitude.init('388017705d809ac123ac2101e9b2d6b7', { autocapture: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
