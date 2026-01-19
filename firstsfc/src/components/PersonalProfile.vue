<template>
  <div>
    <!-- Progress Bar -->
    <div class="progress-bar"></div>

    <!-- Book container -->
    <div class="book" id="book">
      <!-- Front cover -->
      <div
        class="book__page book__cover book__cover--front"
        style="--page-index: 1;"
      >
        <div class="page__half page__half--front">
          <img
            src="/Images/Title.png"
            alt="Title"
            class="title"
          />
          <img
            src="/Images/Doodles and stickers/Sun.png"
            alt="Sun"
            class="sun"
          />
          <img
            src="/Images/Doodles and stickers/Spark4.png"
            alt="Spark"
            class="spr"
          />
          <img
            src="/Images/ME/Magazine.png"
            alt="Front Cover Image"
            class="fci"
          />
          <img
            src="/Images/Doodles and stickers/Clover.png"
            alt="leaf"
            class="clove"
          />
          <img
            src="/Images/Doodles and stickers/Van.png"
            alt="Van"
            class="van"
          />
          <img
            src="/Images/Doodles and stickers/Plane.png"
            alt="plane"
            class="plane"
          />

          <span class="page__number">Q.N</span>
        </div>
        <div class="page__half page__half--back">
          <div class="book__insert"></div>
        </div>
      </div>

      <!-- Back cover -->
      <div
        class="book__page book__cover book__cover--back"
        style="--page-index: 17;"
      >
        <div class="page__half page__half--front">
          <div class="book__insert"></div>
          <img
            class="title2"
            src="/Images/Title.png"
            alt="title2"
          />
        </div>
        <div class="page__half page__half--back">
          <span class="page__number">End</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
 /* ============================================
   DEMO DATA - IMAGE ASSETS
   
   WHERE IMAGES COME FROM:
   - Images are loaded from CodePen's S3 bucket
   - URL pattern: https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/{name}-sketch.svg
   - These are SVG sketch illustrations by @jh3y
   
   HOW TO USE YOUR OWN IMAGES:
   1. Add your image to the assets/Images folder
   2. Change the image URL in the loop below (around line 50)
   3. Or modify this array to use local paths:
   
   Example with local images:
   const DEMOS = [
     { name: 'MyProject', image: 'assets/Images/myimage.jpg', link: 'https://mysite.com' },
     { name: 'Another', image: 'assets/Images/another.png', link: '#' },
   ];
   
   Then update the img.src line to: img.src = demo.image;
============================================ */
const DEMOS = [
  { name: 'Kitkat', id: 'LYpNyvm' },
  { name: 'Newton', id: 'abzeaWJ' },
  { name: 'Launch', id: 'rNOqzbN' },
  { name: 'Birthday', id: 'BaobKOJ' },
  { name: 'Impossible', id: 'ZjLKGY' },
  { name: 'Care', id: 'RwPrOoz' },
  { name: 'Cubes', id: 'QWbRxXb' },
  { name: 'Elon', id: 'RwWMwvY' },
  { name: 'Gun', id: 'GRoKOyg' },
  { name: 'Moon', id: 'NWqemYK' },
  { name: 'Pokedex', id: 'eYpGQxr' },
  { name: 'Record', id: 'RwraKYZ' },
  { name: 'Tcannon', id: 'eYpmBxQ' },
  { name: 'Cloud', id: 'MWwRKvd' },
  { name: 'Fireflies', id: 'zYGQYWJ' },
  { name: 'Train', id: 'eYpdPWa' },
  { name: 'Pancake', id: 'jJVpWZ' },
  { name: 'Earth', id: 'aPzVme' },
  { name: 'Matryoshka', id: 'jOOYMLm' },
  { name: 'Truck', id: 'MWWowEb' }
];

/* ============================================
   DOM SETUP & PAGE GENERATION
   
   HOW TO CHANGE NUMBER OF PAGES:
   1. Change PAGES constant below (e.g., PAGES = 5 for 5 pages = 10 sides)
   2. Update --page-count in style.css to match (PAGES * 2)
   3. Make sure you have enough items in DEMOS array
   
   HOW THE PAGE STRUCTURE WORKS:
   - Each page has 2 sides: front (page__half--front) and back (page__half--back)
   - --page-index controls the stacking order (z-index)
   - Lower index = on top of the stack
============================================ */
const book = document.getElementById('book');
const PAGES = 10; // 10 page elements  → 20 content sides (change this to add/remove pages)
// Dynamically set page count for CSS calculations
document.documentElement.style.setProperty('--page-count', PAGES * 2);

// Update back cover's page-index dynamically
const backCover = document.querySelector('.book__cover--back');
backCover.style.setProperty('--page-index', PAGES + 2);
/* ============================================
   PAGE GENERATION LOOP
   
   This loop creates each page dynamically.
   Each iteration creates ONE page with TWO sides.
============================================ */
for (let p = 0; p < PAGES; p++) {
  const pageIndex = p + 2; // pages start after front cover (index 2..11)

  // Create the page container
  const page = document.createElement('div');
  page.className = 'book__page';
  page.style.setProperty('--page-index', pageIndex);

  /* ============================================
     FRONT SIDE OF PAGE (Right-hand page when open)
     
     ⬇️⬇️⬇️ PAGE CONTENT STARTS HERE ⬇️⬇️⬇️
     
     TO REMOVE ALL CONTENT: Delete everything between
     "if (idx1 < DEMOS.length) {" and its closing "}"
     
     TO ADD YOUR OWN CONTENT:
     - Text: frontHalf.innerHTML = '<p>Your text</p>';
     - Image: frontHalf.innerHTML = '<img src="assets/Images/yourimage.jpg">';
  ============================================ */
  const frontHalf = document.createElement('div');
  frontHalf.className = 'page__half page__half--front';
  const idx1 = p * 2; // 0, 2, 4... (indexes into DEMOS array)
  
  //1st page
  if (p === 0) {
    const demo = DEMOS[idx1];
    
    // Create clickable link
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    
    // Create image
    const img = document.createElement('img');
    // IMAGE SOURCE - Change this URL to use your own images:
    img.src = `assets/Images/Title.png`;
    img.className = 'title3';
    // For local images use: img.src = `assets/Images/${demo.name}.jpg`;
    img.alt = "title3";
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 0) {
    const textContainer = document.createElement('div');
    textContainer.className = 'pers';
    textContainer.innerHTML = `
    <p class="name">Qelvin Joszeler D. Nagales</p>
      <p class="subject">WEBPROG</p>
      <p class="prof">Mr. Quesada</p>`;
    frontHalf.appendChild(textContainer);
  }

  //3rd page
  if (p === 1) {
    const textContainer = document.createElement('div');
    textContainer.className = 'terdpage';
    textContainer.innerHTML = `
    <p class="terd">Motto:</p>
    <p class="terd">"No Matter what happens, always choose to be happy and make others happy."</p>
    <p class="terd">Ambition/s:</p>
    <p class="terd">"A simple person with a big heart. Aspiring to become a CEO and billionaire. It might be unusual that I am in a tech course but I really want to be my own boss and create my own company."</p>`;
    frontHalf.appendChild(textContainer);
  }

if (p === 1) {
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  
  const images = [
    { src: 'MSC.png', link: 'https://www.facebook.com/APCMSC' }, 
    { src: 'Band.png', link: 'https://www.facebook.com/theapcband' },
    { src: 'SOAR.png', link: 'https://www.facebook.com/APCSOAR' },
    { src: 'GG.png', link: 'https://www.facebook.com/APCGamingGenesis' },
    { src: 'JISSA.png', link: 'https://www.facebook.com/APC.JISSA' }, 
    { src: 'JPCS.png', link: 'https://www.facebook.com/JPCSAPC' },
    { src: 'BRIDGE.png', link: 'https://www.facebook.com/apc.bridge' },
    { src: 'SoCIT.png', link: 'https://www.facebook.com/apc.socit' }
  ];
  
  images.forEach(({ src, link }) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noreferrer noopener';
    
    const img = document.createElement('img');
    img.src = `assets/Images/ORGS/${src}`;
    img.className = 'gallery-img';
    img.alt = 'Gallery image';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.5, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.5, ease: 'power2.out' });
    });
    
    a.appendChild(img);
    gallery.appendChild(a);
  });
  
  frontHalf.appendChild(gallery);
}

if (p === 1) {
    const textContainer = document.createElement('div');
    textContainer.className = 'orgs-container';
    textContainer.innerHTML =`<p class="orgs">Organizations & Affiliations</p>`;
    frontHalf.appendChild(textContainer);
  }

if (p === 1) {
    const textContainer = document.createElement('div');
    textContainer.className = 'orgs-container';
    textContainer.innerHTML =`<p class="orgs">Organizations & Affiliations</p>`;
    frontHalf.appendChild(textContainer);
  }

