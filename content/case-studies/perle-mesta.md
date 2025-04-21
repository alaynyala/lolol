---
slug: "perle-mesta"
category: "case study"
order: 1
color: "#776877"
title: "Perle Mesta"
subtitle: "interactive"
roles: ["UX Research & Strategy", "Content Strategy", "Site Design"]
year: 2024
clients: ["Chef Andrew Black", "Skirvin Hotel"]
collaborators:
  brand_design: ["Erin Cooper", "David Harmon"]
  brand_messaging: ["Hallie Waugh", "Fio Zoll"]
  development: ["Dane Strom"]
  agency: "Cooper House"
contributions:
  research: 
    - "Customer Research"
    - "Trends Analysis"
    - "Competitor Review"
    - "Best Practice Review"
    - "Usability Research"
  strategy:
    - "Target Audience Discovery"
    - "Feature Definition"
    - "Information Architecture"
    - "User Flows"
    - "Content Strategy"
  design:
    - "Wireframes"
    - "Design System Development"
    - "Prototype Design"
    - "Site Design"
  development:
    - "Design Handoff"
    - "Quality Control"
brief: 
    - "As Lead Designer for the Perle Mesta restaurant website, I delivered a conversion-focused digital platform that generated pre-opening reservations and increased private dining inquiries by 30% for Chef Andrew Black's new restaurant in the historic Skirvin Hotel."
    - "I identified a key opportunity to differentiate the site through a time-responsive design that reflects the restaurant's evolving atmosphere throughout the day. By implementing three distinct visual states with synchronized light-leak video backgrounds, I created an immersive digital experience that maintained brand consistency while meeting WCAG accessibility standards."
    - "My technical approach included developing a comprehensive design system with component documentation, building interactive prototypes demonstrating time-based theme transitions, implementing a conversion-optimized navigation structure based on competitor research, and creating detailed WordPress integration specifications for the development team. This multifaceted approach ensured smooth implementation while maintaining the design integrity throughout the development process."
    - "The project showcased my ability to bridge digital and physical design—I extended the brand experience by creating a custom mosaic for the private dining room that complemented the website's aesthetic."
    - "This multifaceted solution not only increased site traffic and streamlined content management for the client but also demonstrated my ability to deliver innovative, results-driven design that solves real business challenges."
featured_video: "/videos/pm-cs-mbp.webm"
landing_video: "/videos/pm-landing.webm"
previous: "/projects/rembaum-hanau"
next: "/case-studies/ccb"
---

