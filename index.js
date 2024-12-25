// const { text } = require("body-parser");
// const { Messages } = require("openai/resources/beta/threads/messages.mjs");



async function processInput() {
    const textInput = document.getElementById("textInput").value;
    const languageRadios = document.getElementsByName("choice")
    let selectedLanguage = "";
    
    for(const radio of languageRadios) {
        if (radio.checked) {
            selectedLanguage = radio.value;
            break;
        }
    }
    console.log("selectedLanguage: ", selectedLanguage);

    try {
        const response = await fetch("https://translator-backend-ychh.onrender.com/call-openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {role: "system", content: `translate this text to ${selectedLanguage}.`},
                    {role: "user", content: textInput},
                ],
            })
        })
        const data = await response.json()
        console.log("API Response: ", data.response)
        // document.getElementById("output").textContent = data.response
        typeResponse(data.response);
    } catch (error) {
        console.log("Error during API call", error)
    }

}

function typeResponse(text){
    const outputElement = document.getElementById("output")
    outputElement.textContent = ""
    let index = 0

    function type(){
        if(index < text.length){
            outputElement.textContent += text[index]
            index++
            setTimeout(type, 30)
        }
    }
    type()
}