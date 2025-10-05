'use strict';

document.addEventListener('DOMContentLoaded', () => {
  TISAM_APP.SliderManager.initAll();
  TISAM_APP.PresetManager.init();
  TISAM_APP.PresetManager.selectPreset('sam');
  TISAM_APP.ModalController.init();
  TISAM_APP.FileHandler.init();
  TISAM_APP.EventHandlers.init();
  TISAM_APP.CursorManager.init();
  TISAM_APP.TextareaManager.init();
  TISAM_APP.CustomCursor.init();

  const italianTextarea = document.getElementById('italianinput');
  if (italianTextarea) {
    setTimeout(() => {
      italianTextarea.focus();
      const len = italianTextarea.value.length;
      italianTextarea.setSelectionRange(len, len);
    }, 100);
  }
});
