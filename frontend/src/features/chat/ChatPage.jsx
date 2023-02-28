import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SingleMsg from '../../components/chat/SingleMsg'
import ChatSide from './ChatSide'

import io from "socket.io-client"
import { useDispatch, useSelector } from 'react-redux'
import { getAllChats } from './chatSlice'
import { allMessages, sendFiles, sendMessage } from './chatService'
import EmojiPicker from 'emoji-picker-react'
import Dropzone from 'react-dropzone'
import { GrUploadOption } from 'react-icons/gr'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import InvoiceCreate from '../order/InvoiceCreate'
import AddressView from '../../components/order/AddressView'
import { invoiceChange } from '../package/packageSlice'

const ENDPOINT = 'http://localhost:4000'

let socket, selectedChatCompare

const ChatPage = () => {

    const user = useSelector(state => state.auth.user)
    const supplier = useSelector(state => state.supplier.supplier)

    const { selectedChat } = useSelector(state => state.chat)

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()

    const [emojiSelector, setEmojiSelector] = useState(false)

    const [socketConnected, setSocketConnected] = useState(false)

    const [invoiceData, setInvoiceData] = useState()
    const [invoice, setInvoice] = useState(false)

    const [packData, setPackData] = useState()

    const [addressSelect, setAddressSelect] = useState(false)

    const dispatch = useDispatch()

    const scrollRef = useRef()

    const status = user ? 'USER' : 'SUPPLIER';

    const fetchMessages = async () => {
        if (!selectedChat) {
            return
        }

        const result = await allMessages(selectedChat._id, status)
        setMessages(result)

        socket.emit('join chat', selectedChat._id)

    }


    useEffect(() => {

        dispatch(getAllChats(status))
    }, [dispatch])

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', selectedChat)
        socket.on('connection', () => setSocketConnected(true))
    })


    useEffect(() => {
        fetchMessages()

        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {

        socket.on('message recieved', (newMessageRecieved) => {

            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                //give notification
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])


    const handleSendMsg = async (e) => {
        if (newMessage) {
            setNewMessage('')
            const result = await sendMessage(newMessage, selectedChat._id, status)

            socket.emit('new message', result)

            setMessages([...messages, result])
        }
    }

    const handleTyping = (e) => {
        let { value } = e.target
        setNewMessage(value)
    }

    const onEmojiClick = (e) => {
        let emoji = e.emoji
        setNewMessage(prev => prev + emoji)
    }

    const handleFileSend = async (files) => {

        let formData = new FormData()

        formData.append('file', files[0])

        const fileData = await sendFiles(formData, status)

        const result = await sendMessage(fileData.url, selectedChat._id, status)

        socket.emit('new message', result)
    }
    const sendInvoice = async () => {
        
        const result = await sendMessage(JSON.stringify(invoiceData), selectedChat._id, status)

        socket.emit('new message', result)      
    }

    useEffect(() => {

        if(invoiceData) {
            sendInvoice()
        }
        
    }, [invoiceData])

//   const handleInvoicePay = () => {
//     dispatch(invoiceChange(packData))

//   }  


    

    return (
        <>
            <div class="relative flex w-screen h-[705px] overflow-hidden antialiased bg-gray-200">
        {
            addressSelect && <AddressView />
        }
                <ChatSide />
                {/* <!-- center --> */}
                <div class="relative flex flex-col flex-1">
                    
                    <div class="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-cover">
                        <div ref={scrollRef} class="self-center flex-1 w-full max-w-xl overflow-y-scroll hidden-scrollbar">
                            <div class="relative flex flex-col px-3 py-1 m-auto">
                                <div class="self-center px-2 py-1 mx-0 my-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">Channel was created</div>
                                <div class="self-center px-2 py-1 mx-0 my-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">May 6</div>

                                {messages?.length > 0 &&
                                    messages.map((each) => (
                                        <SingleMsg key={each._id} message={each} setPackData={setPackData}/>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            emojiSelector && (
                                <div className='ml-auto'>
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )
                        }
                        {
                            invoice && (
                                <InvoiceCreate setInvoiceData={setInvoiceData} setInvoice={setInvoice}/>
                            )
                        }
                        <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                            <div class="w-full">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-6">
                                    {
                                        status === 'SUPPLIER' ? (
                                            <button onClick={() => setInvoice(!invoice)}><FaFileInvoiceDollar /></button>
                                        ): null
                                    }
                                </span>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-6">

                                    <Dropzone onDrop={handleFileSend}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <button className='hover:'><GrUploadOption /></button>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>

                                    <button onClick={() => setEmojiSelector(!emojiSelector)} >emoji</button>
                                    <button onClick={handleSendMsg} type="submit" class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                        <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill-rule="nonzero" d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z" />
                                        </svg>
                                    </button>
                                </span>
                                <input onChange={handleTyping} value={newMessage} type="search"
                                    class="w-full py-2 pl-10 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                                    placeholder="Message..." autocomplete="off" />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default ChatPage