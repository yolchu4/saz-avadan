// Main JavaScript for AVADAN website

// Chatbot functionality with multilingual support
const chatbotKnowledgeBase = {
  fa: {
    'سلام': 'سلام! خوش آمدید. چطور می‌تونم کمکتون کنم؟',
    'درباره شرکت': 'شرکت علم و صنعت و معدن آوادان با 25 سال سابقه در طراحی سازه، معماری و تاسیسات مکانیکی و برقی پروژه‌های مسکونی و صنعتی فعالیت می‌کند.',
    'خدمات': 'خدمات ما شامل:\n• طراحی سازه\n• طراحی معماری\n• نقشه‌کشی فنی\n• طراحی واحدهای صنعتی و معدنی\n• طراحی سوله‌های صنعتی\n• نقشه‌برداری\n• مدل‌سازی اسکلت فولادی',
    'تماس': 'برای تماس با ما می‌توانید از فرم تماس با ما در صفحه اصلی استفاده کنید یا از طریق تلگرام و واتساپ با ما در ارتباط باشید.',
    'پروژه‌ها': 'ما در پروژه‌های متنوعی فعالیت داشته‌ایم:\n• طراحی واحدهای صنعتی و معدنی\n• طراحی واحد تولید روی\n• واحد مسکونی (1200 واحد)\n• کارخانه تولید کنسانتره سرب و روی\n• طراحی سوله‌های صنعتی',
    'قیمت': 'برای دریافت قیمت و برآورد هزینه، لطفاً از طریق فرم تماس با ما درخواست مشاوره ارسال کنید.',
    'زمان': 'زمان انجام پروژه بستگی به نوع و حجم پروژه دارد. برای اطلاعات دقیق‌تر، لطفاً از طریق فرم تماس با ما درخواست مشاوره ارسال کنید.'
  },
  tr: {
    'merhaba': 'Merhaba! Hoş geldiniz. Size nasıl yardımcı olabilirim?',
    'şirket hakkında': 'AVADAN Bilim, Sanayi ve Madencilik Şirketi, konut ve endüstriyel projelerde yapı tasarımı, mimarlık ve mekanik-elektrik tesisatlarında 25 yıllık deneyime sahiptir.',
    'hizmetler': 'Hizmetlerimiz şunları içerir:\n• Yapı tasarımı\n• Mimari tasarım\n• Teknik çizim\n• Endüstriyel ve madencilik tesisleri tasarımı\n• Endüstriyel depo tasarımı\n• Haritacılık\n• Çelik yapı modelleme',
    'iletişim': 'Bizimle iletişime geçmek için ana sayfadaki iletişim formunu kullanabilir veya Telegram ve WhatsApp üzerinden bize ulaşabilirsiniz.',
    'projeler': 'Çeşitli projelerde faaliyet gösterdik:\n• Endüstriyel ve madencilik tesisleri tasarımı\n• Çinko üretim ünitesi tasarımı\n• Konut ünitesi (1200 birim)\n• Kurşun ve çinko konsantre fabrikası\n• Endüstriyel depo tasarımı',
    'fiyat': 'Fiyat ve maliyet tahmini için lütfen ana sayfadaki iletişim formu üzerinden danışmanlık talebi gönderin.',
    'süre': 'Proje süresi proje türüne ve büyüklüğüne bağlıdır. Daha detaylı bilgi için lütfen iletişim formu üzerinden danışmanlık talebi gönderin.'
  }
};

let chatbotOpen = false;

// Initialize chatbot
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const wrapper = document.getElementById('chatbot-wrapper');
  
  if (!toggle || !wrapper) return;
  
  // Create chatbot HTML
  wrapper.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden">
      <div class="gradient-bg text-white p-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img src="img/logo1.jpg" alt="AVADAN" class="w-12 h-12 rounded-full object-cover">
          <div>
            <h3 class="font-bold" data-i18n="chatbot.title">پشتیبانی آنلاین</h3>
            <div class="flex items-center gap-2 text-sm">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span data-i18n="chatbot.status">آنلاین</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <a href="https://t.me/asadipour12" target="_blank" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
            <i class="fab fa-telegram-plane"></i>
          </a>
          <a href="https://wa.me/989123411691" target="_blank" class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
      <div id="chatbot-messages" class="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <p class="text-gray-700" id="chatbot-welcome-message"></p>
        </div>
      </div>
      <div class="p-4 bg-white border-t">
        <div class="flex flex-wrap gap-2 mb-3">
          <button onclick="chatbotSendQuickReply('about')" class="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition" data-i18n="chatbot.quickReplies.about">درباره شرکت</button>
          <button onclick="chatbotSendQuickReply('services')" class="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition" data-i18n="chatbot.quickReplies.services">خدمات</button>
          <button onclick="chatbotSendQuickReply('contact')" class="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition" data-i18n="chatbot.quickReplies.contact">تماس</button>
          <button onclick="chatbotSendQuickReply('projects')" class="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition" data-i18n="chatbot.quickReplies.projects">پروژه‌ها</button>
        </div>
        <div class="flex gap-2">
          <input type="text" id="chatbot-input" placeholder="پیام خود را بنویسید..." class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500" onkeypress="if(event.key==='Enter') chatbotSendMessage()">
          <button onclick="chatbotSendMessage()" class="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Update welcome message
  updateChatbotWelcome();
  
  // Toggle chatbot
  toggle.addEventListener('click', () => {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
      wrapper.classList.remove('hidden');
      toggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      wrapper.classList.add('hidden');
      toggle.innerHTML = '<i class="fas fa-comments"></i>';
    }
  });
}

