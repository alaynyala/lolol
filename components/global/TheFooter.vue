<template>
      <footer class="main-footer">
        <div class="footer-row-1">
            <div class="contact">contact</div>
            <div class="row-2">
                <div class="email">
                    <div class="email-label">EMAIL</div>
                    <div class="inquiry">
                        <div class="inquiry-label">Inquiry</div>
                        <div class="inquiry-email">hello@alainahunt.com</div>
                    </div>
                </div>
                <div class="socials">
                    <div class="socials-label">SOCIALS</div>
                    <div class="social-item">
                        <div class="social-name">Instagram</div>
                        <div class="social-handle">@__alainahunt</div>
                    </div>
                </div>
                <div class="linkedin">
                    <div class="spacer"></div>
                    <div class="social-item">
                        <div class="social-name">LinkedIn</div>
                        <div class="social-handle">/__alainahunt</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-credits">
            <div class="credits-col-1">
                <div class="design">
                    <div>site design & development</div>
                    <div>by alaina hunt</div>
                </div>
                <div class="copyright">
                    <div>all rights reserved</div>
                    <div>©2025 alaina hunt</div>
                </div>
            </div>
            <img src="/img/logo.svg" alt="Alaina Hunt" class="signature-img" />
        </div>
    </footer>
  </template>
  
  <style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 4rem 2rem;
  border-top: 1px solid #eaeaea;
  font-family: sans-serif;
  width: 96%;
  overflow-x: hidden;
}



.footer-row-1 {
  width: 504px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 27px;
  padding-bottom: 2rem;
}

.contact {
  align-self: stretch;
  color: black;
  font-size: 16px;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 400;
  line-height: 20px;
  padding-top: 2rem;
}

.row-2 {
  align-self: stretch;
  display: flex;
  flex-direction: column;
}

.email, .socials {
  align-self: stretch;
  border-top: 1px black solid;
  display: flex;
  align-items: center;
  gap: 10px;
}

.email-label, .socials-label {
  width: 201px;
  color: black;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 500;
  display: flex;
  align-items: center;
}

.inquiry, .social-item {
  width: 293px;
  padding: 6px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.inquiry-label, .social-name {
  width: 142px;
  color: black;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 500;
}

.social-handle {
  flex: 1;
  text-align: right;
  color: black;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 400;
}
.inquiry-email {
  flex: 1;
  text-align: right;
  color: black;
  font-size: 12px;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 400;
}

.socials {
  border-bottom: 1px black solid;
}

.linkedin {
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 10px;
}

.spacer {
  width: 201px;
  height: 16px;
}

.footer-credits {
  align-self: stretch;
  padding: 24px 0;
  border-top: 1px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-basis: 100%;
  font-size: .75rem;
}

.credits-col-1 {
  width: 476px;
  height: 31px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.design {
  height: 31px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3.03px;
}

.copyright {
  height: 31px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 3.03px;
}  


.design div, .copyright div {
  color: black;
  font-family: 'Neue Haas Grotesk Text Pro';
  font-weight: 400;
  letter-spacing: -0.03em;
}


.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #000;
  text-decoration: underline;
}


@media (max-width: 768px) {
  footer {
    margin: 2rem 1rem;
    width: 90%;
    height: 100%;
    padding-bottom: 1rem;
  }
  .footer-row-1 {
    width: 100%;
    padding-bottom: 1rem;
  }
  .inquiry-email {
    margin-left: -2.5rem;
  }

  .footer-credits {
    align-items: center;
    font-size: .75rem;
    padding-bottom: 1rem;
  }

  .credits-col-1 {
    width: 100%;
    align-items: center;
  }
  .design {
    align-items: flex-start;
  }
  .copyright {
    align-items: flex-end;
  }
  .design div {
    text-align: left;
  }
  .copyright div {
    text-align: right;
  }
  .signature-img {
    width: 88%;
    margin: auto;
    padding-top: 3rem;
  }
 div.linkedin > div.social-item > div.social-handle {
    margin-left: 0.3rem;
  }
}


</style> 