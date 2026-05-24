// neatlint — landing page interactions

(function () {
  "use strict";

  // --- Copy to clipboard (hero) ---
  const copyBtn = document.getElementById("copy-btn");
  const installCmd = document.getElementById("install-command");

  if (copyBtn && installCmd) {
    copyBtn.addEventListener("click", function () {
      const text = installCmd.textContent;
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = "copied";
        copyBtn.classList.add("copied");
        setTimeout(function () {
          copyBtn.textContent = "copy";
          copyBtn.classList.remove("copied");
        }, 1500);
      });
    });
  }

  // --- Copy to clipboard (tab panels) ---
  document.querySelectorAll(".tab-copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-target");
      var codeEl = document.getElementById(targetId);
      if (!codeEl) return;
      navigator.clipboard.writeText(codeEl.textContent).then(function () {
        btn.textContent = "copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "copy";
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  });

  // --- Tab switching ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach(function (p) {
        p.classList.remove("active");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      var panel = document.getElementById("panel-" + target);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });
})();
