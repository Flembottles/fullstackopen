```mermaid
sequenceDiagram
participant browser
participant server
participant spa.js

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of browser: The data of the new note is sent as a JSON to the server, which is then processed by spa.js

spa.js-->>browser: Push New note to browser
```
