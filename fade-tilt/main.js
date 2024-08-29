class Parallax {
  constructor(obj) {
    this.clouds = document.querySelectorAll(obj.clouds);
    this.boat = document.querySelector(obj.boat);
    this.bg = document.querySelector(obj.bg);
    window.addEventListener("scroll", () => this.moveElements());
  }
  moveElements() {
    this.clouds.forEach((cloud) => {
      let speed = this.getSpeed(cloud);
      cloud.style.transform = this.translate(speed);
    });
    this.boat.style.transform = this.translate(0.9);
    this.bg.style.objectPosition = `0 ${window.scrollY / 10}%`;
  }
  translate(speed) {
    return `translateX(${window.scrollY * speed}px)`;
  }
  getSpeed(el) {
    if (el.hasAttribute("data-speed")) {
      return +el.getAttribute("data-speed");
    } else {
      return 0.4;
    }
  }
}

const parallax = new Parallax({
  bg: ".header__fantasy",
  clouds: ".header__cloud",
  boat: ".header__boat",
});

class Text {
  constructor(obj) {
    this.el = document.querySelector(obj.el);
    this.fulltext = this.el.innerHTML;
    this.el.innerHTML = "";
    this.str();
  }

  str(x = 0) {
    this.el.innerHTML += this.fulltext[x];
    x++;
    if (x <= this.fulltext.length) {
      setTimeout(() => {
        this.str(x);
      }, 200);
    } else {
      this.el.innerHTML = "";
      x = 0;
      setTimeout(() => {
        this.str(x);
      }, 200);
    }
  }
}

const text = new Text({
  el: ".header__title",
});

class ParallaxMove {
  constructor(obj) {
    this.balloons = document.querySelectorAll(obj.balloons);
    window.addEventListener("mousemove", (e) => this.move(e));
  }
  move(e) {
    this.balloons.forEach((ball) => {
      const speed = ball.getAttribute("data-speed");
      const x = (window.innerWidth - e.pageX * speed) / 50;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      ball.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

const parallaxMove = new ParallaxMove({
  balloons: ".parallax__ball",
});

class Timer {
  constructor(obj) {
    this.timerNums = document.querySelectorAll(obj.timerNums);
    this.timerSection = document.querySelector(obj.timerSection);
    this.state = true;
    window.addEventListener("scroll", () => this.scrollTimer());
  }
  scrollTimer() {
    if (this.state) {
      if (
        window.scrollY >=
        this.timerSection.offsetTop - this.timerSection.offsetHeight * 2
      ) {
        this.state = false;
        this.timerSet();
      }
    }
  }
  timerSet() {
    this.timerNums.forEach((num) => {
      const count = num.getAttribute("data-num");
      num.innerHTML = 0;
      function timer(k = 0) {
        num.innerHTML = k;
        k++;
        if (k <= count) {
          setTimeout(() => {
            timer(k);
          }, 5);
        }
      }
      timer();
    });
  }
}

const timer = new Timer({
  timerNums: ".timer__num",
  timerSection: ".timer",
});

class Bubble {
  constructor(obj) {
    this.bubbles = document.querySelectorAll(obj.bubbles);
    this.bubbles.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        this.BubbleShow(e, item);
      });
    });
  }
  BubbleShow(e, item) {
    const x = e.pageX - item.offsetLeft;
    const y = e.pageY - item.offsetTop;

    let span = item.querySelector("span");
    span.style.left = x + "px";
    span.style.top = y + "px";
  }
}

const bubble = new Bubble({
  bubbles: ".timer__btn",
});

class Fade {
  constructor(obj) {
    this.section = document.querySelector(obj.section)
    this.cards = document.querySelectorAll(obj.cards)

    window.addEventListener('scroll', () => this.moveElements())
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.tilt(e, card))
    })
  }

  moveElements() {
    if (window.scrollY >= this.section.offsetTop - this.section.offsetHeight * 2) {
      this.cards.forEach(card => {
        const speed = card.hasAttribute('data-speed') 
          ? +card.getAttribute('data-speed')
          : 400

        card.style.transition = this.getSpeed(speed)
        card.classList.add('active')
      })
    }
  }

  getSpeed(speed) {
    return `${speed / 1000}s`
  }

  tilt(e, card) {
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;
    const offsetX = e.offsetX - centerX;
    const offsetY = e.offsetY - centerY;
    const maxTiltAngle = 25
    const rotateX = (offsetY / centerY) * maxTiltAngle;
    const rotateY = (offsetX / centerX) * maxTiltAngle;
    card.style.transition = '0.2s'
    card.style.transform = `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;

    card.addEventListener("mouseout", () => {
      card.style.transform = "none";
    });
  }
}

const fadeAbout = new Fade({
  section: ".about",
  cards: ".about__card",
});

const fadeCards = new Fade({
  section: ".cards",
  cards: ".card__item",
});

const fadeScroll = new Fade({
  section: ".scroll",
  cards: ".scroll__card",
});
