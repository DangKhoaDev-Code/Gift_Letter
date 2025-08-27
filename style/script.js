$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");

  let currentPage = 1;
  const totalPages = 23;
  let isOpen = false;

  envelope.on('click', function () {
      if (isOpen) nextLyric();
  });

  openBtn.on('click', function () {
      envelope.removeClass("close").addClass("open");
      isOpen = true;
      openBtn.hide();
      resetBtn.show();
  });

  resetBtn.on('click', function () {
      envelope.removeClass("open").addClass("close");
      isOpen = false;
      setTimeout(function () {
          currentPage = 1;
          updateActivePage();
          resetBtn.hide();
          openBtn.show();
      }, 600);
  });

  function nextLyric() {
      currentPage = currentPage < totalPages ? currentPage + 1 : 1;
      updateActivePage();
  }

  function updateActivePage() {
      $(".lyric-page").removeClass("active");
      $("#page" + currentPage).addClass("active");
  }
});

const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const envelope = document.getElementById("envelope");
const audio = document.getElementById("sound");

let hasPlayed = false;

function playAudioOnce() {
    if (!hasPlayed) {
        audio.play().then(() => {
            hasPlayed = true;
        }).catch((e) => {
            console.log("Không thể phát nhạc:", e);
        });
    }
}

openBtn.addEventListener("click", function () {
    envelope.classList.remove("close");
    envelope.classList.add("open");
    openBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    playAudioOnce();
});

resetBtn.addEventListener("click", function () {
    envelope.classList.remove("open");
    envelope.classList.add("close");
    openBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    playAudioOnce();
});

    // Đoạn code JavaScript để chặn Developer Tools và các thao tác khác
    // Chặn phím tắt F12, Ctrl+Shift+I, Ctrl+U để mở Developer Tools
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.key === 'u')
      ) {
        event.preventDefault();
        return false;
      }
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('selectstart', (event) => event.preventDefault());
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());
    document.addEventListener('dragstart', (event) => event.preventDefault());

    // Biến trạng thái để theo dõi việc phát hiện Developer Tools


// Biến trạng thái để theo dõi việc phát hiện Developer Tools
let devToolsOpen = false;

// Hàm phát hiện và xử lý khi Developer Tools được mở
function handleDevToolsDetection() {
  const threshold = 160;
  const devToolsIsNowOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;

  if (devToolsIsNowOpen && !devToolsOpen) {
    devToolsOpen = true;
    console.warn("Developer Tools đã được phát hiện! Chuyển hướng ngay lập tức.");
    
    // Chuyển hướng đến một trang trắng ngay lập tức
    window.location.href = "about:blank";
  } else if (!devToolsIsNowOpen && devToolsOpen) {
    // Đặt lại trạng thái nếu DevTools đã đóng
    devToolsOpen = false;
  }
}

// Lắng nghe sự kiện thay đổi kích thước và kiểm tra định kỳ
window.addEventListener('resize', handleDevToolsDetection);
setInterval(handleDevToolsDetection, 500);

// Chặn các phím tắt và hành động chuột
document.addEventListener('keydown', (event) => {
  // Chặn phím F12 và các tổ hợp phím khác liên quan đến DevTools
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'C', 'J', 'K'].includes(event.key.toUpperCase())) ||
    (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// Chặn chuột phải và các hành vi sao chép
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('selectstart', (event) => event.preventDefault());
document.addEventListener('copy', (event) => event.preventDefault());
document.addEventListener('cut', (event) => event.preventDefault());
document.addEventListener('paste', (event) => event.preventDefault());



document.addEventListener('keydown', (event) => {
  // 1. Tổ hợp phím chung
  if (
    event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
  ) {
    // Chặn các tổ hợp phím sao chép, cắt, dán, lưu
    if (
      ['c', 'v', 'x', 'z', 'y', 'a', 's'].includes(event.key.toLowerCase()) ||
      (event.ctrlKey && event.key.toLowerCase() === 'y' && event.shiftKey) // Ctrl + Shift + Y
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Chặn Alt + Tab / Cmd + Tab
  if ((event.altKey && event.key === 'Tab') || (event.metaKey && event.key === 'Tab')) {
    event.preventDefault();
    event.stopPropagation();
  }
  // Chặn Alt + F4 / Cmd + Q
  if ((event.altKey && event.key === 'F4') || (event.metaKey && event.key === 'q')) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // 2. Tổ hợp phím trong VS Code (một số phím trùng với chung)
  if (
    event.ctrlKey || event.metaKey
  ) {
    if (
      ['p', '/', 'd', 'f', 'h', 'b', '`'].includes(event.key.toLowerCase()) ||
      (event.key === 'F' && event.shiftKey) || // Ctrl+Shift+F
      (event.key === 'L' && event.shiftKey) // Ctrl+Shift+L
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Chặn di chuyển dòng Alt + ↑/↓
  if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    event.preventDefault();
    event.stopPropagation();
  }

  // 3. Tổ hợp phím trong Trình duyệt DevTools
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
    (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Chặn Ctrl+R, Ctrl+Shift+R
  if (event.ctrlKey && event.key.toLowerCase() === 'r') {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Chặn Ctrl+Shift+P
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p') {
    event.preventDefault();
    event.stopPropagation();
  }

  // 4. Terminal / Command Line
  if (event.ctrlKey) {
    if (['c', 'l', 'a', 'e', 'u', 'k'].includes(event.key.toLowerCase())) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // 6. Tổ hợp phím trong thiết kế
  if (event.ctrlKey && event.key.toLowerCase() === 'g') {
    event.preventDefault();
    event.stopPropagation();
    if (event.shiftKey) { // Ctrl+Shift+G
      event.preventDefault();
      event.stopPropagation();
    }
  }
  if (event.key.toLowerCase() === 't' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (event.key === ' ' && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    event.preventDefault();
    event.stopPropagation();
  }
});

document.addEventListener('keydown', (event) => {
  // Kiểm tra nếu phím Ctrl hoặc Cmd (trên Mac) đang được nhấn
  if (event.ctrlKey || event.metaKey) {
    // Ngăn chặn hành vi mặc định của trình duyệt
    event.preventDefault();
    
    // Ngăn chặn sự kiện lan truyền lên các phần tử cha
    event.stopPropagation();
  }
});
