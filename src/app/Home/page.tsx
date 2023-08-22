'use client'

import { Chat } from "@/components/Chat"
import { useState } from "react"

export function Home() {
    const [usernameOne, setUsernameOne] = useState('')
    const [usernameTwo, setUsernameTwo] = useState('')
    const [isChatOnline, setIsChatOnline] = useState(false)

    function handleStartChat() {
        if (usernameOne.trim() !== '' && usernameTwo.trim() !== '' && usernameOne !== usernameTwo) {
            setIsChatOnline(true)
        } else {
            alert('Preencha os campos corretamente.')
        }
    }

    return (
        <div className="w-full h-full flex justify-center mt-5">
            <div className="container flex flex-col items-center">
                <h1 className="text-2xl">Chat simples</h1>

                <div className="mt-8 w-full max-w-xl">
                    {isChatOnline === false &&
                        <>
                            <span className="text-lg">Nomes de usuário</span>
                            <div className="flex flex-col mt-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Digite seu nome"
                                    className="flex-1 rounded px-2 py-2 bg-zinc-800 border-2 border-zinc-700 outline-none"
                                    onChange={e => setUsernameOne(e.target.value)}
                                    value={usernameOne}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Digite o nome do segundo usuário"
                                    className="flex-1 rounded px-2 py-2 bg-zinc-800 border-2 border-zinc-700 outline-none"
                                    onChange={e => setUsernameTwo(e.target.value)}
                                    value={usernameTwo}
                                />
                                <div className="text-center">
                                    <button
                                        className="py-2 w-64 bg-zinc-800 rounded border-2 border-zinc-700 ease-in-out duration-100 hover:brightness-75"
                                        onClick={handleStartChat}
                                    >
                                        Iniciar chat
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                        {isChatOnline &&
                            <div className="flex mt-2 gap-3">
                                <Chat usernameOne={usernameOne} usernameTwo={usernameTwo} />
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}