if (p === 1) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Organization.png`;
    img.className = 'org-logo';
    img.alt = "org-logo";
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  // Friends photo grid on page 1
  if (p === 1) {
    const grid = document.createElement('div');
    grid.className = 'friends-grid';
    
    const friendImages = [
      { src: 'img (1).jpg', className: 'friend-img-1' },
      { src: 'img (2).jpg', className: 'friend-img-2' },
      { src: 'img (3).jpg', className: 'friend-img-3' },
      { src: 'img (4).jpg', className: 'friend-img-4' },
      { src: 'img (5).jpg', className: 'friend-img-5' },
      { src: 'img (6).jpg', className: 'friend-img-6' }
    ];
    
    friendImages.forEach(({ src, className }) => {
      const img = document.createElement('img');
      img.src = `assets/Images/Friends/${src}`;
      img.className = className;
      img.alt = 'Friend photo';
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.5, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, rotation: 0, duration: 0.5, ease: 'power2.out' });
      });
      img.addEventListener('click', () => openModal(img.src));
      grid.appendChild(img);
    });
    
    frontHalf.appendChild(grid);
  }
  
  //5th page
   if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Skills.png`;
    img.className = 'skills';
    img.alt = 'skills';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }
  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'projs';
    textContainer.innerHTML = `<h2 class="projs-title">My Skills and Projects</h2>`;
    frontHalf.appendChild(textContainer);
  }

   if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.href = `https://soar-shirt-shop.vercel.app/`;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/PROJECTS/SOAR-SHIRT.png`;
    img.className = 'SOAR-proj';
    img.alt = 'SOAR-proj';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/PROJECTS/SOAR SHIRT (1).png`;
    img.className = 'Soarshirt';
    img.alt = 'Soarshirt';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation:10, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'Soar-text';
    textContainer.innerHTML = `<p2 class="soar-desc">SOAR SHIRT ORDERING SYSTEM</p2>`;
    frontHalf.appendChild(textContainer);
  }
  
  if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.href = `https://apcband.vercel.app/`;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/PROJECTS/APC BAND.png`;
    img.className = 'Band-proj';
    img.alt = 'Band-proj';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ORGS/Band.png`;
    img.className = 'Bandcon';
    img.alt = 'Bandcon';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: -5, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'Band-text';
    textContainer.innerHTML = `<p2 class="Band-desc">APC BAND TICKETING SYSTEM</p2>`;
    frontHalf.appendChild(textContainer);
  }

  if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/PROJECTS/SOCIT-MERCH.png`;
    img.className = 'socit-proj';
    img.alt = 'socit-proj';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('click', () => openModal(img.src));
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/PROJECTS/SoCIT Merchs.png`;
    img.className = 'socitmerchs';
    img.alt = 'socitmerchs';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: -5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 5  , duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'socit-text';
    textContainer.innerHTML = `<p2 class="socit-desc">SOCIT MERCHANDISE(in progress...)</p2>`;
    frontHalf.appendChild(textContainer);
  }

  //7th page
  if (p === 3) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ME/Kalbo.png`;
    img.className = 'kalbo';
    img.alt = 'kalbo';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }
  if (p === 3) {
    const textContainer = document.createElement('div');
    textContainer.className = 'funfacts-container';
    textContainer.innerHTML = `<h2 class="funfacts-title">Fun Facts about Me</h2>`;
    frontHalf.appendChild(textContainer);
  }

  if (p === 3) {
    const textContainer = document.createElement('div');
    textContainer.className = 'sponty';
    textContainer.innerHTML = `
      <p class="sponty-title">I am a very spontaneous person.</p>
      <p class="sponty-title">I tend to do things without planning it first.</p>
      <p class="sponty-title">I like to go out and hang out with my friends.</p>`;
    frontHalf.appendChild(textContainer); 
  }

  if (p === 3) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Friends/img (7).jpg`;
    img.className = 'sponty-pic';
    img.alt = 'sponty-pic';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 3) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Friends/img (8).jpg`;
    img.className = 'sponty-pic2';
    img.alt = 'sponty-pic2';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  if (p === 3) {
    const demo = DEMOS[idx1];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Friends/img (10).jpg`;
    img.className = 'sponty-pic3';
    img.alt = 'sponty-pic3';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    frontHalf.appendChild(link);
  }

  // ========== PAGE 7 (p=3 front) SUBTLE DECORATIONS ==========
  if (p === 3) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Heart1.png';
    img.className = 'heart-p7';
    img.alt = 'heart';
    frontHalf.appendChild(img);
  }
  if (p === 3) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark3.png';
    img.className = 'spark-p7';
    img.alt = 'spark';
    frontHalf.appendChild(img);
  }

  //9th page
  if (p === 4) {
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Tear1.png`;
    img.className = 'tear1';
    img.alt = 'tear';
    frontHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/FEMINISM.jpg`;
    img.className = 'feminism';
    img.alt = 'feminism';
    frontHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/EARPHONES.png`;
    img.className = 'ephones';
    img.alt = 'ephones';
    frontHalf.appendChild(img);
  }

  if (p === 4) {
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/TOTEBAG.png`;
    img.className = 'totebag';
    img.alt = 'totebag';
    frontHalf.appendChild(img);
  }

  // ========== PAGE 9 (p=4 front) SUBTLE DECORATIONS ==========
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark5.png';
    img.className = 'spark-p9';
    img.alt = 'spark';
    frontHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Cherry.png';
    img.className = 'cherry-p9';
    img.alt = 'cherry';
    frontHalf.appendChild(img);
  }
  
  // ========== END OF FRONT PAGE CONTENT ==========
  const pageNum1 = document.createElement('span');
  pageNum1.className = 'page__number';
  pageNum1.textContent = idx1 + 1; // 1, 3, 5...
  frontHalf.appendChild(pageNum1);

  /* ============================================
     BACK SIDE OF PAGE (Left-hand page when open)
     
     ⬇️⬇️⬇️ PAGE CONTENT STARTS HERE ⬇️⬇️⬇️
     
     Same as front side - delete or modify the block below
  ============================================ */
  const backHalf = document.createElement('div');
  backHalf.className = 'page__half page__half--back';
  const idx2 = p * 2 + 1; // 1, 3, 5... (odd indexes for back sides)
  
  // ========== BACK PAGE CONTENT - DELETE OR MODIFY THIS BLOCK ==========

  //2nd page - BACK SIDE
  if (p === 0) {
    const demo = DEMOS[idx2];
    
    // Create clickable link
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    
    // Create image
    const img = document.createElement('img');
    img.src = `assets/Images/ME/Orig.png`;
    img.className = 'dp';
    img.alt = "dp";
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.5, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const textContainer = document.createElement('div');
    textContainer.className = 'page-text';
    textContainer.innerHTML = `
      <h2 class="page-title">I'm Qelvin!</h2>
      <p class="page-subtitle">Aspiring CEO & Billionaire</p>
      <p class="page-description">It's a pleasure to meet you!</p>`;
    backHalf.appendChild(textContainer);
  }
  
  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Cam.png`;
    img.className = 'cam';
    img.alt = 'cam';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.href = ``;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Bulb.png`;
    img.className = 'bulb';
    img.alt = 'bulb';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const textContainer = document.createElement('div');
    textContainer.className = 'GTKM-container';
    textContainer.innerHTML = `<h2 class="GTKM">Get To Know Me</h2>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 0) {
    const textContainer = document.createElement('div');
    textContainer.className = 'about';
    textContainer.innerHTML = `<p class="abt">Name: Qelvin Joszeler D. Nagales</p>`;
    textContainer.innerHTML += `<p class="abt">Age: 19 years old</p>`;
    textContainer.innerHTML += `<p class="abt">Birthday: April 20, 2006</p>`;
    textContainer.innerHTML += `<p class="abt">City: Manila City</p>`;
    textContainer.innerHTML += `<p class="abt">School: Asia Pacific College - SoCIT</p>`;
    textContainer.innerHTML += `<p class="abt">Course: Bachelor of Science in Information Technology</p>`;
    textContainer.innerHTML += `<p class="abt">Hobbies: Playing Video Games, Watching Movies/Series, Listening to Music, Reading books</p>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Star.png`;
    img.className = 'star';
    img.alt = 'star';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Star.png`;
    img.className = 'star2';
    img.alt = 'star2';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Star.png`;
    img.className = 'star3';
    img.alt = 'star3';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Clover.png`;
    img.className = 'clove2';
    img.alt = 'clove2';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Heart2.png`;
    img.className = 'hearts';
    img.alt = 'hearts';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.href = `https://apc.edu.ph/`;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/LOGO/APC.png`;
    img.className = 'apc';
    img.alt = 'apc seal';
    
    // Hover animation using GSAP
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    
    link.appendChild(img);
    backHalf.appendChild(link);
  }

   if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Controller.png`;
    img.className = 'vg';
    img.alt = 'vg';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.5, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 2, duration: 0.5, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Music1.png`;
    img.className = 'music';
    img.alt = 'music';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Books.png`;
    img.className = 'books';
    img.alt = 'books';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 0) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/LOGO/Marvel.png`;
    img.className = 'marvel';
    img.alt = 'marvel';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  //4th page - BACK SIDE
  if (p === 1) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Skills.png`;
    img.className = 'skills';
    img.alt = 'skills';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 1) {
    const textContainer = document.createElement('div');
    textContainer.className = 'arsenal';
    textContainer.innerHTML = `<h2 class="arsenal-title">My Skills and Projects</h2>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 1) {
    const grid = document.createElement('div');
    grid.className = 'skills-grid';
    
    const skillsImage = [
      { src: 'HTML.png', className: 'Skill-1' },
      { src: 'CSS.png', className: 'Skill-2' },
      { src: 'JAVASCRIPT.png', className: 'Skill-3' },
      { src: 'Python.png', className: 'Skill-4' },
      { src: 'JAVA.png', className: 'Skill-5' },
      { src: 'MYSQL.png', className: 'Skill-6' },
      { src: 'POWERAPPS.png', className: 'Skill-7' },
      { src: 'SUPABASE.png', className: 'Skill-8' },
      { src: 'GIT.png', className: 'Skill-9' },
      { src: 'FLUTTER.png', className: 'Skill-10' },
      { src: 'REACT.png', className: 'Skill-11' },
      { src: 'CANVA.png', className: 'Skill-12' },
      { src: 'WORD.png', className: 'Skill-13' },
      { src: 'EXCEL.png', className: 'Skill-14' },
      { src: 'FIGMA.png', className: 'Skill-15' }
    ];
    
    skillsImage.forEach(({ src, className }) => {
      const img = document.createElement('img');
      img.src = `assets/Images/LOGO/${src}`;
      img.className = className;
      img.alt = 'Skills image';
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.5, ease: 'power2.out'});
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, rotation: 0, duration: 0.5, ease: 'power2.out'});
      });
      grid.appendChild(img);
    });
    
    backHalf.appendChild(grid);
  }
  //6th page - BACK SIDE
  if (p === 2) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ME/Kalbo.png`;
    img.className = 'kalbo';
    img.alt = 'kalbo';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }
  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'funfacts-container';
    textContainer.innerHTML = `<h2 class="funfacts-title">Fun Facts about Me</h2>`;
    backHalf.appendChild(textContainer);
  }
  if (p === 2) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ME/Lean.png`;
    img.className = 'lean';
    img.alt = 'lean';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'pres-container';
    textContainer.innerHTML = `
      <p class="pres1">President of</p>
      <p class="pres1">APC - Microsoft Community</p>
      <p class="pres1">S.Y. 2025 - 2026</p>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 2) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Cat.png`;
    img.className = 'cat';
    img.alt = 'cat';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: -15, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }
  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'cat-text-container';
    textContainer.innerHTML = `
      <p class="cat1">We have 13 adopted cats</p>
      <p class="cat1">in our house</p>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'cat-text-container';
    textContainer.innerHTML = `
      <p class="cat1">We have 13 adopted cats</p>
      <p class="cat1">in our house</p>`;
    backHalf.appendChild(textContainer);
  }

  if (p === 2) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ME/singing.png`;
    img.className = 'singing';
    img.alt = 'singing';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 2) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/ME/singing2.png`;
    img.className = 'singing2';
    img.alt = 'singing2';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 2) {
    const textContainer = document.createElement('div');
    textContainer.className = 'singing-text-container';
    textContainer.innerHTML = `
      <p class="sing">I am a vocalist of</p>
      <p class="sing">the APC Band</p>`;
    backHalf.appendChild(textContainer);
  }

  // ========== PAGE 6 (p=2 back) SUBTLE DECORATIONS ==========
  if (p === 2) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Star.png';
    img.className = 'star-p6';
    img.alt = 'star';
    backHalf.appendChild(img);
  }
  if (p === 2) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark2.png';
    img.className = 'spark-p6';
    img.alt = 'spark';
    backHalf.appendChild(img);
  }

  //8th page - BACK SIDE
  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Like.png`;
    img.className = 'like';
    img.alt = 'like';
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.15, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    });
    link.appendChild(img);
    backHalf.appendChild(link);
  }
  if (p === 3) {
    const textContainer = document.createElement('div');
    textContainer.className = 'like-container';
    textContainer.innerHTML = `<h2 class="likes">MY FAVORITES</h2>`;
    backHalf.appendChild(textContainer);
  }
  if (p === 3) {
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Tear2.png`;
    img.className = 'tear2';
    img.alt = 'tear2';
    backHalf.appendChild(img);
  }
  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/CHEESE.png`;
    img.className = 'cheese';
    img.alt = 'cheese';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/BED.png`;
    img.className = 'bed';
    img.alt = 'bed';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/CLAIRO.png`;
    img.className = 'clairo';
    img.alt = 'clairo';
    link.appendChild(img);
    backHalf.appendChild(link);
  }
  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/MATCHA.png`;
    img.className = 'matcha';
    img.alt = 'matcha';
    link.appendChild(img);
    backHalf.appendChild(link);
  }
if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/QZIP.png`;
    img.className = 'qzip';
    img.alt = 'qzip';
    link.appendChild(img);
    backHalf.appendChild(link);
  }
  if (p === 3) {
    const demo = DEMOS[idx2];
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    const img = document.createElement('img');
    img.src = `assets/Images/Doodles and stickers/Flowers2.png`;
    img.className = 'flowers2';
    img.alt = 'flowers2';
    link.appendChild(img);
    backHalf.appendChild(link);
  }

  // ========== PAGE 8 (p=3 back) SUBTLE DECORATIONS ==========
  if (p === 3) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark1.png';
    img.className = 'spark-p8';
    img.alt = 'spark';
    backHalf.appendChild(img);
  }
  if (p === 3) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Star.png';
    img.className = 'star-p8';
    img.alt = 'star';
    backHalf.appendChild(img);
  }

  if (p === 4) {
    const textContainer = document.createElement('div');
    textContainer.className = 'happiness';
    textContainer.innerHTML = 
    `<h2 class="happy">MY HAPPINESS</h2>
    <p class="gf">MY GIRLFRIEND</p>`;
    backHalf.appendChild(textContainer);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Tear3.png';
    img.className = 'tear3';
    img.alt = 'tear3';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Tear1.png';
    img.className = 'tear1p2';
    img.alt = 'tear1p2';
    backHalf.appendChild(img);

  } if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Tear3.png';
    img.className = 'tear3p2';
    img.alt = 'tear3';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flower3.png';
    img.className = 'flowers3';
    img.alt = 'flowers3';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flower3.png';
    img.className = 'flowers3p2';
    img.alt = 'flowers3';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Gwen/crop.png';
    img.className = 'gwen1';
    img.alt = 'shades';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark4.png';
    img.className = 'spark4';
    img.alt = 'spark4';
    backHalf.appendChild(img);
  }
  if (p === 4) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flowers4.png';
    img.className = 'flowers4';
    img.alt = 'flowers4';
    backHalf.appendChild(img);
  }

  // ========== PAGE 11 (p=5 front) BACKGROUND ==========
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flower3.png';
    img.className = 'flowers3';
    img.alt = 'flowers3';
    frontHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark4.png';
    img.className = 'spark4';
    img.alt = 'spark4';
    frontHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Tear3.png';
    img.className = 'Tear3';
    img.alt = 'tear3';
    frontHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Cherry.png';
    img.className = 'cherry-deco';
    img.alt = 'cherry';
    frontHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Spark1.png';
    img.className = 'spark1-deco';
    img.alt = 'spark1';
    frontHalf.appendChild(img);
  }

  // ========== PAGE 12 (p=5 back) BACKGROUND ==========
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flower3.png';
    img.className = 'flowers3p2';
    img.alt = 'flowers3';
    backHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Tear3.png';
    img.className = 'tear3p2';
    img.alt = 'tear3';
    backHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Flowers4.png';
    img.className = 'flowers4';
    img.alt = 'flowers4';
    backHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Crown.png';
    img.className = 'crown-deco';
    img.alt = 'crown';
    backHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Heart1.png';
    img.className = 'heart1-deco';
    img.alt = 'heart';
    backHalf.appendChild(img);
  }
  if (p === 5) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Doodles and stickers/Arrow.png';
    img.className = 'arrow-deco';
    img.alt = 'arrow';
    backHalf.appendChild(img);
  }
  // ========== PAGE 12 (p=6 front) SPOTIFY & CONTENT ==========
