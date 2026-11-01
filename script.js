const projects = [
  { number: '01', category: 'COMPUTER NETWORKING', title: 'Network Topology Design', description: 'A suggested beginner project using Cisco Packet Tracer to connect computers, switches, and routers while exploring IP addressing and communication.', tags: ['Cisco Packet Tracer', 'Networking fundamentals'] },
  { number: '02', category: 'CYBERSECURITY / PYTHON', title: 'Password Strength Checker', description: 'A suggested Python practice project that evaluates password characteristics and offers guidance for creating stronger passwords.', tags: ['Python', 'String manipulation', 'Conditional logic'] },
  { number: '03', category: 'CRYPTOGRAPHY / PYTHON', title: 'Caesar Cipher Encryption Tool', description: 'A beginner-friendly practice tool for encryption and decryption using the Caesar Cipher, introducing basic cryptography concepts.', tags: ['Python', 'Basic cryptography', 'String processing'] },
  { number: '04', category: 'WEB DEVELOPMENT', title: 'Personal Portfolio Website', description: 'A responsive website concept for presenting personal interests, academic background, learning projects, and technical skills.', tags: ['HTML', 'CSS', 'JavaScript'] },
  { number: '05', category: 'PROGRAMMING', title: 'Student Information Management', description: 'A suggested console-based application for storing, displaying, searching, and managing student information with fundamental programming concepts.', tags: ['C++', 'Functions', 'Arrays'] },
  { number: '06', category: 'NETWORK SECURITY', title: 'Basic Network Traffic Analysis', description: 'A controlled lab exercise using Wireshark to observe packet information, IP addresses, protocols, and communication patterns.', tags: ['Wireshark', 'Packet analysis', 'Networking fundamentals'] }
];

// All static files are stored beside index.html in the GitHub Pages root.
// Using document.baseURI also works when the repository is hosted under a project path.
const assetPath = fileName => new URL(fileName, document.baseURI).href;
const certificateFiles = [
  'certificate-1.jpg',
  'certificate-2.jpg',
  'certificate-3.jpg',
  'certificate-4.jpg',
  'certificate-5.jpg',
  'certificate-6.jpg',
  'certificate-7.jpg'
];

const grid = document.querySelector('#projects-grid');
const modal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalCategory = document.querySelector('#modal-category');
const modalDescription = document.querySelector('#modal-description');
const modalTags = document.querySelector('#modal-tags');

const visibleProjects = projects;
grid.innerHTML = visibleProjects.map((project, index) => `
  <article class="project-card">
    <div class="project-visual"><div class="project-art" data-art="${project.number}" aria-label="Demo illustration placeholder"><span></span><span></span><span></span></div><span class="project-number">${project.number}</span><span class="project-category">${project.category}</span></div>
    <div class="project-content"><h3>${project.title}</h3><p>${project.description}</p><button class="project-link" data-project="${index}">View details <span>↗</span></button></div>
  </article>`).join('');

function openProject(project) {
  modalTitle.textContent = project.title;
  modalCategory.textContent = `${project.number} / ${project.category}`;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (button) openProject(visibleProjects[button.dataset.project]);
});

document.querySelector('.modal-close').addEventListener('click', closeProject);
document.querySelector('.modal-backdrop').addEventListener('click', closeProject);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeProject(); });

const nav = document.querySelector('.nav');
document.querySelector('.menu-toggle').addEventListener('click', () => {
  const expanded = nav.classList.toggle('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', expanded);
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 12));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  const data = new FormData(event.target);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  window.location.href = `mailto:sabihasuborna40@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Your email app is opening with the message prepared.';
});

const profile = document.querySelector('.avatar-placeholder');
const profileImage = new Image();
profileImage.src = assetPath('sabiha-profile.png');
profileImage.alt = 'Portrait of Sabiha Sultana Surborna';
profileImage.onload = () => { profile?.replaceChildren(profileImage); };

// Normalize image paths in case the HTML was copied from the previous assets/ structure.
const universityLogo = document.querySelector('.uni-mark img');
if (universityLogo) universityLogo.src = assetPath('aiub-logo.png');

document.querySelectorAll('.certificate-card img').forEach((image, index) => {
  if (certificateFiles[index]) image.src = assetPath(certificateFiles[index]);
});

// Keep the scholarship certificates clearly identified in the gallery.
const certificateCards = document.querySelectorAll('.certificate-card');
[
  { index: 1, title: 'Scholarship', alt: 'Wadud Bhuyan Scholarship Trust certificate' },
  { index: 3, title: 'Scholarship', alt: 'Wadud Bhuyan Scholarship Trust certificate' }
].forEach(({ index, title, alt }) => {
  const card = certificateCards[index];
  if (!card) return;
  card.classList.add('scholarship-card');
  card.querySelector('img').alt = alt;
  card.querySelector('.mono-label').textContent = 'SCHOLARSHIP';
  card.querySelector('h3').textContent = title;
  card.querySelector('p').textContent = 'Wadud Bhuyan Scholarship Trust';
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .25, .6] });
sections.forEach(section => sectionObserver.observe(section));
