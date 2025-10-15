'use strict';

var TISAM_APP = TISAM_APP || {};

TISAM_APP.SliderManager = {
  controls: {},

  init(name) {
    const slider = document.getElementById(`${name}-slider`);
    const fill = slider.querySelector('.slider-fill');
    const thumb = slider.querySelector('.slider-thumb');

    let isDragging = false;
    const min = parseFloat(slider.dataset.min);
    const max = parseFloat(slider.dataset.max);
    let value = parseFloat(slider.dataset.value);

    this.controls[name] = {
      getValue: () => value,
      setValue: (v) => {
        value = v;
        this.updateSlider(slider, fill, thumb, value, min, max, name);
      }
    };

    const setValueFromX = (x) => {
      const rect = slider.getBoundingClientRect();
      const pos = Math.max(0, Math.min(rect.width, rect.right - x)) / rect.width;
      value = Math.round(min + (max - min) * pos);
      this.updateSlider(slider, fill, thumb, value, min, max, name);
    };

    thumb.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
    });

    slider.addEventListener('click', (e) => {
      if (e.target !== thumb) {
        setValueFromX(e.clientX);
      }
    });

    thumb.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDragging = true;
    });

    slider.addEventListener('touchstart', (e) => {
      if (e.target !== thumb) {
        setValueFromX(e.touches[0].clientX);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        setValueFromX(e.clientX);
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        setValueFromX(e.touches[0].clientX);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        value = Math.min(max, value + 1);
        this.updateSlider(slider, fill, thumb, value, min, max, name);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        value = Math.max(min, value - 1);
        this.updateSlider(slider, fill, thumb, value, min, max, name);
      }
    });

    this.updateSlider(slider, fill, thumb, value, min, max, name);
  },

  updateSlider(slider, fill, thumb, value, min, max, name) {
    const percentage = ((value - min) / (max - min)) * 100;
    thumb.style.right = `${percentage}%`;
    fill.style.width = `${percentage}%`;
    slider.dataset.value = value;
    slider.setAttribute('aria-valuenow', value);
    
    const label = document.getElementById(`${name}-lbl`);
    label.textContent = `${name.charAt(0).toUpperCase() + name.substring(1)}: ${value}`;
    
    TISAM_APP.config.opts[name] = value;
  },

  initAll() {
    ['speed', 'pitch', 'mouth', 'throat'].forEach(name => this.init(name));
  }
};

