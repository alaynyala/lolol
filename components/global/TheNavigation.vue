<template>
    <nav>
      <div class="logo">
        <NuxtLink to="/">
          <img src="/img/logo.svg" alt="Alaina Hunt" class="signature-img" />
        </NuxtLink>
      </div>
      <ul class="nav-links">
        <li><NuxtLink to="/info">info</NuxtLink></li>
        <li><NuxtLink to="/projects">Projects</NuxtLink></li>
        <li><a href="mailto:hello@alainahunt.com">Contact</a></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    font-family: sans-serif;
  }
  
  .logo a {
    font-weight: bold;
    font-size: .75rem;
    color: #000;
    text-decoration: none;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: .75rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-links a {
    position: relative;
    color: #000;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: .75rem;
    letter-spacing: -0.03em;
    text-transform: lowercase;
  }

  .nav-links a::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  }
  
  .nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 768px) {
  nav {
    padding: 1rem 1rem;
    flex-direction: column;
  }
  .logo img{
    width: 100%;
    padding-bottom: 1rem;
  }
  .nav-links {
    width: 100%;
    text-align: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 1.5rem 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .nav-links a {
    width: 100%;
    text-align: center;
  }
}

  </style> 




