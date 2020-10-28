const LOCAL_HOST = 'http://localhost:3000/'
const socket = io.connect(LOCAL_HOST)

const userId = `Username${Math.round(Math.random() * 100)}`
document.getElementsByName('username')[0].value = userId

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

    document.getElementsByName('message')[0].value = ''
})

const renderMessage = (message) => {
    document.getElementById('messages').insertAdjacentHTML(
        'beforeend',
        formatMessage(message)
    )
}

const formatMessage = (objMessage) => {
    const { author, message } = objMessage

    let isUserMessage = (userId == author) ? 'active' : ''

    return (
        `<div class="message ${isUserMessage}">
            <div class="message-body">
                <strong>${author}</strong>
                <p>${message}</p>
            </div>
        </div>`
    )
}