TISAM_APP.ModalController = {
  modal: null,

  init() {
    this.modal = document.getElementById('modal');
    
    document.getElementById('info-btn').addEventListener('click', () => {
      this.open();
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      this.close();
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  },

  open() {
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modal-close').focus();
  },

  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
  }
};

TISAM_APP.CursorManager = {
  config: {
    width: '25px',
    height: '25px',
    backgroundColor: 'var(--c64-light-blue)',
    animation: 'blink 1s step-end infinite'
  },

  init() {
    document.fonts.ready.then(() => {
      document.querySelectorAll("#italianinput, #speechinput").forEach(textarea => {
        this.initTextareaCursor(textarea);
      });
    }).catch(err => console.error('Font loading error:', err));
  },

  initTextareaCursor(textarea) {
    const wrapper = document.createElement('div');
    wrapper.className = 'textarea-wrapper';
    textarea.parentNode.insertBefore(wrapper, textarea);
    wrapper.appendChild(textarea);

    const cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';
    
    cursor.style.width = this.config.width;
    cursor.style.height = this.config.height;
    cursor.style.backgroundColor = this.config.backgroundColor;
    cursor.style.animation = this.config.animation;

    wrapper.appendChild(cursor);

    const mirror = document.createElement('div');
    mirror.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;box-sizing:content-box;margin:0;padding:0;border:0;';
    document.body.appendChild(mirror);

    const updateCursorPosition = () => {
      if (!textarea.matches(':focus')) return;

      const style = window.getComputedStyle(textarea);
      const propertiesToCopy = [
        'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
        'letterSpacing', 'lineHeight', 'wordWrap',
        'whiteSpace', 'wordBreak'
      ];

      propertiesToCopy.forEach(prop => {
        mirror.style[prop] = style[prop];
      });

      const rect = textarea.getBoundingClientRect();
      const contentWidth = rect.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      mirror.style.width = `${contentWidth}px`;

      const textUpToCursor = textarea.value.substring(0, textarea.selectionStart);
      // Preserva spazi multipli convertendoli in non-breaking spaces
      mirror.textContent = textUpToCursor.replace(/ {2,}/g, match => '\u00a0'.repeat(match.length)).replace(/\n$/, '\n\u00a0');

      const cursorMarker = document.createElement('span');
      mirror.appendChild(cursorMarker);

      const cursorTop = cursorMarker.offsetTop - textarea.scrollTop;
      const cursorLeft = cursorMarker.offsetLeft - textarea.scrollLeft;

      cursor.style.top = `${cursorTop + parseFloat(style.paddingTop)}px`;
      cursor.style.left = `${cursorLeft + parseFloat(style.paddingLeft)}px`;
    };

    textarea.addEventListener("focus", () => {
      document.querySelectorAll(".blinking-cursor").forEach(c => {
        c.style.display = 'none';
      });
      cursor.style.display = 'block';
      requestAnimationFrame(updateCursorPosition);
    });

    textarea.addEventListener("blur", () => {
      cursor.style.display = 'none';
    });

    textarea.addEventListener("input", updateCursorPosition);
    textarea.addEventListener("click", updateCursorPosition);
    textarea.addEventListener("keyup", updateCursorPosition);
    textarea.addEventListener("scroll", updateCursorPosition);
    textarea.addEventListener("keydown", (e) => {
        if (e.key === ' ') {
          requestAnimationFrame(() => {
            const style = window.getComputedStyle(textarea);
            const rect = textarea.getBoundingClientRect();
            const maxWidth = rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
            
            const tempSpan = document.createElement('span');
            tempSpan.style.cssText = `position:absolute;visibility:hidden;font-family:${style.fontFamily};font-size:${style.fontSize};font-weight:${style.fontWeight};white-space:nowrap;`;
            
            const textBeforeCursor = textarea.value.substring(0, textarea.selectionStart);
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            
            tempSpan.textContent = currentLine;
            document.body.appendChild(tempSpan);
            const lineWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            
            if (lineWidth >= maxWidth - 20) {
              const lineStartPos = textarea.selectionStart - currentLine.length;
              const lastSpaceInLine = currentLine.lastIndexOf(' ');
              
              if (lastSpaceInLine !== -1) {
                const breakPos = lineStartPos + lastSpaceInLine;
                const cursorPos = textarea.selectionStart;
                textarea.value = textarea.value.substring(0, breakPos) + '\n' + textarea.value.substring(breakPos + 1);
                textarea.selectionStart = textarea.selectionEnd = cursorPos;
              }
            }
            updateCursorPosition();
          });
        } else {
          requestAnimationFrame(updateCursorPosition);
        }
    });

    const resizeObserver = new ResizeObserver(updateCursorPosition);
    resizeObserver.observe(textarea);
  }
};

TISAM_APP.CustomCursor = {
  config: {
    characterDefault: '&#x2B61;',
    characterPointer: '&#x2B61;',
    fontSize: '28px',
    color: 'var(--c64-white)',
    colorHover: 'var(--c64-light-blue)',
    rotationDefault: '-45deg',
    rotationPointer: '-45deg',
    offsetX: 10,
    offsetY: 10
  },

  init() {
    const cursorDefault = document.getElementById('cursor-default');
    const cursorPointer = document.getElementById('cursor-pointer');

    cursorDefault.innerHTML = this.config.characterDefault;
    cursorPointer.innerHTML = this.config.characterPointer;

    cursorDefault.style.fontSize = this.config.fontSize;
    cursorDefault.style.color = this.config.colorHover;
    cursorDefault.style.transform = `translate(-50%, -50%) rotate(${this.config.rotationDefault})`;

    cursorPointer.style.fontSize = this.config.fontSize;
    cursorPointer.style.color = this.config.color;
    cursorPointer.style.transform = `translate(-50%, -50%) rotate(${this.config.rotationPointer})`;

    const allElements = document.querySelectorAll(
      'body, a, input[type="button"], .slider-thumb, .slider-container, .btn, .modal-close, textarea'
    );
    const pointerElements = document.querySelectorAll(
      'a, input[type="button"], .slider-thumb, .slider-container, .btn, .modal-close'
    );

    allElements.forEach(el => el.style.cursor = 'none');

    let activeCursor = cursorDefault;
    activeCursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
      activeCursor.style.left = `${e.clientX + this.config.offsetX}px`;
      activeCursor.style.top = `${e.clientY + this.config.offsetY}px`;
    });

    pointerElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDefault.style.display = 'none';
        cursorPointer.style.display = 'block';
        activeCursor = cursorPointer;
      });
      el.addEventListener('mouseleave', () => {
        cursorPointer.style.display = 'none';
        cursorDefault.style.display = 'block';
        activeCursor = cursorDefault;
      });
    });
  }
};

TISAM_APP.TextareaManager = {
  init() {
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px;overflow-y:hidden;');
      textarea.addEventListener('input', this.onInput, false);
    });
  },

  onInput() {
    if (this.value === '') {
      this.style.height = 'auto';
      return;
    }
    if (this.scrollHeight > this.clientHeight) {
      this.style.height = this.scrollHeight + 'px';
    }
  }
};

TISAM_APP.PresetManager = {
  selectPreset(name) {
    const values = TISAM_APP.config.presets[name];
    ['speed', 'pitch', 'mouth', 'throat'].forEach((param) => {
      TISAM_APP.SliderManager.controls[param].setValue(values[param]);
    });
  },

  init() {
    Object.keys(TISAM_APP.config.presets).forEach((preset) => {
      const element = document.getElementById(`preset_${preset}`);
      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectPreset(preset);
      });
    });
  }
};
