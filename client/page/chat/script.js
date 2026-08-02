const countrySelect = document.getElementById('country-select');
const anonCheckbox = document.getElementById('anon-checkbox');
const nameInput = document.getElementById('user-name');
const connectBtn = document.getElementById('connect-btn');
const skipBtn = document.getElementById('skip-btn');
const stopBtn = document.getElementById('stop-btn');
const statusDiv = document.getElementById('status');
const partnerDiv = document.getElementById('partner');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msg-form');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

let matched = false;
let partner = null;

const countries = {
    any: 'Any', us: 'United States', uk: 'United Kingdom', ca: 'Canada', au: 'Australia', in: 'India', np: 'Nepal'
};

const replyRules = [
    { patterns: ['hi', 'namaste'], reply: 'Hey! I’m happy to chat with you.' },
    { patterns: ['how are you','k xa'], reply: 'I’m doing great, thanks for asking! How are you?' },
    { patterns: ['what is your name','tero naam k ho'], reply: 'I’m just a stranger here, but you can call me Stranger.' },
    { patterns: ['where are you from','kata bata ho'], reply: 'I’m from somewhere around the world. What about you?' },
    { patterns: ['bye', 'goodbye', 'see you', 'talk to you later','la'], reply: 'Goodbye! Take care and talk to you soon.' },
    { patterns: ['joke', 'tell me a joke', 'make me laugh'], reply: 'Sure! Why don’t skeletons fight each other? They don’t have the guts.' }
];

function normalizeText(text){
    return text.toLowerCase()
        .replace(/what's/g, 'what is')
        .replace(/whats/g, 'what is')
        .replace(/you're/g, 'you are')
        .replace(/i'm/g, 'i am')
        .replace(/don't/g, 'do not')
        .replace(/can't/g, 'can not')
        .replace(/won't/g, 'will not')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getStrangerReply(message){
    const normalized = normalizeText(message);
    if(!normalized) return 'Nice to meet you! Tell me more about yourself.';

    const matchedRule = replyRules.find(rule =>
        rule.patterns.some(pattern => {
            const normalizedPattern = normalizeText(pattern);
            if(!normalizedPattern) return false;

            const patternWords = normalizedPattern.split(' ');
            const hasAllWords = patternWords.length > 1 && patternWords.every(word => normalized.includes(word));

            return normalized === normalizedPattern || normalized.includes(normalizedPattern) || hasAllWords;
        })
    );

    return matchedRule ? matchedRule.reply : 'Nice to meet you! Tell me more about yourself.';
}

function choosePartnerCountry(pref){
    if(pref === 'any'){
        const keys = Object.keys(countries).filter(k=>k!=='any');
        return keys[Math.floor(Math.random()*keys.length)];
    }
    return pref;
}

function setControlsDisabled(disabled){
    countrySelect.disabled = disabled;
    anonCheckbox.disabled = disabled;
    nameInput.disabled = disabled;
    if(disabled){
        connectBtn.disabled = true; connectBtn.classList.add('disabled');
    } else { connectBtn.disabled = false; connectBtn.classList.remove('disabled'); }
}

function updateUI(){
    if(matched){
        statusDiv.textContent = 'Status: Connected';
        partnerDiv.textContent = `Partner: User from ${countries[partner.country] || 'Unknown'}`;
        skipBtn.disabled = false; skipBtn.classList.remove('disabled');
        stopBtn.disabled = false; stopBtn.classList.remove('disabled');
        sendBtn.disabled = false;
    } else {
        statusDiv.textContent = 'Status: Not connected';
        partnerDiv.textContent = 'Partner: —';
        skipBtn.disabled = true; skipBtn.classList.add('disabled');
        stopBtn.disabled = true; stopBtn.classList.add('disabled');
        sendBtn.disabled = true;
    }
}

function scrollMessagesToBottom(){
    requestAnimationFrame(() => {
        messages.scrollTop = messages.scrollHeight;
    });
}

function systemMessage(text){
    const li = document.createElement('li');
    li.className = 'status-system';
    li.textContent = text;
    messages.appendChild(li);
    scrollMessagesToBottom();
}

function appendMessage(text, cls){
    const li = document.createElement('li');
    li.className = cls;
    li.textContent = text;
    messages.appendChild(li);
    scrollMessagesToBottom();
}

function startMatch(){
    partner = {country: choosePartnerCountry(countrySelect.value)};
    matched = true;
    setControlsDisabled(true);
    updateUI();
    systemMessage('Matched — chat started. Controls locked until you stop.');
}

function skipMatch(){
    if(!matched) return;
    messages.innerHTML = '';
    partner = {country: choosePartnerCountry(countrySelect.value)};
    systemMessage('You skipped. Searching for a new partner...');
    setTimeout(()=>{
        systemMessage(`Connected to a new partner from ${countries[partner.country]}.`);
        updateUI();
    },600);
}

function stopMatch(){
    if(!matched) return;
    matched = false; partner = null;
    setControlsDisabled(false);
    updateUI();
    systemMessage('Chat stopped. You can change country or enable anonymity now.');
}

connectBtn.addEventListener('click', ()=>{
    if(connectBtn.disabled) return;
    startMatch();
});

skipBtn.addEventListener('click', ()=> skipMatch());
stopBtn.addEventListener('click', ()=> stopMatch());

msgForm.addEventListener('submit', e=>{
    e.preventDefault();
    const txt = msgInput.value.trim();
    if(!txt || !matched) return;
    const displayName = anonCheckbox.checked ? 'Anonymous' : (nameInput.value.trim() || 'You');
    appendMessage(`${displayName}: ${txt}`, 'outgoing');
    msgInput.value = '';

    // Simulate partner reply based on the message content
    setTimeout(()=>{
        const reply = getStrangerReply(txt);
        appendMessage(`Stranger: ${reply}`, 'incoming');
    }, 800 + Math.random()*1000);
});

// initialize
setControlsDisabled(false);
updateUI();
