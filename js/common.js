    window.addEventListener('load', () => {
      const loading = document.getElementById('loading');

      // ロード完了してから2秒待ってフェードアウト開始
      setTimeout(() => {
        loading.classList.add('hidden');

        // フェードアウトアニメ終了後にDOMから削除
        setTimeout(() => loading.remove(), 2000); // CSSのtransitionと同じ時間
      }, 1500); // ← この数値を増減すると表示時間が変わる（単位：ミリ秒）
    });


    // ハンバーガーボタン
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const sideMenu = document.getElementById('sideMenu');

    hamburger.addEventListener('click', () => {
      // ハンバーガーのバッテン切替
      hamburger.classList.toggle('active');

      // オーバーレイ表示・非表示
      if (overlay.style.display === 'block') {
        overlay.style.opacity = 0;
        setTimeout(() => overlay.style.display = 'none', 300); // フェードアウト 0.3s
      } else {
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = 1, 10); // フェードイン
      }

      // メニュー開閉
      sideMenu.classList.toggle('open');
    });

    // オーバーレイクリックで閉じる
    overlay.addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => overlay.style.display = 'none', 300);

      sideMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });


    document.addEventListener('DOMContentLoaded', () => {
      const fadeEls = document.querySelectorAll('.fade-in');

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // 画面に入ったら表示
            obs.unobserve(entry.target); // 1回だけ表示したい場合は監視解除
          }
        });
      }, {
        threshold: 0.1 // 要素の10%が見えたら発火
      });

      fadeEls.forEach(el => observer.observe(el));
    });
    const toTop = document.getElementById('toTop');


    // スクロールしたらボタン表示
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) { // 200pxスクロールしたら表示
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    });

    // クリックでスムーズスクロール
    toTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
