document.addEventListener("DOMContentLoaded", () => {
  // ------------------------
  // ローディング画面
  // ------------------------
  const loading = document.getElementById("loading");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loading.classList.add("hidden"); // CSSでopacity:0に
      setTimeout(() => loading.remove(), 2000); // transition時間と合わせる
    }, 1500);
  });

  // ------------------------
  // ハンバーガーメニュー
  // ------------------------
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");
  const sideMenu = document.getElementById("sideMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
    sideMenu.classList.toggle("open");
  });

  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    sideMenu.classList.remove("open");
  });

  // ------------------------
  // フェードインアニメーション
  // ------------------------
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // ------------------------
  // トップへ戻るボタン
  // ------------------------
  const toTop = document.getElementById("toTop");

  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 200);
  });

  toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

// ------------------------
// スライドショー（自動＋ドット操作対応）
// ------------------------
const slideshows = document.querySelectorAll(".slideshow");

slideshows.forEach(slideshow => {
  const slides = slideshow.querySelectorAll("img");
  const dots = slideshow.parentElement.querySelectorAll(".dot"); // 同じwrapper内のドット
  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    timer = setInterval(nextSlide, 7500); // 3秒ごとに切り替え
  }

  function stopAutoSlide() {
    clearInterval(timer);
  }

  // 初期表示
  showSlide(current);
  startAutoSlide();

  // ドットクリック対応
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      current = i;
      showSlide(current);
      startAutoSlide(); // クリック後も自動スライド再開
    });
  });
});

window.addEventListener("load", () => {
  const wrapper = document.querySelector(".mv-wrapper");
  const mv = document.querySelector(".slideshow"); // MV本体（pc/spどちらか表示中のやつ）

  function adjustHeight() {
    const activeSlide = document.querySelector(".slideshow img.active");
    if (!activeSlide) return;

    const mvHeight = activeSlide.offsetHeight;
    const windowHeight = window.innerHeight;

    wrapper.style.height = (mvHeight < windowHeight ? windowHeight : mvHeight) + "px";
  }

  adjustHeight();
  window.addEventListener("resize", adjustHeight);

  // スライド切り替え後にも高さ調整を呼び出す
  const slideshows = document.querySelectorAll(".slideshow");
  slideshows.forEach(slideshow => {
    const dots = slideshow.parentElement.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        setTimeout(adjustHeight, 100); // 切替アニメ後に高さ再調整
      });
    });
  });

  // 定期的に補正してもOK（安全策）
  setInterval(adjustHeight, 2000);
});



});

const menuItems = [
  { label: "Home", url: "https://leoleochankoh1109.github.io/takaya_aoki/" },
  { label: "DTPデザイン", url: "https://leoleochankoh1109.github.io/takaya_aoki/works/dtp/" },
  { label: "Webデザイン", url: "https://leoleochankoh1109.github.io/takaya_aoki/works/web/" },
  { label: "バナーデザイン", url: "https://leoleochankoh1109.github.io/takaya_aoki/works/banner/" },
  { label: "その他デザイン", url: "https://leoleochankoh1109.github.io/takaya_aoki/works/others/" },
  { label: "About", url: "https://leoleochankoh1109.github.io/takaya_aoki/about/" }
];

const menuList = document.getElementById("menuList");

menuList.innerHTML = menuItems
  .map(item => `<li><a href="${item.url}">${item.label}</a></li>`)
  .join('');


const footerLinks = document.querySelector(".link2third");

const excluded = ["Home", "About"]; // ← ここ

const filteredItems = menuItems.filter(item => !excluded.includes(item.key));

footerLinks.innerHTML = filteredItems
  .map(item => `<a href="${item.url}">${item.label}</a>／`)
  .join("")
  .replace(/／$/, ""); // 最後のスラッシュを削除