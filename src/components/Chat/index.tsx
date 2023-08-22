import { KeyboardEvent, useState } from "react";

type Props = {
    usernameOne: string;
    usernameTwo: string;
};

type ChatMessage = {
    sender: string;
    text: string;
};

export function Chat({ usernameOne, usernameTwo }: Props) {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [userOneTextInput, setUserOneTextInput] = useState('');
    const [userTwoTextInput, setUserTwoTextInput] = useState('');

    function handleSendMessage(event: KeyboardEvent<HTMLInputElement>, sender: string) {
        if (event.key.toLowerCase() === "enter") {
            const textInput = sender === usernameOne ? userOneTextInput : userTwoTextInput;
            if (textInput.trim() !== "") {
                const newChatHistory = [
                    ...chatMessages,
                    { 
                        sender, 
                        text: textInput 
                    },
                ];
                setChatMessages(newChatHistory);
                setUserOneTextInput('');
                setUserTwoTextInput('');
            }
        }
    }

    return (
        <div className="max-w-xl w-full h-[600px] max-h-full relative">
        <div className="border-2 border-zinc-700 rounded w-full h-full max-h-full overflow-hidden">
            <div className="overflow-y-scroll max-h-full custom-scroll-style p-3">
                {chatMessages.map((message, key) => (
                    <div key={key} className="mb-4">
                        <div 
                            className={`
                                p-2 bg-zinc-800 w-60 max-w-full rounded
                                ${message.sender === usernameTwo ? 'ml-auto' : ''}
                            `}
                        >
                            <span className="text-gray-500 font-bold">{message.sender}</span>
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full flex flex-col">
                <input
                    type="text"
                    placeholder={`${usernameOne}, digite uma mensagem e pressione enter`}
                    className="border-2 border-zinc-700 bg-black px-2 py-2 outline-none rounded disabled:cursor-not-allowed"
                    onChange={(e) => setUserOneTextInput(e.target.value)}
                    value={userOneTextInput}
                    onKeyUp={(e) => handleSendMessage(e, usernameOne)}
                    disabled={userTwoTextInput !== ''}
                />
                <input
                    type="text"
                    placeholder={`${usernameTwo}, digite uma mensagem e pressione enter`}
                    className="border-2 border-zinc-700 bg-black px-2 py-2 outline-none rounded disabled:cursor-not-allowed"
                    onChange={(e) => setUserTwoTextInput(e.target.value)}
                    value={userTwoTextInput}
                    onKeyUp={(e) => handleSendMessage(e, usernameTwo)}
                    disabled={userOneTextInput !== ''}
                />
            </div>
        </div>
        </div>
    );
    }
