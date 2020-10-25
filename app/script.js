const socket = io.connect('http://localhost:3000/')

document.getElementsByName('username')[0].value = `User ${Math.floor(Math.random() * 11)}`
document.getElementsByName('message')[0].value = `Message ${Math.round(Math.random() * 10)}`

socket.on('previous_message', messages => {
    messages.forEach(message => {
        renderMessage(message)
    })
})

socket.on('received_message', message => {
    renderMessage(message)
})

document.getElementById('chat').addEventListener('submit', event => {
    event.preventDefault()

    let author = document.getElementsByName('username')[0].value
    let message = document.getElementsByName('message')[0].value

    if (message.length > 0) {
        const objMessage = {
            author: author,
            message: message
        }

        renderMessage(objMessage)

        socket.emit('send_message', objMessage)
    }
    
})

function renderMessage(message) {
    let messages = document.getElementById('messages')
    let markup = `<p><strong>${message.author}: </strong>${message.message}</p>`
    messages.insertAdjacentHTML('beforeend', markup)
}