// Update chatbot welcome message based on current language
function updateChatbotWelcome() {
  const welcomeEl = document.getElementById('chatbot-welcome-message');
  if (welcomeEl && window.getTranslation) {
    welcomeEl.textContent = window.getTranslation('chatbot.welcome');
  }
}

// Update chatbot language
window.updateChatbotLanguage = function() {
  updateChatbotWelcome();
  // Re-apply translations to chatbot elements
  if (typeof applyTranslations === 'function') {
    applyTranslations();
  }
};

// Send chatbot message
function chatbotSendMessage() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  addChatbotMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  showChatbotTyping();
  
  setTimeout(() => {
    hideChatbotTyping();
    const response = getChatbotResponse(message);
    addChatbotMessage(response, 'bot');
  }, 1000 + Math.random() * 1000);
}

// Send quick reply
function chatbotSendQuickReply(type) {
  const lang = window.currentLanguage ? window.currentLanguage() : 'fa';
  const messages = {
    fa: { about: 'درباره شرکت', services: 'خدمات', contact: 'تماس', projects: 'پروژه‌ها' },
    tr: { about: 'şirket hakkında', services: 'hizmetler', contact: 'iletişim', projects: 'projeler' }
  };
  
  const message = messages[lang]?.[type] || messages.fa[type];
  if (message) {
    document.getElementById('chatbot-input').value = message;
    chatbotSendMessage();
  }
}

// Get chatbot response
function getChatbotResponse(message) {
  const lang = window.currentLanguage ? window.currentLanguage() : 'fa';
  const kb = chatbotKnowledgeBase[lang] || chatbotKnowledgeBase.fa;
  const lowerMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(kb)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return response;
    }
  }
  
  return window.getTranslation ? window.getTranslation('chatbot.responses.default') : 'متشکرم از سوال شما.';
}

// Add message to chatbot
function addChatbotMessage(text, type) {
  const messagesEl = document.getElementById('chatbot-messages');
  if (!messagesEl) return;
  
  // Remove welcome message if exists
  const welcome = messagesEl.querySelector('#chatbot-welcome-message');
  if (welcome && type === 'user') {
    welcome.parentElement.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `flex gap-3 ${type === 'user' ? 'flex-row-reverse' : ''}`;
  
  const avatar = type === 'user' 
    ? '<div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 flex items-center justify-center text-white"><i class="fas fa-user"></i></div>'
    : '<img src="img/logo1.jpg" alt="AVADAN" class="w-10 h-10 rounded-full object-cover">';
  
  messageDiv.innerHTML = `
    ${avatar}
    <div class="flex-1 ${type === 'user' ? 'text-right' : 'text-left'}">
      <div class="inline-block ${type === 'user' ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white' : 'bg-white'} rounded-lg px-4 py-2 shadow-sm">
        <p class="whitespace-pre-line">${text}</p>
      </div>
      <p class="text-xs text-gray-500 mt-1">${new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  `;
  
  messagesEl.appendChild(messageDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Show typing indicator
function showChatbotTyping() {
  const messagesEl = document.getElementById('chatbot-messages');
  if (!messagesEl) return;
  
  const typingDiv = document.createElement('div');
  typingDiv.id = 'chatbot-typing';
  typingDiv.className = 'flex gap-3';
  typingDiv.innerHTML = `
    <img src="img/logo1.jpg" alt="AVADAN" class="w-10 h-10 rounded-full object-cover">
    <div class="bg-white rounded-lg px-4 py-2 shadow-sm">
      <div class="flex gap-1">
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>
    </div>
  `;
  
  messagesEl.appendChild(typingDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Hide typing indicator
function hideChatbotTyping() {
  const typing = document.getElementById('chatbot-typing');
  if (typing) typing.remove();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

