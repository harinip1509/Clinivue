import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Upload,
  Paperclip,
  Sparkles,
  User,
  Bot,
  Image as ImageIcon,
  File,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: { name: string; type: string; size: string }[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm your AI Health Assistant. I can help explain your medical reports, answer health questions, and provide guidance. How can I help you today?",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  'What does my cholesterol level mean?',
  'Explain my blood test results',
  'What are normal blood pressure ranges?',
  'How can I improve my health?',
];

export function PatientChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(2) + ' KB',
      })),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('cholesterol')) {
      return "Based on your recent blood test, your total cholesterol is 225 mg/dL, which is slightly elevated. The ideal level is below 200 mg/dL. This means there's a bit more fat in your blood than optimal, but it's manageable!\n\nHere's what you can do:\n• Eat more fiber-rich foods (oats, beans, vegetables)\n• Choose healthier fats (olive oil, nuts, avocados)\n• Exercise regularly (30 mins most days)\n• Limit saturated fats and trans fats\n\nWould you like specific meal suggestions or exercise recommendations?";
    }
    
    if (lowerQuestion.includes('blood test')) {
      return "I'd be happy to explain your blood test results! Your recent CBC (Complete Blood Count) shows:\n\n✓ Red Blood Cells: 4.8 million/mcL - Normal ✓\n✓ White Blood Cells: 7,200/mcL - Normal ✓\n⚠️ Cholesterol: 225 mg/dL - Slightly High\n✓ Blood Sugar: 95 mg/dL - Normal ✓\n\nOverall, your results are good! The only area that needs attention is cholesterol, which we can improve with lifestyle changes. Would you like tips on managing cholesterol?";
    }

    if (lowerQuestion.includes('blood pressure')) {
      return "Normal blood pressure ranges are:\n\n• Normal: Less than 120/80 mm Hg\n• Elevated: 120-129 systolic and less than 80 diastolic\n• High Blood Pressure (Hypertension) Stage 1: 130-139 systolic or 80-89 diastolic\n• High Blood Pressure Stage 2: 140/90 mm Hg or higher\n\nYour last reading was 118/76 mm Hg, which is excellent! This means your heart is pumping blood efficiently without putting too much pressure on your arteries. Keep up the good work!";
    }

    if (lowerQuestion.includes('improve') || lowerQuestion.includes('health')) {
      return "Great question! Based on your health profile, here are personalized recommendations:\n\n🥗 Nutrition:\n• Focus on reducing saturated fats\n• Eat more fruits and vegetables (5+ servings daily)\n• Choose whole grains over refined grains\n\n🏃 Exercise:\n• Aim for 150 minutes of moderate activity weekly\n• Include both cardio and strength training\n• Even a 30-minute walk daily helps!\n\n😴 Lifestyle:\n• Get 7-9 hours of quality sleep\n• Manage stress through meditation or hobbies\n• Stay hydrated (8 glasses of water daily)\n\nWould you like a detailed meal plan or exercise routine?";
    }

    return "I'm here to help you understand your health better! I can:\n\n• Explain your medical reports in simple terms\n• Answer questions about test results\n• Provide health tips and recommendations\n• Help you understand medical terminology\n\nFeel free to ask me anything about your health or upload a report for analysis!";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <Card className="backdrop-blur-xl bg-white/80 border-white/50 shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#14b8a6] flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              AI Health Assistant
            </h1>
            <p className="text-sm text-gray-600">Ask me anything about your health and reports</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </Card>

      {/* Chat Container */}
      <Card className="flex-1 backdrop-blur-xl bg-white/70 border-white/50 shadow-xl flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-[#3b82f6]'
                    : 'bg-[#14b8a6]'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[70%] ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                } flex flex-col gap-2`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-[#14b8a6] text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-white/20'
                              : 'bg-gray-50'
                          }`}
                        >
                          {file.type.includes('image') ? (
                            <ImageIcon className="w-4 h-4" />
                          ) : (
                            <File className="w-4 h-4" />
                          )}
                          <span className="text-xs flex-1">{file.name}</span>
                          <span className="text-xs opacity-70">{file.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 px-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border-2 border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggested Questions (only show at start) */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-sm text-gray-600 text-center">Suggested questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="p-3 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-300 hover:shadow-md transition-all text-left text-sm text-gray-700"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white/50 backdrop-blur-sm">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200"
                >
                  {file.type.includes('image') ? (
                    <ImageIcon className="w-4 h-4 text-teal-600" />
                  ) : (
                    <File className="w-4 h-4 text-teal-600" />
                  )}
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-12 w-12 rounded-xl flex-shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message... (Shift + Enter for new line)"
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none resize-none bg-white"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() && attachedFiles.length === 0}
              className="h-12 px-6 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}