// ========== PAGE 12 (p=6 front) SPOTIFY GALLERY ==========
if (p === 5) {
  const spotifyGallery = document.createElement('div');
  spotifyGallery.className = 'spotify-gallery-12';

  const songs = [
    "https://open.spotify.com/embed/track/2LlOeW5rVcvl3QcPNPcDus?utm_source=generator", 
    "https://open.spotify.com/embed/track/5tlb0AxuzsMWL2GtEppXGX?utm_source=generator", 
    "https://open.spotify.com/embed/track/1ytElsSPsJ1GBqMfPYydRX?utm_source=generator", 
    "https://open.spotify.com/embed/track/312z6PZ8wwREck8613PkJk?utm_source=generator", 
    "https://open.spotify.com/embed/album/2T523YMzbCSM86LYZDCZLI?utm_source=generator" 
  ];

  songs.forEach((link) => {
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.width = "100%";
    iframe.height = "80"; 
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    iframe.style.borderRadius = "12px";
    iframe.style.marginBottom = "10px";

    spotifyGallery.appendChild(iframe);
  });

  backHalf.appendChild(spotifyGallery);
}

if (p === 5) {
  const textContainer = document.createElement('div');
  textContainer.className = 'music-container';
  textContainer.innerHTML = `<h2 class="musicc">FAVORITE SONGS</h2>`;
  backHalf.appendChild(textContainer);
}
  
