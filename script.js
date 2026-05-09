document.addEventListener('DOMContentLoaded', () => {
  // Clock update
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  
  function updateClock() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (timeEl) timeEl.textContent = `${h}:${m} ${ampm}`;
    if (dateEl) dateEl.textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  // Start Menu
  const startBtn = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  const startMenuOverlay = document.getElementById('start-menu-overlay');

  function toggleStartMenu() {
    const isActive = startMenu.classList.contains('active');
    if (isActive) {
      startMenu.classList.remove('active');
      startMenuOverlay.classList.remove('active');
      startBtn.classList.remove('active');
    } else {
      startMenu.classList.add('active');
      startMenuOverlay.classList.add('active');
      startBtn.classList.add('active');
    }
  }

  if (startBtn) startBtn.addEventListener('click', toggleStartMenu);
  if (startMenuOverlay) startMenuOverlay.addEventListener('click', toggleStartMenu);

  // Close start menu when clicking a link
  const startLinks = document.querySelectorAll('.start-menu-link');
  startLinks.forEach(link => {
    link.addEventListener('click', () => {
      startMenu.classList.remove('active');
      startMenuOverlay.classList.remove('active');
      startBtn.classList.remove('active');
    });
  });

  // Projects Tabs
  const tabTech = document.getElementById('tab-technical');
  const tabGraph = document.getElementById('tab-graphic');
  const contentTech = document.getElementById('content-technical');
  const contentGraph = document.getElementById('content-graphic');
  const statusTab = document.getElementById('status-tab-info');

  if (tabTech && tabGraph) {
    tabTech.addEventListener('click', () => {
      tabTech.style.background = 'var(--win-gray)';
      tabTech.style.top = '2px';
      tabTech.style.zIndex = '1';
      tabTech.style.borderColor = 'var(--win-3d-light) var(--win-3d-dark) var(--win-gray) var(--win-3d-light)';
      
      tabGraph.style.background = 'var(--win-gray-light)';
      tabGraph.style.top = '0px';
      tabGraph.style.zIndex = '0';
      tabGraph.style.borderColor = 'var(--win-3d-light) var(--win-3d-dark) var(--win-3d-dark) var(--win-3d-light)';

      contentTech.style.display = 'grid';
      contentGraph.style.display = 'none';
      statusTab.textContent = '12 projects — click any folder to view details';
    });

    tabGraph.addEventListener('click', () => {
      tabGraph.style.background = 'var(--win-gray)';
      tabGraph.style.top = '2px';
      tabGraph.style.zIndex = '1';
      tabGraph.style.borderColor = 'var(--win-3d-light) var(--win-3d-dark) var(--win-gray) var(--win-3d-light)';
      
      tabTech.style.background = 'var(--win-gray-light)';
      tabTech.style.top = '0px';
      tabTech.style.zIndex = '0';
      tabTech.style.borderColor = 'var(--win-3d-light) var(--win-3d-dark) var(--win-3d-dark) var(--win-3d-light)';

      contentGraph.style.display = 'block';
      contentTech.style.display = 'none';
      statusTab.textContent = 'Graphic Design Portfolio';
    });
  }

  // Fade-in animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.win-window.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Modal logic
  window.projectsData = window.projectsData || {}; // Will be populated in HTML
  
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalTypeBadge = document.getElementById('modal-type-badge');
  const modalYear = document.getElementById('modal-year');
  const modalTechs = document.getElementById('modal-techs');
  const modalImagesContainer = document.getElementById('modal-images-container');
  const modalImage = document.getElementById('modal-image');
  const modalImageControls = document.getElementById('modal-image-controls');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalImageCount = document.getElementById('modal-image-count');
  const modalDescription = document.getElementById('modal-description');
  const modalNoteContainer = document.getElementById('modal-note-container');
  const modalNote = document.getElementById('modal-note');
  const modalStatusType = document.getElementById('modal-status-type');
  const modalStatusTechCount = document.getElementById('modal-status-tech-count');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  let currentProjectImages = [];
  let currentImageIndex = 0;

  window.openProjectModal = function(projectId) {
    const project = window.projectsData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    
    const isLead = project.type.includes('lead');
    const isSolo = project.type === 'Solo Project';
    
    modalTypeBadge.style.background = isLead ? 'var(--win-blue)' : 'var(--win-gray)';
    modalTypeBadge.style.color = isLead ? 'var(--win-white)' : 'var(--win-black)';
    modalTypeBadge.querySelector('span:first-child').textContent = isSolo ? 'SOLO PROJECT' : isLead ? 'TEAM PROJECT — LEAD' : 'TEAM PROJECT';
    modalYear.textContent = project.year;

    modalTechs.innerHTML = '';
    project.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'win-button';
      span.style.cssText = 'font-size: 10px; padding: 3px 8px; min-width: auto; cursor: default;';
      span.textContent = t;
      modalTechs.appendChild(span);
    });

    currentProjectImages = project.images || [];
    currentImageIndex = 0;

    if (currentProjectImages.length > 0) {
      modalImagesContainer.style.display = 'block';
      updateModalImage();
      if (currentProjectImages.length > 1) {
        modalImageControls.style.display = 'flex';
      } else {
        modalImageControls.style.display = 'none';
      }
    } else {
      modalImagesContainer.style.display = 'none';
    }

    modalDescription.textContent = project.fullDescription;

    if (project.note) {
      modalNoteContainer.style.display = 'block';
      modalNote.textContent = project.note;
    } else {
      modalNoteContainer.style.display = 'none';
    }

    modalStatusType.textContent = project.type;
    modalStatusTechCount.textContent = `${project.tech.length} tech(s)`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  function updateModalImage() {
    if (currentProjectImages.length === 0) return;
    modalImage.src = currentProjectImages[currentImageIndex].src;
    modalImage.alt = currentProjectImages[currentImageIndex].alt;
    modalImageCount.textContent = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
      updateModalImage();
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
      updateModalImage();
    });
  }

  // Preloader removal
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 300);
    }
  }, 2000);
});
