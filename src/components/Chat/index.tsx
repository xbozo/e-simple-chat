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
  const [userOneTextInput, setUserOneTextInput] = useState("");
  const [userTwoTextInput, setUserTwoTextInput] = useState("");

  function handleSendMessage(
    event: KeyboardEvent<HTMLInputElement>,
    sender: string,
  ) {
    if (event.key.toLowerCase() === "enter") {
      const textInput =
        sender === usernameOne ? userOneTextInput : userTwoTextInput;
      if (textInput.trim() !== "") {
        const newChatHistory = [
          ...chatMessages,
          {
            sender,
            text: textInput,
          },
        ];
        setChatMessages(newChatHistory);
        setUserOneTextInput("");
        setUserTwoTextInput("");
      }
    }
  }

  return (
    <div className="relative h-[600px] max-h-full w-full max-w-xl">
      <div className="h-full max-h-full w-full overflow-hidden rounded border-2 border-zinc-700">
        <div className="custom-scroll-style max-h-full overflow-y-scroll p-3">
          {chatMessages.map((message, key) => (
            <div key={key} className="mb-4">
              <div
                className={`
                  w-60 max-w-full rounded bg-zinc-800 p-2
                  ${message.sender === usernameTwo ? "ml-auto" : ""}
              `}
              >
                <span className="font-bold text-gray-500">
                  {message.sender}
                </span>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col">
          <input
            type="text"
            placeholder={`${usernameOne}, digite uma mensagem e pressione enter`}
            className="rounded border-2 border-zinc-700 bg-black px-2 py-2 outline-none disabled:cursor-not-allowed"
            onChange={(e) => setUserOneTextInput(e.target.value)}
            value={userOneTextInput}
            onKeyUp={(e) => handleSendMessage(e, usernameOne)}
            disabled={userTwoTextInput !== ""}
          />
          <input
            type="text"
            placeholder={`${usernameTwo}, digite uma mensagem e pressione enter`}
            className="rounded border-2 border-zinc-700 bg-black px-2 py-2 outline-none disabled:cursor-not-allowed"
            onChange={(e) => setUserTwoTextInput(e.target.value)}
            value={userTwoTextInput}
            onKeyUp={(e) => handleSendMessage(e, usernameTwo)}
            disabled={userOneTextInput !== ""}
          />
        </div>
      </div>
    </div>
  );
}