// ========== PAGE 11 (p=5 front) PHOTO GRID ==========
if (p === 5) {
  const grid = document.createElement('div');
  grid.className = 'photo-grid-11';
  
  const flowerImages = [
    { src: 'flower1.jpg' },
    { src: 'flower2.jpg' },
    { src: 'flower3.jpg' },
    { src: 'flower4.jpg' }
  ];
  
  flowerImages.forEach(({ src }) => {
    const img = document.createElement('img');
    img.src = `assets/Images/Gwen/${src}`;
    img.className = 'photo-grid-img-11';
    img.alt = 'Flower photo';
    img.addEventListener('click', () => openModal(img.src));
    
    grid.appendChild(img);
  });
  
  frontHalf.appendChild(grid);
}

  // ========== PAGE 13 (p=6 front) BACKGROUND ==========
  if (p === 6) {
    const img1 = document.createElement('img');
    img1.src = 'assets/Images/Doodles and stickers/Spark4.png';
    img1.className = 'spark4';
    img1.alt = 'spark4';
    frontHalf.appendChild(img1);
    const img2 = document.createElement('img');
    img2.src = 'assets/Images/Doodles and stickers/Tear1.png';
    img2.className = 'tear1p2';
    img2.alt = 'tear1';
    frontHalf.appendChild(img2);
    const img3 = document.createElement('img');
    img3.src = 'assets/Images/Doodles and stickers/Flower3.png';
    img3.className = 'flowers3';
    img3.alt = 'flowers3';
    frontHalf.appendChild(img3);
  }

  if (p === 6) {
    const img = document.createElement('img');
    img.src = 'assets/Images/Gwen/couple2.png';
    img.className = 'couple2';
    img.alt = 'couple2';
    frontHalf.appendChild(img);
  }
// ========== PAGE 6 BACK SOCIAL MEDIA GALLERY ==========
if (p === 6) {
  const gallery = document.createElement('div');
  gallery.className = 'social-gallery-grid';

  const socialData = [
    { src: 'FACEBOOK.png', url: 'https://www.facebook.com/Qelvin17' },
    { src: 'INSTAGRAM.png', url: 'https://www.instagram.com/cupofjosze/' },
    { src: 'LINKEDIN.png', url: 'https://www.linkedin.com/in/qdnagales/' },
    { src: 'Github.png', url: 'https://github.com/QelvinNagales' }
  ];

  socialData.forEach(social => {
    const anchor = document.createElement('a');
    anchor.href = social.url;
    anchor.target = '_blank';
    anchor.className = 'social-gallery-item';

    const img = document.createElement('img');
    img.src = `assets/Images/LOGO/${social.src}`; 
    img.alt = social.src;
    img.className = 'social-gallery-img';
    
    img.onerror = () => {
      console.error(`Missing Image: ${img.src}`);
      anchor.innerHTML = `<span style="color:blue; text-decoration:underline;">${social.src.split('.')[0]}</span>`;
    };

    anchor.appendChild(img);
    gallery.appendChild(anchor);
  });

  backHalf.appendChild(gallery);
}

if (p === 6) {
  const textContainer = document.createElement('div');
  textContainer.className = 'connect-container';
  textContainer.innerHTML = `<h2 class="connect">CONNECT WITH ME</h2>`;
  backHalf.appendChild(textContainer);
}

  // ========== PAGE 15 (p=7 front) BACKGROUND ==========
  if (p === 7) {
    const textContainer = document.createElement('div');
    textContainer.className = 'thankyou-container';
    textContainer.innerHTML = `<h2 class="thankyou">THANK YOU FOR VIEWING MY PORTFOLIO!</h2>`;
    frontHalf.appendChild(textContainer);
  }
    if (p === 7) {
    const textContainer = document.createElement('div');
    textContainer.className = 'to-be-continued-container';
    textContainer.innerHTML = `<h2 class="tbc">To Be Continued...</h2>`;
    backHalf.appendChild(textContainer);
  }
  // ========== RESOURCES PAGE (Page 13 Front) ==========
  if (p === 8) {
    const resourcesContainer = document.createElement('div');
    resourcesContainer.className = 'resources-container';
    resourcesContainer.innerHTML = `
      <h2 class="resources-title">Resources & Credits</h2>
      <div class="resources-content">
        <p class="resources-section"><strong>Libraries:</strong></p>
        <p class="resources-item">• GSAP - greensock.com/gsap</p>
        <p class="resources-item">• ScrollTrigger - greensock.com/scrolltrigger</p>
        <p class="resources-section"><strong>Fonts:</strong></p>
        <p class="resources-item">• Handlee - Google Fonts</p>
        <p class="resources-item">• Handelson Four - freefontdownload.org</p>
        <p class="resources-section"><strong>Inspiration:</strong></p>
        <p class="resources-item">• 3D Book Effect by @jh3y - CodePen</p>
        <p class="resources-item">• MDN Web Docs - CSS 3D Transforms</p>
      </div>
    `;
    backHalf.appendChild(resourcesContainer);
  }


  // ========== RESOURCES PAGE (Page 13 Back) ==========
  if (p === 9) {
    const resourcesContainer2 = document.createElement('div');
    resourcesContainer2.className = 'resources-container';
    resourcesContainer2.innerHTML = `
      <h2 class="resources-title">AI & Tools</h2>
      <div class="resources-content">
        <p class="resources-section"><strong>AI Assistance:</strong></p>
        <p class="resources-item">• GitHub Copilot</p>
        <p class="resources-item">• Used for code clarification, debugging,</p>
        <p class="resources-item">  guidance & validation fixes</p>
        <p class="resources-section"><strong>Development Tools:</strong></p>
        <p class="resources-item">• Visual Studio Code</p>
        <p class="resources-item">• Live Server Extension</p>
        <p class="resources-item">• Vercel</p>
        <p class="resources-section"><strong>Validators:</strong></p>
        <p class="resources-item">• W3C HTML/CSS Validators</p>
      </div>
    `;
    backHalf.appendChild(resourcesContainer2);
  }

  // ========== RESOURCES PAGE (Page 14 Front) ==========
  if (p === 9) {
    const resourcesContainer3 = document.createElement('div');
    resourcesContainer3.className = 'resources-container';
    resourcesContainer3.innerHTML = `
      <h2 class="resources-title">Images & Graphics</h2>
      <div class="resources-content">
        <p class="resources-section"><strong>Personal Photos:</strong></p>
        <p class="resources-item">• All photos owned by Qelvin Nagales</p>
        <p class="resources-section"><strong>Organization Logos:</strong></p>
        <p class="resources-item">• MSC, APC Band, SOAR, Gaming Genesis</p>
        <p class="resources-item">• JISSA, JPCS, BRIDGE, SoCIT</p>
        <p class="resources-section"><strong>Skill Logos:</strong></p>
        <p class="resources-item">• HTML, CSS, JS, Python, Java, MySQL</p>
        <p class="resources-item">• Figma, Canva, MS Office, React</p>
        <p class="resources-section"><strong>Decorative Elements:</strong></p>
        <p class="resources-item">• Various doodles & stickers</p>
      </div>
    `;
    frontHalf.appendChild(resourcesContainer3);
  }

  
  // ========== END OF BACK PAGE CONTENT ==========
  const pageNum2 = document.createElement('span');
  pageNum2.className = 'page__number';
  pageNum2.textContent = idx2 + 1; // 2, 4, 6...
  backHalf.appendChild(pageNum2);
  
  // ========== END OF BACK PAGE CONTENT ==========

  // Add halves to page
  page.appendChild(frontHalf);
  page.appendChild(backHalf);

  // Insert before back cover
  const backCover = document.querySelector('.book__cover--back');
  book.insertBefore(page, backCover);
}

/* ============================================
   GSAP SCROLL ANIMATIONS
   
   HOW THE ANIMATION WORKS:
   - GSAP is a powerful animation library
   - ScrollTrigger links animations to scroll position
   - scrub: 1 means smooth animation tied to scroll
   
   HOW TO ADJUST ANIMATION SPEED:
   - Increase --page-scroll in CSS for slower flips
   - Change the 0.25 multiplier below for timing
============================================ */
const { gsap, ScrollTrigger } = window;

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   RESPONSIVE SCROLL MULTIPLIER
   - Adjusts scroll speed based on screen size
   - Smaller screens = faster page flips
============================================ */
function getScrollMultiplier() {
  const width = window.innerWidth;
  if (width <= 480) return 0.20;
  if (width <= 768) return 0.22;
  if (width <= 1024) return 0.24;
  return 0.25; // Desktop default
}

let scrollMultiplier = getScrollMultiplier();

