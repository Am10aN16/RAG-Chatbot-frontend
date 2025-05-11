import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState(uuidv4());
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newUserMsg = { from: 'user', text: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        const res = await axios.post('http://localhost:5000/api/chat', {
            message: input,
            sessionId,
        });
        setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    };

    const resetSession = () => {
        setSessionId(uuidv4());
        setMessages([]);
    };

    return (
        <div className="w-full max-w-2xl p-4 shadow-lg rounded-lg border h-[80vh] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} from={msg.from} text={msg.text} />
                ))}
                <div ref={chatEndRef}></div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Ask a question..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send
                </button>
                <button onClick={resetSession} className="bg-red-500 text-white px-4 py-2 rounded">
                    Reset
                </button>
            </div>
        </div>
    );
}