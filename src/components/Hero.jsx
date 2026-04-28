import React, { useEffect, useRef } from "react";
import "./Hero.css";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      gsap.set(contentRef.current.querySelectorAll("h1, p, button"), { opacity: 0, y: 80 });

      tlHero.to(contentRef.current.querySelector("h1"), { y: 0, opacity: 1 })
        .to(contentRef.current.querySelector("p"), { y: 0, opacity: 1 }, "-=0.6")
        .to(contentRef.current.querySelector("button"), { y: 0, opacity: 1 }, "-=0.6");

      const tlText = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
        },
      });

      tlText.from(sectionRef.current.querySelector("h2"), {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(sectionRef.current.querySelector(".coffee-desc"), {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.3");

      const beans = [
        { cls: ".bean1", x: 100, y: 300 },
        { cls: ".bean2", x: -790, y: 850 },
        { cls: ".bean3", x: -300, y: 950 },
        { cls: ".bean4", x: -380, y: 800 },
        { cls: ".bean5", x: -720, y: 580 },
        { cls: ".bean6", x: -1230, y: 530 },
        { cls: ".bean7", x: -80, y: 500 },
        { cls: ".bean8", x: -90, y: 360 },
      ];

      beans.forEach(bean => {
        gsap.to(bean.cls, {
          x: bean.x,
          y: bean.y,
          opacity: 0,
          ease: "power2.inOut",
         scrollTrigger : {
          trigger : '.section1',
          start : "top 80%",
          end: "top 30%",
          scrub: true,
         }
        });
      });

      gsap.fromTo(
        ".paper",
        { x: 0, y: 0, scale: 1 },
        {
          x: -10,
          y: 300,
          scale: 0.7,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".section1",
            start: "top 30%",
            end: "top -20%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".stream",
        { y: -3, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".paper",
            start: "top 10%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      gsap.to(".cup", {
        x: 1400,
        y: 1310,
        scale: 4.1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top -10%",
          end: "bottom 10%",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0) {
              gsap.set(".stream", { opacity: 0 });
            } else {
              gsap.set(".stream", { opacity: 1 });
            }
          },
        },
      });

      
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="hero">
        <Navbar />
        <div className="hero-container">
          <div className="hero-left">
            <img src="/images/bag.png" alt="Coffee Bag" className="main-beans" />
            <img src="/images/bean1.png" alt="Bean 1" className="bean bean1" />
            <img src="/images/bean2.png" alt="Bean 2" className="bean bean2" />
            <img src="/images/bean3.png" alt="Bean 3" className="bean bean3" />
            <img src="/images/bean4.png" alt="Bean 4" className="bean bean4" />
            <img src="/images/bean1.png" alt="Bean 5" className="bean bean5" />
            <img src="/images/bean2.png" alt="Bean 6" className="bean bean6" />
            <img src="/images/bean3.png" alt="Bean 7" className="bean bean7" />
            <img src="/images/bean4.png" alt="Bean 8" className="bean bean8" />
            <img src="/images/bean1.png" alt="Bean 9" className="beans bean9" />
            <img src="/images/bean2.png" alt="Bean 10" className="beans bean10" />
            <img src="/images/bean3.png" alt="Bean 11" className="beans bean11" />
            <img src="/images/bean4.png" alt="Bean 12" className="beans bean12" />
          </div>

       
          <div className="hero-content" ref={contentRef}>
            <h1>ESPRESSO</h1>
            <p>Freshly roasted coffee to start your day right.</p>
            <button className="hero-btn">Shop Now</button>
          </div>
        </div>
      </div>

      <div className="section1" ref={sectionRef}>
        <div className="one">
          <div className="section1-bg"></div>

          <div className="text">
            <h2>The Art of the Brew</h2>
            <p className="coffee-desc">
              From the moment the finest coffee beans tumble gently into the grinder, a beautiful story begins. 
              Each bean carries the essence of its origin, nurtured under the sun and carefully harvested at 
              the peak of ripeness. As the beans make their way into the espresso machine, you can almost feel 
              their transformation — a rich aroma fills the air, earthy and bold. With precision and care, the 
              machine extracts the heart of every bean, compressing its character into a concentrated flow of 
              liquid gold. Slowly, the espresso stream begins to pour, smooth and uninterrupted, releasing a 
              swirl of hot steam that dances in the air. What starts as humble beans becomes an elegant cup of 
              espresso — bold, velvety, and crafted to awaken your senses with every sip.
            </p>
          </div>

          <h1 className="es">ESPRESSO</h1>
          <img src="/images/paper1.png" alt="Paper Texture" className="paper" />
          <img src="/images/machine1.png" alt="" className="machine" />
          <img src="/images/cup.png" alt="" className="cup" />
          <img src="/images/stream.gif" alt="Espresso Stream" className="stream" />
        </div>
        <div className="two">
          <h1>Your Perfect Cup of Espresso Awaits!</h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