/* ============================================
   BOOK SCALE ANIMATION
   - Book starts at 80% size and scales to 120%
   - Happens during the first 25% of scroll
   
   To change starting size: Edit scale(0.8) in style.css .book
   To change end size: Edit scale: 1.2 below
============================================ */
gsap.to('.book', {
  scrollTrigger: {
    scrub: 1,        // Smooth scroll-linked animation
    start: () => 0,  // Start at top of page
    end: () => window.innerHeight * scrollMultiplier  // End after scroll
  },
  scale: 1.2  // Final scale (1.2 = 120%)
});

// Fade in logo on last pages
gsap.to('.logo', {
  scrollTrigger: {
    scrub: true,
    start: () => 13.5 * (window.innerHeight * scrollMultiplier),
    end: () => 14 * (window.innerHeight * scrollMultiplier)
  },
  opacity: 1
});

/* ============================================
   PAGE FLIP ANIMATIONS
   
   HOW IT WORKS:
   - Each page rotates on the Y-axis (like a real book)
   - transform-origin is set to the left edge (spine)
   - Z-depth changes to layer pages correctly
   
   HOW TO ADJUST:
   - rotateY: Controls how far pages flip (180 = full flip)
   - z values: Control depth stacking
   - start/end: When in the scroll the flip happens
============================================ */
const pageElements = [...document.querySelectorAll('.book__page')];

pageElements.forEach((page, index) => {
  // Set initial z position (depth) for proper stacking
  gsap.set(page, { z: index === 0 ? 13 : -index * 1 });
  
  // Skip the back cover - it doesn't flip
  if (page.classList.contains('book__cover--back')) return;
  
  // PAGE FLIP ANIMATION
  // Rotates the page around the Y-axis (spine)
  gsap.to(page, {
    rotateY: `-=${180 - index / 2}`,  // Rotation amount
    scrollTrigger: {
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * scrollMultiplier),  // When flip starts
      end: () => (index + 2) * (window.innerHeight * scrollMultiplier)     // When flip ends
    }
  });

  // Z-DEPTH ANIMATION
  // Moves page forward/backward for proper layering
  gsap.to(page, {
    z: index === 0 ? -13 : index,
    scrollTrigger: {
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * scrollMultiplier),
      end: () => (index + 1.5) * (window.innerHeight * scrollMultiplier)
    }
  });
});

/* ============================================
   WINDOW RESIZE HANDLER
   - Refreshes ScrollTrigger on resize for responsiveness
   - Debounced to prevent performance issues
============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scrollMultiplier = getScrollMultiplier();
    ScrollTrigger.refresh();
  }, 250);
});

/* ============================================
   QUICK REFERENCE - COMMON CUSTOMIZATIONS:
   
   1. CHANGE BOOK COLORS: Edit :root variables in style.css
   2. ADD MORE PAGES: Increase PAGES constant above
   3. USE YOUR OWN IMAGES: Change img.src URLs above
   4. ADD TEXT TO PAGES: Use innerHTML or createElement
   5. CHANGE ANIMATION SPEED: Modify --page-scroll in CSS
   6. EDIT COVER: Modify the HTML in index.html
============================================ */

/* Progress Bar */
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  // Adjust end point to match last page flip (before back cover)
  const totalPages = PAGES + 1; // All pages except back cover
  const endPoint = totalPages * (window.innerHeight * scrollMultiplier);
  const scrollPercent = Math.min((scrollTop / endPoint) * 100, 100);
  
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

/* ============================================
   MODAL / LIGHTBOX FUNCTION
   Simple modal popup similar to CodePen pattern
============================================ */
function openModal(imgSrc) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Create modal content container
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  // Create image
  const img = document.createElement('img');
  img.src = imgSrc;
  img.className = 'modal-img';
  
  // Append elements
  modalContent.appendChild(img);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Show modal with slight delay for animation
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  
  // Close when clicking anywhere except the image itself
  modal.addEventListener('click', (e) => {
    if (e.target !== img) {
      closeModal(modal);
    }
  });
  
  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => modal.remove(), 300);
}

})
</script>


<style>
/* ============================================
   RESET STYLES
   - Removes default browser spacing
============================================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ============================================
   COLOR & THEME VARIABLES
   
   HOW TO CHANGE COLORS:
   - Change these values to customize the book appearance
   
   --page-count: Number of total page sides (20 = 10 pages)
   --page-scroll: How much scroll per page flip (higher = slower)
   --underline: Color of lined paper effect (rgba for transparency)
   --spine: Book spine color (the binding)
   --cover: Front and back cover color
   --bg: Background color of the entire page
   --insert: Inside cover color (the lighter area)
   --page: Interior page color (paper color)
   
   COLOR EXAMPLES:
   - Red cover: --cover: #8B0000;
   - Blue spine: --spine: #1a237e;
   - Cream pages: --page: #FFFDD0;
   - Dark background: --bg: #1a1a1a;
============================================ */
:root {
  --page-count: 30;
  --page-scroll: 25;
  --underline: rgba(64, 64, 64, 0.4);
  --spine: #000;           /* Book spine - change for different binding color */
  --cover: #1a1a1a;        /* Cover color - dark gray by default */
  --bg: #464545;           /* Page background - medium gray */
  --insert: #d9d9d9;       /* Inside cover - light gray */
  --page: #e6e6e6;         /* Paper color - off-white */
}

body {
  width: 100vw;
  height: calc(((var(--page-count) + 2) * var(--page-scroll)) * 1vh);
  background: var(--bg);
  overflow-x: hidden;
}

h1 {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  margin: 0;
  font-size: 2rem;
  color: #808080;
  font-weight: bold;
  pointer-events: none;
  z-index: 1000;
}

/* Resources Link */
.resources-link {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  font-family: 'Handlee', cursive;
  font-size: 1.1rem;
  border-radius: 25px;
  z-index: 10000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.resources-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Progress Bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: linear-gradient(90deg, #13e796, #02f7ff);
  z-index: 9999;
}

/* Book Container */
.book {
  height: 70vmin;
  width: 50vmin;
  min-width: 300px;
  min-height: 400px;
  max-width: 600px;
  max-height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  transform-style: preserve-3d;
  perspective: 1200px;
}

/* ============================================
   BOOK SPINE
   - The binding on the left side of the book
   
   HOW TO CUSTOMIZE:
   - width: Change spine thickness (default: 12px)
   - background: Uses --spine color from :root
   - Add gradient: background: linear-gradient(to right, #333, #000);
============================================ */
.book__spine {
  height: 100%;
  width: 10px;             /* Spine thickness */
  position: absolute;
  left: 0;
  top: 0;
  background: var(--spine); /* Change in :root or directly here */
  transform-origin: 0 50%;
  transform: translate3d(0, 0, -13px) scaleX(1) rotateY(0deg);
}

/* Book Insert (inside covers) */
.book__insert {
  content: '';
  position: absolute;
  height: 94%;
  width: 90%;
  background: var(--insert);
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  border-radius: 5% 0 0 5%;
}

/* Core Page Styling */
.page {
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
}

.page__number {
  position: absolute;
  color: #808080;
  bottom: 1rem;
  font-size: 20px;
  font-weight: bold;
  pointer-events: none;
}

.page__half--front .page__number {
  right: 1rem;
}

.page__half--back .page__number {
  left: 1rem;
}

.page__half {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: rotateY(calc(var(--rotation, 0) * 1deg)) translate3d(0, 0, calc((0.5 * var(--coefficient, 0)) * 1px));
  -webkit-clip-path: inset(0 0.5% 0 0.5%);
  clip-path: inset(0 0.5% 0 0.5%);
  pointer-events: auto;
}

.page__half--front {
  --rotation: 0;
  --coefficient: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 0 5% 5% 0;
  z-index: 2;
}

.page__half--back {
  --rotation: 180;
  --coefficient: 2;
  border-radius: 5% 0 0 5%;
  z-index: 1;
}

/* Book Pages */
.book__page {
  position: absolute;
  left: 2%;
  top: 50%;
  height: 94%;
  width: 85%;
  transform: translate(0, -50%);
  transform-origin: 0% 50%;
  border-radius: 0 5% 5% 0;
  z-index: calc(((var(--page-count) + 2) - var(--page-index)) * 2);
  transform-style: preserve-3d;
}

/* Book Cover */
.book__cover {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  background: var(--cover);
  border-radius: 0 5% 5% 0;
}

.book__cover--front {
  transform-origin: 0 50%;
}

.book__cover--front .page__half--back {
  border-right: 1rem solid var(--spine);
}

.book__cover--back {
  transform-origin: 0% 50%;
}

.book__cover--back .page__half--front {
  background: var(--cover);
  clip-path: none;
  border-radius: 0 5% 5% 0;
}

.book__cover--back .page__half--back {
  background: var(--cover);
  clip-path: none;
  border-radius: 5% 0 0 5%;
  width: 100%;
  left: 0;
}

.book__cover--back .book__insert {
  left: 0;
  right: auto;
  border-radius: 0 5% 5% 0;
}

/* ============================================
   PAGE CONTENT - LINED PAPER EFFECT
   - Creates horizontal lines like notebook paper
   
   HOW TO CUSTOMIZE:
   - Remove lines: Delete the repeating-linear-gradient, keep just var(--page)
   - Change line spacing: Modify the "1rem" values
   - Change line color: Modify --underline in :root
   - Plain white pages: background: white;
   - Add an image: background: url('your-image.jpg') center/cover;
============================================ */
.book__page:not(.book__cover) .page__half {
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0 1rem,              /* Space between lines */
      var(--underline) 1rem calc(1rem + 1px),  /* Line itself */
      transparent calc(1rem + 1px)
    ) 0 1rem / 100% 100% no-repeat,
    var(--page);  /* Base page color */
}

