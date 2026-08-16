import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Settings, Sparkles, Loader2, Key } from 'lucide-react';
import { getAISettings, saveAISettings, callGeminiAPI, getSystemPrompt, getWhatsAppLink, extractLeadFromMessage } from '../../utils/ai';
import { saveLead } from '../../utils/leadsStorage';
import { fireConfetti } from '../../utils/confetti';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const SUGGESTED_PROMPTS = [
  { label: '🏠 Show Properties', text: 'Show me available farmhouse properties and prices' },
  { label: '📅 Book Site Visit', text: 'I want to book a site visit' },
  { label: '💰 Check EMI', text: 'Calculate EMI for 1BHK farmhouse' },
  { label: '📍 Location Info', text: 'Tell me about the location advantages' },
  { label: '📞 Call Me Back', text: 'Please call me back for more details' },
];

function getRuleBasedResponse(userMessage: string): { text: string; action?: 'whatsapp' | 'site_visit' | 'lead' } {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('namaste')) {
    return {
      text: 'Hello! 👋 Welcome to Green Orchid Farm Land. I\'m Ganesh AI, your personal property assistant. How can I help you today?\n\nI can help you with:\n- 🏠 Property details & pricing\n- 📅 Booking a FREE site visit\n- 💰 EMI calculations\n- 📍 Location advantages\n- 📞 Call back requests',
    };
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('budget') || msg.includes('how much') || msg.includes('₹')) {
    return {
      text: 'Great question! 💰 Here are our current offers:\n\n🔥 **1BHK Luxury Farmhouse** — ₹21,00,000\n   Plot: 121 sq.yds | House: 350 sq.ft\n   (Original: ₹24,00,000 — Limited Offer!)\n\n✅ Includes: 2 Years FREE Maintenance + 8 Premium Furniture Items\n\n💳 We offer a flexible 24-month payment plan with just 25% booking amount!\n\nWould you like me to connect you with R. Ganesh Sir on WhatsApp for exact payment schedules?',
      action: 'whatsapp',
    };
  }

  if (msg.includes('emi') || msg.includes('loan') || msg.includes('payment') || msg.includes('installment') || msg.includes('finance')) {
    return {
      text: 'Here\'s our flexible payment plan 💳:\n\nFor **1BHK Farmhouse (₹21L)**:\n- Booking: 25% = ₹5.25L\n- Balance: 24 monthly EMIs of ~₹66K\n\n🏦 Bank loan assistance available!\n\nUse the **EMI Calculator** on this page for exact figures, or I can connect you with R. Ganesh Sir for custom options.',
    };
  }

  if (msg.includes('property') || msg.includes('house') || msg.includes('plot') || msg.includes('farmhouse') || msg.includes('show')) {
    return {
      text: 'We have an exclusive option at Green Orchid Farm Land 🏡:\n\n**1BHK Luxury Farmhouse — ₹21L**\n- 121 sq.yds plot + 350 sq.ft 1BHK house\n- 8 premium furniture items included\n- Gated community, organic fruit trees\n- BEST DEAL tag 🔥\n\nComes with 2 Years FREE Maintenance and HMDA approval!\n\nWould you like to book a site visit to see the actual plot?',
    };
  }

  if (msg.includes('amenity') || msg.includes('facility') || msg.includes('feature') || msg.includes('swimming') || msg.includes('pool') || msg.includes('security')) {
    return {
      text: 'Green Orchid Farm Land offers premium amenities 🌟:\n\n🏊 Resort-style Swimming Pool\n🏛️ Community Club House\n🏏 Cricket Net Practice\n🏨 Visitor Rooms for guests\n🥭 Organic Fruit Plants (Mango, Guava, Chikoo)\n🛝 Children Play Area\n🧱 Gated Compound Wall (5.5 acres secured)\n⛩️ Grand Arch Entrance\n🛣️ 30 Feet Blacktop Roads\n🛡️ 24/7 Security & CCTV\n🔐 Private Gated Community\n🌳 Landscaped Park Area\n\nAll this for just ₹21L onwards! Would you like to schedule a visit?',
    };
  }

  if (msg.includes('location') || msg.includes('near') || msg.includes('distance') || msg.includes('airport') || msg.includes('kothur') || msg.includes('dargah')) {
    return {
      text: 'Our location is SUPERB! 📍 Near Kothur, JP Dargah, NH-44 Bangalore Highway:\n\n🕌 JP Dargah — 1 km (2 mins)\n💻 Microsoft Data Center — 2 km (4 mins)\n🏘️ Kothur Commercial Hub — 5 km (7 mins)\n✈️ Shamshabad Airport — 18 km (15 mins)\n🛣️ ORR Exit 16 — 16 km (15 mins)\n🏢 Gachibowli IT District — 35 km (30 mins)\n\nPerfect for weekend getaways from Hyderabad! 🚗',
    };
  }

  if (msg.includes('registration') || msg.includes('document') || msg.includes('legal') || msg.includes('approval') || msg.includes('hmda') || msg.includes('freehold')) {
    return {
      text: '100% Legal & Transparent ✅\n\n✅ HMDA Approved Layout\n✅ Spot Registration Available (same day!)\n✅ Pattadar Passbook from Dharani portal (15 days)\n✅ Freehold property with clear title\n✅ No hidden charges\n\nYou own the land outright with full rights. Ganesh Sir handles everything!\n\nWant me to schedule a site visit so you can see the layout in person?',
    };
  }

  if (msg.includes('maintenance') || msg.includes('free maintenance') || msg.includes('2 year')) {
    return {
      text: 'We offer **2 Years Completely FREE Maintenance** 🎉\n\nThis covers:\n✅ Security staff salaries\n✅ Water supply management\n✅ Organic tree care & gardening\n✅ Common area upkeep & cleaning\n✅ Basic structural repairs\n\nYou pay ₹0 for 2 full years! This is an exclusive offer worth lakhs.',
    };
  }

  if (msg.includes('book') || msg.includes('visit') || msg.includes('schedule') || msg.includes('come') || msg.includes('see') || msg.includes('tour')) {
    return {
      text: 'I\'d love to help you book a FREE site visit! 🗓️\n\nWe provide:\n🚗 Complimentary pickup & drop from Shamshabad Airport & ORR Exit 16\n📅 Multiple time slots available\n👨‍💼 Guided tour by R. Ganesh Sir himself\n\nWould you like me to share the booking form? Just give me your name and phone number!',
      action: 'site_visit',
    };
  }

  if (msg.includes('call') || msg.includes('callback') || msg.includes('contact') || msg.includes('phone') || msg.includes('number') || msg.includes('talk')) {
    return {
      text: 'Sure! Here are the direct contact details 📞:\n\n👤 **R. Ganesh Sir**: +91 9505903371\n📱 Alternative: +91 9849754071\n\nWould you like me to send you a WhatsApp message so Ganesh Sir can call you back? Just share your name and phone number.',
      action: 'whatsapp',
    };
  }

  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('okay') || msg.includes('ok')) {
    return {
      text: 'You\'re welcome! 😊\n\nRemember, this is a limited-time offer at the best prices. Plots are filling fast!\n\nWould you like to:\n- Book a FREE site visit?\n- Get a WhatsApp call back?\n- See the exact payment plan?',
    };
  }

  if (msg.includes('interested') || msg.includes('buy') || msg.includes('purchase') || msg.includes('ready') || msg.includes('yes') || msg.includes('sure')) {
    return {
      text: 'Excellent! 🎉 I\'m glad you\'re interested!\n\nLet me connect you with R. Ganesh Sir right away. He\'ll give you all the details, show you the layout, and help with spot registration.\n\nJust share your name and phone number, and I\'ll send him a WhatsApp message to call you immediately!',
      action: 'lead',
    };
  }

  if (msg.includes('furniture') || msg.includes('appliance') || msg.includes('included') || msg.includes('what comes')) {
    return {
      text: 'Every farmhouse comes FULLY FURNISHED at ZERO extra cost! 🛋️\n\n8 Premium Items Included:\n1. 🛏️ King-size bed with mattress\n2. 🌀 Ceiling fans\n3. 🍽️ Dining table with chairs\n4. 📺 LED TV\n5. 🧊 Refrigerator\n6. 🍖 Barbecue grill\n7. 🛋️ Sofa set\n8. 🪑 Garden chairs\n\nNo extra charges, no hidden costs! Ready to move in!',
    };
  }

  if (msg.includes('pick') || msg.includes('drop') || msg.includes('transport') || msg.includes('airport pickup')) {
    return {
      text: 'Yes! We provide FREE pick & drop service 🚗\n\nAvailable from:\n✈️ Shamshabad International Airport\n🛣️ ORR Exit 16\n🏘️ Kothur Town\n\nJust mention this when you book your site visit, and we\'ll arrange it for you completely FREE!',
    };
  }

  return {
    text: 'I\'d be happy to help you with that! 😊\n\nAt Green Orchid Farm Land, we have:\n🏠 1BHK Luxury Farmhouse at ₹21L\n✅ 100% HMDA Approved with spot registration\n🎁 2 Years FREE Maintenance\n🛋️ 8 furniture items included FREE\n\nWould you like to:\n- See property details?\n- Book a FREE site visit?\n- Get a call back from R. Ganesh Sir?\n- Calculate EMI?',
  };
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasSeenAssistant, setHasSeenAssistant] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = localStorage.getItem('farmhouse_ai_seen');
    if (!seen) {
      setHasSeenAssistant(false);
      localStorage.setItem('farmhouse_ai_seen', 'true');
      setTimeout(() => setIsOpen(true), 1500);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setHasSeenAssistant(true);
    };
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      localStorage.setItem('farmhouse_ai_seen', 'true');
      setHasSeenAssistant(true);
    }
  };

  const settings = getAISettings();
  const hasApiKey = !!settings.geminiApiKey;

  useEffect(() => {
    setApiKey(settings.geminiApiKey || '');
  }, [settings.geminiApiKey]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! 👋 Welcome to Green Orchid Farm Land.\n\nI\'m **Ganesh AI**, your personal property assistant. I can help you with:\n\n- 🏠 Property details & pricing\n- 📅 Booking a FREE site visit\n- 💰 EMI calculations\n- 📍 Location advantages\n- 📞 Call back requests\n\nHow can I help you today?',
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSaveSettings = () => {
    saveAISettings({ geminiApiKey: apiKey.trim() });
    setShowSettings(false);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = { role: 'user', content: messageText, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let responseText = '';
      let action: 'whatsapp' | 'site_visit' | 'lead' | undefined;

      if (hasApiKey && settings.geminiApiKey) {
        try {
          const prompt = getSystemPrompt(messageText);
          responseText = await callGeminiAPI(prompt, settings.geminiApiKey);
        } catch (e) {
          console.error('Gemini API error, falling back to rules:', e);
          const ruleResponse = getRuleBasedResponse(messageText);
          responseText = ruleResponse.text;
          action = ruleResponse.action;
        }
      } else {
        const ruleResponse = getRuleBasedResponse(messageText);
        responseText = ruleResponse.text;
        action = ruleResponse.action;
      }

      if (action === 'lead' || action === 'whatsapp') {
        const leadInfo = extractLeadFromMessage(messageText);
        if (leadInfo.name || leadInfo.phone) {
          saveLead({
            name: leadInfo.name || 'Chat User',
            phone: leadInfo.phone || 'Not provided',
            email: leadInfo.email,
            propertyInterest: 'Chat Inquiry',
            message: messageText,
            source: 'whatsapp',
          });
          fireConfetti();
        }
      }

      const assistantMessage: Message = { role: 'assistant', content: responseText, timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMessage]);

      if (action === 'whatsapp') {
        const leadInfo = extractLeadFromMessage(messageText);
        const waMsg = `Hello R. Ganesh Sir,\n\nI was chatting with Ganesh AI on your website about Green Orchid Farm Land.\n${leadInfo.name ? `Name: ${leadInfo.name}\n` : ''}${leadInfo.phone ? `Phone: ${leadInfo.phone}\n` : ''}${leadInfo.email ? `Email: ${leadInfo.email}\n` : ''}\nI'm interested in getting more details. Please call me back!`;
        setTimeout(() => window.open(getWhatsAppLink(waMsg), '_blank'), 1500);
      }
    } catch (e) {
      console.error('AI error:', e);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. 😔 Please try again or contact R. Ganesh Sir directly at +91 9505903371.', timestamp: Date.now() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.role === 'user';
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser ? 'bg-emerald-600 text-white rounded-br-md' : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
          }`}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {msg.content.split('\n').map((line, i) => {
            if (line.startsWith('✅') || line.startsWith('🏠') || line.startsWith('🏆') || line.startsWith('🔥') || line.startsWith('🎁') || line.startsWith('🛋️') || line.startsWith('💳') || line.startsWith('🏦') || line.startsWith('📅') || line.startsWith('🚗') || line.startsWith('👨‍💼') || line.startsWith('✈️') || line.startsWith('🛣️') || line.startsWith('🏘️') || line.startsWith('📍') || line.startsWith('🕌') || line.startsWith('💻') || line.startsWith('🏢') || line.startsWith('📞') || line.startsWith('👤') || line.startsWith('📱') || line.startsWith('🎉') || line.startsWith('😊') || line.startsWith('👋') || line.startsWith('🏊') || line.startsWith('🏛️') || line.startsWith('🏏') || line.startsWith('🏨') || line.startsWith('🥭') || line.startsWith('🛝') || line.startsWith('🧱') || line.startsWith('⛩️') || line.startsWith('🛡️') || line.startsWith('🔐') || line.startsWith('🌳') || line.startsWith('🛏️') || line.startsWith('🌀') || line.startsWith('🍽️') || line.startsWith('📺') || line.startsWith('🧊') || line.startsWith('🍖') || line.startsWith('🪑')) {
              return <div key={i} className="font-semibold">{line}</div>;
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return <div key={i} className="font-bold text-white">{line.replace(/\*\*/g, '')}</div>;
            }
            if (line.startsWith('- ')) {
              return <div key={i} className="ml-2">• {line.substring(2)}</div>;
            }
            if (line.trim() === '') {
              return <div key={i}>&nbsp;</div>;
            }
            return <div key={i}>{line}</div>;
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.button
        onClick={toggleAssistant}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-6 py-4 rounded-full shadow-2xl transition-all ${
          isOpen ? 'bg-slate-900 text-gold-400 border border-gold-500/40' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:scale-105'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!hasSeenAssistant && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500 text-[9px] font-bold text-navy-950 items-center justify-center">NEW</span>
          </span>
        )}
        {isOpen ? (
          <>
            <X className="w-5 h-5" />
            <span className="text-sm font-bold hidden sm:inline">Close AI Assistant</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold hidden sm:inline">AI Assistant</span>
          </>
        )}
      </motion.button>

      {!hasSeenAssistant && !isOpen && (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          className="fixed bottom-6 left-6 z-40 w-20 h-20 rounded-full border-2 border-emerald-400 pointer-events-none"
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-navy-900 to-slate-900 p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ganesh AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-400 font-medium">Online • Instant Response</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-lg text-slate-400 hover:text-gold-400 hover:bg-slate-800 transition-colors" title="AI Settings">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {showSettings && (
              <div className="bg-slate-950 p-4 border-b border-slate-700">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">AI Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Gemini API Key (Optional)</label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Paste your Gemini API key..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-2 top-2 text-slate-400 hover:text-white">
                        <Key className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Get free key at ai.google.dev. Without a key, I use smart built-in knowledge.
                    </p>
                  </div>
                  <button onClick={handleSaveSettings} className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {messages.map((msg) => renderMessage(msg))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-700">
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                      <span className="text-xs text-slate-400 ml-2">Ganesh AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && !isTyping && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => handleSendMessage(prompt.text)}
                      className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-slate-950 border-t border-slate-700">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about farmhouses..."
                  rows={1}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors shrink-0"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {!hasApiKey && (
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  ⚡ Powered by built-in AI knowledge • Add Gemini API key in settings for advanced AI
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