<style>
    .content-container {
      /* Container styles can be added here if needed */
    }
    
    .video-container {
      width: 100%;
    }
    
    .video-container video {
      width: 100%;
      object-fit: contain;
      border-radius: 0.33rem;
    }
    
    .image-container-cols {
      width: 100%;
      height: auto;
      display: flex;
      align-content: center;
      justify-content: flex-start;
      gap: 0.33rem;
      padding-bottom: 0.33rem;
    }
    
    .img-left, .img-right {
      display: flex;
      align-items: stretch;
      width: 50%;
    }
    
    .img-left img, .img-right img {
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 0.33rem;
    }
    
    .img-container {
      width: 100%;
    }
    
    .img-container img {
      width: 100%;
      height: auto;
      border-radius: 0.33rem;
    }
    
    .three-image-cols {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      gap: 0.5rem;
      overflow-x: scroll;
      scrollbar-width: thin;
      scrollbar-color: gray black;
      justify-content: space-between;
      background: linear-gradient(345deg, #353535 0%, black 100%);
      border-radius: 0.33rem;
      color: #fff;
      margin-bottom: .33rem;
    }
    
    .image-col {
      max-width: 45%;
      height: auto;
      display: flex;
      flex-direction: column;
      padding: 3rem;
      gap: 1rem;
    }
    
    .desc {
      border-top: solid 1px #fff;
      display: flex; 
      flex-direction: column;
      gap: 0.33rem;
      padding-top: .66rem;
    }
    
    .desc p {
      margin: 0;
    }
    
    .video-container-dark {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem;
      background: linear-gradient(345deg, #353535 0%, black 100%);
      border-radius: 0.33rem;
    }
    
    .video-container-dark video {
      width: 80%;
      height: auto;
      object-fit: contain;
      border-radius: 0.33rem;
    }
    
    .padding-top {
      padding-top: 0.33rem;
    }
    
    .lbc-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(345deg, #353535 0%, black 100%);
      border-radius: 0.33rem;
      color: #fff;
    }
    
    .lbc-content {
      width: 40vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6rem;
    }
    
    .lbc-content p {
      margin: 0;
      padding: 1rem;
      font-size: .75rem;
    }
    
    .lbc-content img {
      width: 100%;
      height: auto;
    }
    
    .lbc-link {
      width: 100%;
      color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
    }
    
    .lbc-link p {
      width: 50%;
      padding: 0;
    }
    
    .link-button {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    
    .link-button a {
      color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      font-size: .75rem;
    }
    
    .link-button img {
      width: 2rem;
      padding-left: 0.5rem;
      opacity: 1;
      transition: all 300ms ease;
    }

    .link-button img:hover {
      width: 3rem;
      opacity: .75;
    }

    @media screen and (max-width: 768px) {
   .content-container {
        padding: 0;
    }
    
    .image-container-cols {
      flex-direction: column;
    }

    .img-left, .img-right {
      width: 100%;
    }

    .img-left img, .img-right img {
      width: 100%;
    }

    .three-image-cols {
        flex-direction: column;
        gap: 0rem;
    }
    .image-col {
        max-width: 100%;
        padding: 2rem;
    }
    .image-col img {
        width: 100%;
        height: auto;
    }
    .desc {
        width: 100%;
        padding-top: .5rem;
    }
    .desc p {
      font-size: .85rem;
    }
    .lbc-content {
      width: 67vw;
      align-items: center;
      justify-content: space-evenly;
    }

    .lbc-link p {
      font-size: .85rem;
      padding: 1rem;
      width: 100%;
    }
    .lbc-content p {
      width: 100%;
      text-align: center;
    }

    .lbc-link {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .link-button a {
      justify-content: center;
      font-size: .85rem;
      width: 100%
    }

    .link-button img {
      width: 1.5rem;
    }
}
  </style>

<div class="content-container">
  <div class="video-container">
    <video src="/videos/PM-VID.webm" autoplay muted loop></video>
  </div>
  <div class="image-container-cols">
    <div class="img-left">
      <img src="/img/pm/pm-up.png"/>
    </div>
    <div class="img-right">
     <img src="/img/pm/pm-sitemap.png"/>
    </div>
  </div>
  <div class="img-container">
    <img src="/img/pm/pm-uf.png" />
  </div>
  <div class="wireframes">
    <div class="">
    </div>
  </div>
  <div class="img-container">
    <img src="/img/pm/pm-apprch.png"/>
  </div>
  <div class="three-image-cols">
    <div class="image-col">
      <img src="/img/pm/pm-mrng.png"/>
      <div class="desc">
        <p><strong>Morning Service</strong></p>
        <p>verdant, warm, inviting</p>
      </div>
    </div>
   <div class="image-col">
      <img src="/img/pm/pm-lunch.png"/>
      <div class="desc">
        <p><strong>Midday Service</strong></p>
        <p>bright, energetic, dynamic</p>
      </div>
   </div>
   <div class="image-col">
      <img src="/img/pm/pm-dnr.png"/>
      <div class="desc">
        <p><strong>Evening Service</strong></p>
        <p>rich, moody, elegant</p>
      </div>
   </div>
  </div>
  <div class="video-container">
    <video src="/videos/pm-ui-video-menus.webm" autoplay muted loop></video>
  </div>
  <div class="video-container">
    <video src="/videos/pm-mobile-mu.webm" autoplay muted loop></video>
  </div>
  <div class="lbc-container">
    <div class="lbc-content">
      <p>site-specific art</p>
      <img src="/img/pm/pm-lbc.png"/>
      <div class="lbc-link">
        <p>les belles choses</p>
        <div class="link-button">
          <a href="/projects/mosaic" >view project<img src="/img/arrow-rt.svg"/></a>
        </div>
      </div>
    </div>
  </div>
</div>