/* Sticker */
.sticker {
  height: 15%;
  position: absolute;
  bottom: 5%;
  right: 5%;
  transform: rotate(-25deg);
}

/* ============================================
   CODE/TEXT BLOCK STYLING
   - Use <pre class="code">Your text</pre> in HTML
   - Perfect for displaying code or styled text
   
   HOW TO ADD TEXT TO PAGES:
   1. Simple text: <p>Your paragraph here</p>
   2. Styled code: <pre class="code">Your text</pre>
   3. Heading: <h2>Title</h2>
   4. With custom style: <p style="color: red; font-size: 20px;">Red text</p>
============================================ */
.code {
  line-height: 1.2;
  font-family: monospace;    /* Code-style font */
  white-space: pre-line;     /* Preserves line breaks */
  max-width: 100%;
  max-height: 100%;
  font-weight: bold;
  color: #0f0f0f;            /* Text color */
  text-shadow: 2px 2px 0 #1c1c1c;
  border-radius: 5%;
  display: block;
  overflow: hidden;
}

/* Logo */
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  height: 25%;
}

/* Links and Images */
a {
  height: 100%;
  width: 100%;
  position: relative;
  display: block;
}

img {
  width: 90%;
  height: 90%;
  -o-object-fit: center;
  object-fit: cover;
  object-position: center;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title{
  width: auto;
  height: auto;
  top: 25%;
}
.title2{
  width: 100%;
  height: auto;
  top: 20%;
  left: 45%;
}
.title3{
  width: 100%;
  height: auto;
  top: 20%;
  left: 50%;
}
.sun{
  width: 40%;
  height:30%;
  top: 55%;
  left: 80%;
}

.spr{
  width: 30%;
  height: auto;
  top: 45%;
  left: 20%;
}

.clove{
  width: 40%;
  height: auto;
  top: 72%;
  left: 94.5%;
  rotate: -40deg;
}

.fci{  
  width: 70%;
  height: 60%;
  top: 75%;
}

.van{
  width: 40%;
  height: auto;
  top: 85%;
  left: 23%;
  rotate: -20deg;
}

.plane{
  width: 30%;
  height: auto;
  top: 65%;
  left: 20%;
}

.dp{
  position: fixed;
  width: 40%;
  height: auto;
  left: 81%;
  top: 15%;

}

.cam{
  position: fixed;
  width: 14%;
  height: auto;
  left: 67%;
  top: 25%;
}


/* ========== PAGE TEXT STYLES ========== */
.page-text {
  position: absolute;
  bottom: 70%;
  left: 33%;
  transform: translateX(-50%);
  text-align: center;
  width: 73%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  color: #1a1a1a;
  margin: 40% 0 0 0;
  font-family: 'Handlee', cursive;
}

.page-subtitle {
  font-size: 23px;
  font-weight: 600;
  color: #000000;
  margin: 0 0 0 0;
  font-family: 'Handlee', cursive;
}

.page-description {
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  line-height: 1.6;
  font-family: 'Handlee', cursive;
}
/* ========== END PAGE TEXT STYLES ========== */
.bulb{
  width: 180%;
  height: auto;
  left: -95%;
  top: 33%;
  rotate: 18deg;
}

.GTKM-container {
  position: absolute;
  bottom: 63%;
  left: 45%;
  transform: translateX(-50%);
  text-align: center;
  width: 73%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.GTKM{
 font-size: 35px;
  font-weight: bold;
  color: #000000;
  margin: 0 0 0 0;
  font-family: 'Handlee', cursive;
  left: 0%;
}

.about{
  position: absolute;
  bottom: 26%;
  left: 45%;
  transform: translateX(-50%);
  text-align: left;
  width: 85%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.abt{
  font-size: 1rem;
  font-weight: 400;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.star{
  position: fixed;
  width: 30%;
  height: auto;
  top: 40%;
  left: 89%;
  pointer-events: none;
}

.star2{
  position: fixed;
  width: 20%;
  height: auto;
  top: 45%;
  left: 75%;
  pointer-events: none;
}

.star3{
  position: fixed;
  width: 15%;
  height: auto;
  top: 50%;
  left: 90%;
  pointer-events: none;
}

.description{
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  text-align: justify;
  width: 90%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.desc{
  font-size: 1rem;
  font-weight: 400;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.terdpage{
 position: absolute;
  bottom: 58%;
  left: 45%;
  transform: translateX(-50%);
  text-align: justify;
  width: 80%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.terd{
  font-size: 1rem;
  font-weight: 400;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.motto{
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  margin: 0;
  line-height: 1.6;
  font-family: 'Handlee', cursive;
}

.clove2{
  position: fixed;
  width: 30%;
  height: auto;
  top: 73%;
  left: 95%;
  rotate: -40deg;
  pointer-events: none;
}

.hearts{
  position: fixed;
  width: 25%;
  height: auto;
  top: 5%;
  left: 65%;
  rotate: -20deg;
  pointer-events: none;
}

.pers{
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: left;
  width: 90%;
  z-index: 10;
  font-family: 'Handlee', cursive;

}

.name{
  font-size: 1.5rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.subject{
  font-size: 1.5rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.prof{
  font-size: 1.5rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
}

.apc{
  position: fixed;
  width: 25%;
  height: auto;
  top: 82%;
  left: 16%;
}

.vg{
  position: fixed;
  width: 20%;
  height: auto;
  top: 67%;
  left: 80%;
  rotate: 10deg;
}

.music{
  position: fixed;
  width: 25%;
  height: auto;
  top: 80%;
  left: 50%;
}

.books{
  position: fixed;
  width: 20%;
  height: auto;
  top: 90%;
  left: 75%;
  rotate: -10deg;
}

.marvel{
  position: fixed;
  width: 35%;
  height: auto;
  top: 93%;
  left: 45%;
}

/* Gallery Container */
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; 
  align-content: center;
  width: 90%;
  height: 60%;
  position: absolute;
  top: 63%;
  left: 48%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

/* Gallery Images */
.gallery-img {
  position: relative;  
  width: 100%;       
  height: auto;      
  object-fit: contain; 
  display: block;    
  margin: 0 auto;
}

.orgs-container {
  position: absolute;
  bottom: 51%;
  left: 58%;
  transform: translateX(-50%);
  text-align: center;
  width: 90%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.orgs{
  font-size: 1.8rem;
  font-weight: bold;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}

.org-logo{
  position: fixed;
  width: 16%;
  height: auto;
  top: 45%;
  left: 10%;
  pointer-events: none;
}

/* ============================================
   ORGANIZATION LOGO IMAGES
============================================ */
.MSC {
  position: absolute;
  width: 20%;
  height: auto;
  top: 52%;
  left: 13%;
  cursor: pointer;
}

.BAND {
  position: absolute;
  width: 20%;
  height: auto;
  top: 52%;
  left: 28%;
  cursor: pointer;
}

.SOAR {
  position: absolute;
  width: 12%;
  height: auto;
  top: 52%;
  left: 44%;
  cursor: pointer;
}

.GG {
  position: absolute;
  width: 12%;
  height: auto;
  top: 52%;
  left: 60%;
  cursor: pointer;
}

.JISSA {
  position: absolute;
  width: 12%;
  height: auto;
  top: 65%;
  left: 12%;
  cursor: pointer;
}

.JPCS {
  position: absolute;
  width: 12%;
  height: auto;
  top: 65%;
  left: 28%;
  cursor: pointer;
}

.BRIDGE {
  position: absolute;
  width: 12%;
  height: auto;
  top: 65%;
  left: 44%;
  cursor: pointer;
}

.SoCIT {
  position: absolute;
  width: 12%;
  height: auto;
  top: 65%;
  left: 60%;
  cursor: pointer;
}

/* ============================================
   FRIEND PHOTO IMAGES
============================================ */
.img1 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 78%;
  left: 8%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: -5deg;
}

.img2 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 80%;
  left: 30%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: 3deg;
}

.img3 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 78%;
  left: 52%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: -3deg;
}

.img4 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 92%;
  left: 15%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: 4deg;
}

.img5 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 94%;
  left: 38%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: -4deg;
}

.img6 {
  position: absolute;
  width: 22%;
  height: auto;
  top: 92%;
  left: 60%;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  rotate: 2deg;
}

/* ============================================
   FRIENDS PHOTO GRID
============================================ */
.friends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; 
  align-content: center;
  width: 90%;
  height:30%;
  position: absolute;
  top: 88%;
  left: 47%;
  transform: translate(-50%, -50%);
  z-index: 900;
}

.friends-grid-img{
  position: relative;  
  width: 90%;       
  height: auto;      
  object-fit: contain; 
  display: block;   
  margin: 0 auto;
  border: #855a0a solid 2px;
  border-radius: 7px;
}

/* Individual friend image classes */
.friend-img-1,
.friend-img-2,
.friend-img-3,
.friend-img-4,
.friend-img-5,
.friend-img-6 {
  position: relative;
  width: 83%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
  border: #966b48 solid 4px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  transform-origin: center center;
}
/* ============================================
   IMAGE POPUP / LIGHTBOX STYLES (Modal)
============================================ */
.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  cursor: pointer;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.modal-img {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  max-width: 80vw;
  max-height: 80vh;
  width: auto !important;
  height: auto !important;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  transform: scale(0.7) !important;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: default;
}

.modal.active .modal-img {
  transform: scale(1) !important;
  opacity: 1;
}

.skills{
  position: fixed;
  width: 15%;
  height: auto;
  top: 10%;
  left: 12%;
  pointer-events: none;
}
.arsenal{
  position: absolute;
  bottom: 85%;
  left: 58%;
  transform: translateX(-50%);
  text-align: center;
  width: 70%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.arsenal-title{
  font-size: 30px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 40% 0 0 0;
  font-family: 'Handlee', cursive;
}

/* ============================================
   SKILLS LOGO GRID
============================================ */

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px; 
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 80%;
  position: absolute;
  top: 55%;
  left: 48%;
  transform: translate(-50%, -50%);
  z-index: 900; 
}
.Skill-1,
.Skill-2,
.Skill-3,
.Skill-4,
.Skill-5,
.Skill-6,
.Skill-7,
.Skill-8,
.Skill-9,
.Skill-10,
.Skill-11,
.Skill-12,
.Skill-13,
.Skill-14,
.Skill-15 {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  width: 120% !important;
  height: auto !important;
  max-height: 75px;
  object-fit: contain !important;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.Skill-1:hover,
.Skill-2:hover,
.Skill-3:hover,
.Skill-4:hover,
.Skill-5:hover,
.Skill-6:hover,
.Skill-7:hover,
.Skill-8:hover,
.Skill-9:hover,
.Skill-10:hover,
.Skill-11:hover,
.Skill-12:hover,
.Skill-13:hover,
.Skill-14:hover,
.Skill-15:hover {
  transform: scale(1.15) !important;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}
/* ============================================
   END OF Skills LOGO GRID
============================================ */
.pift{
  position: fixed;
  width: 80%;
  height: auto;
  top: 70%;
  left: 50%;
  filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.6));
}
.projs{
  position: absolute;
  bottom: 85%;
  left: 58%;
  transform: translateX(-50%);
  text-align: center;
  width: 70%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}

.projs-title{
  font-size: 30px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 40% 0 0 0;
  font-family: 'Handlee', cursive;
}
.SOAR-proj{
  position: fixed;
  width: 50%;
  height: auto;
  top: 27%;
  left: 30%;
  border: #000000 solid 4px;
  border-radius: 5px;
  cursor: pointer;
}
.Soar-text{
  background-color: white ;
  position: absolute; 
  border: #000000 solid 2px;
  bottom: 57%;
  left: 30%;
  transform: translateX(-50%);
  text-align: center;
  width: 50%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.soar-desc{
  font-size: 12px;
  font-weight: bolder;
  background-color: white;
  color: #000000;
  margin: 0;
  line-height: 1.6;
  font-family: 'Handlee', cursive;
  text-align: center;
}
.Soarshirt{
  position: fixed;
  width: 40%;
  height: auto;
  top: 30%;
  left: 73%;
  cursor: pointer;
  rotate: 15deg;
}

.Band-proj{
  position: fixed;
  width: 50%;
  height: 21%;
  top: 55%;
  left: 72%;
  border: #ffbb00 solid 4px;
  border-radius: 5px;
  cursor: pointer;
}
.Band-text{
  background-color: #000000;
  position: absolute; 
  border: #ffbb00 solid 2px;
  border-radius: 2px;
  bottom: 29%;
  left: 73%;
  transform: translateX(-50%);
  text-align: center;
  width: 50%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.Band-desc{
  font-size: 12px;
  font-weight: bolder;
  background-color:#000000;
  color: #ffbb00;
  margin: 0;
  line-height: 1.6;
  font-family: 'Handlee', cursive;
  text-align: center;
}
.Bandcon{
  position: fixed;
  width: 40%;
  height: auto;
  top: 53%;
  left: 30%;
  cursor: pointer;
  rotate: -15deg;
}

.socit-proj{
  position: fixed;
  width: 50%;
  height: 21%;
  top: 83%;
  left: 30%;
  border: #035caf solid 4px;
  border-radius: 5px;
  cursor: pointer;
}
.socit-text{
  background-color: #bee4f5;
  position: absolute; 
  border: #035caf solid 2px;
  border-radius: 2px;
  bottom: 2%;
  left: 30%;
  transform: translateX(-50%);
  text-align: center;
  width: 52%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.socit-desc{
  font-size: 12px;
  font-weight: bolder;
  background-color:#bee4f5;
  color: #152352;
  margin: 0;
  line-height: 1.6;
  font-family: 'Handlee', cursive;
  text-align: center;
}
.socitmerchs{
  position: fixed;
  width: 40%;
  height: auto;
  top: 90%;
  left: 70%;
  cursor: pointer;
  rotate: 15deg;
}
.funfacts-container {
  position: absolute;
  bottom: 83%;
  left: 57%;
  transform: translateX(-50%);
  text-align: center;
  width: 80%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.funfacts-title {
  font-size: 2.3rem;
  text-decoration: underline;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-family: 'Handlee', cursive;
}
.kalbo{
  position: fixed;
  width:18%;
  height: auto;
  top: 10%;
  left: 13%;
}
.lean{
  position: fixed;
  width: 50%;
  height: auto;
  left: 26%;
  top: 28%;
  border-radius: 18px;
}
.pres-container {
  position: absolute;
  bottom: 65%;
  left: 70%;
  transform: translateX(-50%);
  text-align: center;
  width: 65%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  font-weight: bolder;
}
.pres{
  font-size: 1.5rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}
.cat{
  position: fixed;
  width: 50%;
  height: auto;
  top: 80%;
  left: 30%;
  rotate: -15deg;
}
.cat-text-container {
  position: absolute;
  bottom: 9%;
  left: 70%;
  transform: translateX(-50%);
  text-align: center;
  width: 70%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  font-weight: bolder;
}
.cat1{
  font-size: 1.2rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}

.singing{
  position: fixed;
  width: 50%;
  height: auto;
  top: 59%;
  left: 78%;
  rotate: 15deg;
}

.singing2{
  position: fixed;
  width: 100%;
  height: auto;
  top: 40%;
  left: 63%;
  rotate: -27deg;
}
.singing-text-container{
  position: absolute;
  bottom: 35%;
  left: 25%;
  transform: translateX(-50%);
  text-align: center;
  width: 75%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  font-weight: bolder;
}
.sing{
  font-size: 1.5rem;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}
.sponty{
  position: absolute;
  bottom: 68%;
  left: 50%;
  transform: translateX(-50%);
  text-align: justify;
  width: 100%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  font-weight: bolder;
}
.sponty-title{
  font-size: 21px;
  text-align: justify;
  font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}
.sponty-pic{
  position: fixed;
  border-radius: 10px;
  width: 45%;
  height: auto;
  top: 45%;
  left: 26%;
}
.sponty-pic2{
  position: fixed;
  border-radius: 10px;
  width: 47%;
  height: 22%;
  top: 45%;
  left: 74%;
}
.sponty-pic3{
  position: fixed;
  border-radius: 10px;
  width: 80%;
  height: auto;
  top: 74%;
  left: 50%;
}
.like{
  position: fixed;
  width:10%;
  height: auto;
  top: 9%;
  left: 15%;
}
.like-container {
  position: absolute;
  bottom: 86%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  font-weight: bolder;
}
.likes{
    font-size:28px;
    font-weight: bolder;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}
.cheese{
  position: fixed;
  width: 35%;
  height: auto;
  top: 25%;
  left: 70%;
  
}
.bed{
  position: fixed;
  width: 45%;
  height: auto;
  top: 79%;
  left: 37%;
  rotate: -15deg;
}
/*============================================
   PERFORMATIVE MALE ITEMS IMAGES
============================================*/
.matcha{
  position: fixed;
  width: 55%;
  height: auto;
  top: 88%;
  left: 65%;
  rotate: 20deg;
}
.clairo{  
  position: fixed;
  width: 35%;
  height: auto;
  top: 26%;
  left: 25%;
}
.qzip{
  position: fixed;
  width:50%;
  height: auto;
  top: 52%;
  left: 78%;
}
.totebag{
  position: fixed;
  width: 90%;
  height: auto;
  top: 35%;
  left: 22%;
  rotate: 10deg;
}
.flowers2{
  position: fixed;
  width: 50%;
  height: auto;
  top: 38%;
  left: 38%;
  rotate: -40deg;
}
.ephones{
  position: fixed;
  width: 55%;
  height: auto;
  top: 80%;
  left: 30%;
}
.feminism{
  position: fixed;
  width: 40%;
  height: auto;
  top: 60%;
  left: 68%;
  rotate: 10deg;
}
/*============================================
   PERFORMATIVE MALE ITEMS IMAGES
============================================*/
.tear1{
  position: fixed;
  width: 70%;
  height: auto;
  top: 14%;
  left: 73%;
  pointer-events: none;
}
.tear2{
  position: fixed;
  width: 50%;
  height: auto;
  top: 87%;
  left: 21%;
  pointer-events: none;
  border-radius: 0 0 0 43%;
}

/* ============================================
   RESOURCES PAGE STYLES
============================================ */
.resources-container {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 85%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  overflow: hidden;
}

.resources-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
}

.resources-content {
  text-align: left;
  padding: 0 10px;
}

.resources-section {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 12px 0 5px 0;
  line-height: 1.4;
}

.resources-item {
  font-size: 0.85rem;
  color: #444;
  margin: 3px 0;
  line-height: 1.3;
  padding-left: 5px;
}
.happiness{
  position: absolute;
  text-align: center;
  font-weight: bolder;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 85%;
  z-index: 10;
  font-family: 'Handlee', cursive;
  overflow: hidden;
}
.happy{
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  text-align: center;
}
.gf{  
  position: fixed;
  font-weight: bolder;
  width: 40%;
  height: auto;
  top: 7%;
  left:30%;
}
.flowers3{
  position: fixed;
  width: 100%;
  height: auto;
  top: 75%;
  left: 100%;
  rotate: -30deg;
}
.flowers3p2{
  position: fixed;
  width: 100%;
  height: auto;
  top: 75%;
  left: 20%;
  rotate: -30deg;
}
.spark4{
  position: fixed;
  width: 30%;
  height: auto;
  top: 25%;
  left: 25%;
  pointer-events: none;
}
.flowers4{
  position: fixed;
  width: 40%;
  height: auto;
  top:  83%;
  left: 35%;
  rotate: -20deg;
}
.tear3{
  position: fixed;
  width: 90%;
  height: auto;
  top: 50%;
  left: 80%;  
  pointer-events: none;
}
.tear3p2{
  position: fixed;
  rotate: 20deg;
  width: 120%;
  height: auto;
  top: 55%;
  left: 2%;  
  pointer-events: none;
 
}
.tear1p2{
  position: fixed;
  width: 160%;
  height: auto;
  top: 14%;
  left: 73%;
  pointer-events: none;
  border-radius: 62% 0 0 0;
}
/*=============================================
    GWEN IMAGES
=============================================*/
.gwen1{
  position: fixed;
  width: 139%;
  height: auto;
  top: 55%;
  left: 50%;
  pointer-events: none;
  filter: drop-shadow(2px 4px 6px rgba(20, 164, 247, 0.5));
}
/*=============================================
    GWEN IMAGES
=============================================*/

@media screen and (max-width: 400px) {
  .resources-link {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}

/* ============================================
   DECORATIONS (Pages 6-9)
============================================ */
.spark-p8 {
  position: fixed;
  width: 18%;
  height: auto;
  top: 10%;
  left: 18%;
  pointer-events: none;
}
.star-p8 {
  position: fixed;
  width: 12%;
  height: auto;
  top: 45%;
  left: 82%;
  pointer-events: none;
}
.spark-p9 {
  position: fixed;
  width: 15%;
  height: auto;
  top: 15%;
  left: 80%;
  pointer-events: none;
}
.cherry-p9 {
  position: fixed;
  width: 18%;
  height: auto;
  top: 75%;
  left: 78%;
  rotate: 15deg;
  pointer-events: none;
}

.star-p6 {
  position: fixed;
  width: 15%;
  height: auto;
  top: 20%;
  left: 68%;
  pointer-events: none;
}
.spark-p6 {
  position: fixed;
  width: 14%;
  height: auto;
  top: 74%;
  left: 37%;
  pointer-events: none;
}
.heart-p7 {
  position: fixed;
  width: 12%;
  height: auto;
  top: 87%;
  left: 78%;
  pointer-events: none;
}
.spark-p7 {
  position: fixed;
  width: 15%;
  height: auto;
  top: 38%;
  left: 85%;
  pointer-events: none;
}

/* ============================================
   ADDITIONAL DECORATIVE ELEMENTS (Pages 11-15)
============================================ */
.cherry-deco {
  position: fixed;
  width: 25%;
  height: auto;
  top: 15%;
  left: 75%;
  rotate: 15deg;
  pointer-events: none;
}
.crown-deco {
  position: fixed;
  width: 20%;
  height: auto;
  top: 8%;
  left: 68%;
  rotate: -10deg;
  pointer-events: none;
}
.heart1-deco {
  position: fixed;
  width: 15%;
  height: auto;
  top: 20%;
  left: 85%;
  pointer-events: none;
}
.lightning-deco {
  position: fixed;
  width: 18%;
  height: auto;
  top: 35%;
  left: 78%;
  rotate: 15deg;
  pointer-events: none;
}
.spark1-deco {
  position: fixed;
  width: 20%;
  height: auto;
  top: 12%;
  left: 18%;
  pointer-events: none;
}
.spark2-deco {
  position: fixed;
  width: 25%;
  height: auto;
  top: 70%;
  left: 85%;
  pointer-events: none;
}
.spark3-deco {
  position: fixed;
  width: 22%;
  height: auto;
  top: 60%;
  left: 20%;
  pointer-events: none;
}
.spark5-deco {
  position: fixed;
  width: 18%;
  height: auto;
  top: 45%;
  left: 90%;
  pointer-events: none;
}
.curly-deco {
  position: fixed;
  width: 30%;
  height: auto;
  top: 85%;
  left: 75%;
  rotate: -20deg;
  pointer-events: none;
}
.curlyarrow-deco {
  position: fixed;
  width: 25%;
  height: auto;
  top: 30%;
  left: 15%;
  rotate: 10deg;
  pointer-events: none;
}
.arrow-deco {
  position: fixed;
  width: 20%;
  height: auto;
  top: 75%;
  left: 18%;
  rotate: -30deg;
  pointer-events: none;
}
.arrow2-deco {
  position: fixed;
  width: 22%;
  height: auto;
  top: 65%;
  left: 80%;
  rotate: 25deg;
  pointer-events: none;
}
.flowers1-deco {
  position: fixed;
  width: 35%;
  height: auto;
  top: 80%;
  left: 60%;
  rotate: -15deg;
  pointer-events: none;
}
.flowers5-deco {
  position: fixed;
  width: 40%;
  height: auto;
  top: 70%;
  left: 25%;
  rotate: 10deg;
  pointer-events: none;
}
.tape-deco {
  position: fixed;
  width: 15%;
  height: auto;
  top: 5%;
  left: 45%;
  rotate: 45deg;
  pointer-events: none;
}
.trophy-deco {
  position: fixed;
  width: 18%;
  height: auto;
  top: 15%;
  left: 80%;
  rotate: -5deg;
  pointer-events: none;
}
.music2-deco {
  position: fixed;
  width: 20%;
  height: auto;
  top: 55%;
  left: 85%;
  rotate: 10deg;
  pointer-events: none;
}
.coj-deco {
  position: fixed;
  width: 70%;
  height: auto;
  top: 40%;
  left: 5%;
  rotate: 15deg;
  pointer-events: none;
}
/* ============================================
    GWEN PHOTO GRID (PAGE 11)
============================================ */
.photo-grid-11 {
  display: grid;
  /* 2x2 Grid */
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(2, 1fr);
  gap: 12px; 
  
  position: absolute;
  width: 80%;
  height: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.photo-grid-img-11 {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 8px;
  cursor: pointer;
  display: block;
}

/* Spotify playlist for page 12 */
.spotify-gallery-12 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px ;
  width: 85%;
  height: 85%; 
  z-index: 200;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spotify-gallery-12::-webkit-scrollbar {
  width: 5px;
}
.spotify-gallery-12::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.music-container {
  position: absolute;
  top: 5%; 
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  z-index: 10;
}

.musicc {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #111;
  text-decoration: underline;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.couple2{
  position: fixed;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  border-radius: 25px;
}

/* ============================================
    SOCIAL GALLERY (PAGE 6 BACK)
============================================ */
.social-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(4, 100px); 
  gap: 50px; 
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  width: 80%;
  z-index: 500;
    
  align-items: center;
  justify-items: center;
}

.social-gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  text-decoration: none;
}

.social-gallery-item:hover {
  transform: scale(1.2);
}

.social-gallery-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.25));
}
.connect-container {
  position: absolute;
  bottom: 85%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 80%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.connect{
  font-size: 2rem;
  text-decoration: underline;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-family: 'Handlee', cursive;
}

.thankyou-container {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 80%;
  z-index: 10;
  font-family: 'Handlee', cursive;
}
.to-be-continued-container {
  font-size: 2rem;
  font-weight: bold;
    color: #000000;
    margin: 0;
    line-height: 1.6;
    font-family: 'Handlee', cursive;
    text-align: center;
}
</style>