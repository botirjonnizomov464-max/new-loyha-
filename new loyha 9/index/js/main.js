
  // DOM elementlarni olish
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");
  const inputText = document.getElementById("inputText");
  const messages = document.getElementById("messages");
  const behaviorSelect = document.getElementById("behavior");
  const exampleBtns = document.querySelectorAll(".example");
  const addCustomBtn = document.getElementById("addCustom");
  const customTrigger = document.getElementById("customTrigger");
  const customReply = document.getElementById("customReply");
  const newConvBtn = document.getElementById("newConvBtn");
  const convoList = document.getElementById("convoList");

  let customRules = {}; // maxsus javoblar uchun

  // Xabar chiqish funksiyasi
  function addMessage(text, sender = "ai") {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    const bubble = document.createElement("div");
    bubble.classList.add("bubble", sender);
    bubble.textContent = text;
    msg.appendChild(bubble);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // AI javoblari
  function getAIReply(text) {
    text = text.toLowerCase().trim();

    // 1. Maxsus qo‘shilgan javoblar
    if (customRules[text]) return customRules[text];

    // 2. Oddiy javoblar
    if (text.includes("salom")) return "Salom! Qandaysiz?";
    if (text.includes("bugun sana")) return "Bugun: " + new Date().toLocaleDateString("uz-UZ");
    if (text.match(/[0-9]+\s*[\+\-\*\/]\s*[0-9]+/)) {
      try {
        return "Natija: " + eval(text);
      } catch {
        return "Hisoblashda xatolik!";
      }
    }

    // 3. Default javob (AI xulqiga qarab)
    const mode = behaviorSelect.value;
    if (mode === "friendly") return "Hmm... qiziq! Yana gapiring 🙂";
    if (mode === "short") return "OK.";
    if (mode === "formal") return "Tushundim, iltimos davom eting.";

    return "Men sizni tushunmadim 😅";
  }

  // Xabar yuborish
  function sendMessage() {
    const text = inputText.value.trim();
    if (!text) return;

    addMessage(text, "user");
    inputText.value = "";

    setTimeout(() => {
      const reply = getAIReply(text);
      addMessage(reply, "ai");
    }, 400);
  }

  // Tugmalarni bog‘lash
  sendBtn.addEventListener("click", sendMessage);
  inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  clearBtn.addEventListener("click", () => {
    messages.innerHTML = "";
  });

  // Misollar
  exampleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      inputText.value = btn.textContent;
      sendMessage();
    });
  });

  // Maxsus javob qo‘shish
  addCustomBtn.addEventListener("click", () => {
    const trigger = customTrigger.value.trim().toLowerCase();
    const reply = customReply.value.trim();
    if (!trigger || !reply) return alert("Ikkala maydonni ham to‘ldiring!");

    customRules[trigger] = reply;
    alert(`"${trigger}" uchun javob qo‘shildi ✅`);
    customTrigger.value = "";
    customReply.value = "";
  });

  // Yangi suhbat
  newConvBtn.addEventListener("click", () => {
    const item = document.createElement("div");
    item.classList.add("convo");
    item.textContent = "Yangi suhbat #" + (convoList.children.length + 1);
    convoList.appendChild(item);
    messages.innerHTML = "";
  });

