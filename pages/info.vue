<template>
    <div class="info">
        <div class="info-content">
            <div class="info-content-text">
            <p>hello, i'm alaina. It's so lovely to meet you.</p>
            <div class="mobile-image">
                <img src="/img/info-mobile.png" caption="Alaina Hunt photographed by Rachel Maucieri" alt="Alaina Hunt photographed by Rachel Maucieri">
                <p>photo: Rachel Maucieri, <a href="https://maucierivisuals.co/" target="_blank">Maucieri Visuals Co.</a></p>
            </div>
            <p>I'm an experience designer developing immersive and engaging experiences that merge art with design.<br><br>My work spans from digital and web design to art direction and installation design—basically anything that catches my interest.<br><br>With 5+ years of both freelance and agency experience, I've shaped projects across retail, hospitality, banking, venture capital, and construction.<br><br>I bring together artistic vision with empathetic design thinking and practical coding skills, always curious about new techniques and approaches.</p>
            <p>I'm currently working as Staff Designer at <a href="https://prgrin.com/" target="_blank">PRGRIN</a>, previously as Experience Designer at <a href="https://cooper-house.com/" target="_blank">Cooper House</a>. I'm also accepting new freelance projects and opportunities for collaboration.</p>
            <div class="bio-cta">
                <p>sound interesting?</p>
                    <a href="mailto:hello@alainahunt.com" class="cta-link">we should work together.</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mobile-image {
    display: none;
}
.info {
    max-width: 100vw;
    height: 70vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background-image: url('/img/ah-01.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 .33rem;
    overflow-x: hidden;
    position: relative;
    width: calc(100% - .66rem);
    border-radius: .33rem;
}

.info-content {
    width: 25%;
    padding: 4rem;
    margin-right: 3rem;
    
}

.alaina-hunt {
    width: 75%;
    height: 100%;
    object-fit: cover;
}

.info p {
    font-size: .67rem;
    text-transform: uppercase;
    text-align: justify;
    color: #ffffff;
    line-height: 1.33;
}

.info p:first-child {
    width: 100%;
    text-align: center;
}
.info p a {
    color: #ffffff;
    text-decoration: underline;
    font-weight: 500;
}
.bio-cta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: .67rem;
    text-transform: uppercase;
    max-width: 30vw;
}
.info .bio-cta p {
    text-align: left;
}
.cta-link {
    color: #ffffff;
    text-decoration: none;
    position: relative;
    font-weight: 600;
    text-align: right;
    width: 100%;
}

.cta-link::after {
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

.cta-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

@media (max-width: 768px) {
    .mobile-image {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
        position: relative;
        padding: 1rem 0
    }  
    .mobile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .mobile-image p {
        font-size: .5rem;
        text-transform: uppercase;
        color: #000000;
        text-align: center;
        letter-spacing: .02rem;
        padding: .5rem 0;
    }   
    .mobile-image p a {
        color: #000000;
        text-decoration: underline;
        font-weight: 500;
        z-index: 1;
    }

    

    .info {
        background-image: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
    }
    .info-content {
        width: 100%;
        display: flex;
        padding:0;
        margin: 0;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .info-content-text {
        max-width: 100%;
        padding: 3.5rem;
    } 
    .info-content-text p {
        color: #000000;
        line-height: 1.5;
    }   
    .info-content-text p a {
        color: #000000;
        text-decoration: underline;
        font-weight: 500;
    }
    .info-content-text p a:hover {
        color: #000000;
        text-decoration: underline;
        font-weight: 500;
    }   
    .bio-cta {
        max-width: 100%;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
    }
    .cta-link {
        color: #000000;
    }
}

</style>