export default function MessageBubble({ from, text }) {
    const isUser = from === 'user';
    return (
        <div
            className={`max-w-[70%] px-4 py-2 rounded-lg ${isUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
                }`}
        >
            {text}
        </div>
    );
}