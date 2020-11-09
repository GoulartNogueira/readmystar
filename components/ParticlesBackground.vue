<template>
  <div class="my-cont ma-0 pa-0">
    <div id="img-back" class="abs text-center">
      <div :id="id" class="particles-js ma-0 pa-0 text-center"></div>
      <v-col
        id="titlespace"
        class="titlespace d-flex flex-column align-content-center"
        align-self="center"
      >
        <v-img contain src="icon_white.png" height="200px" />
        <v-col>
          <h1>read my star</h1>
          <h3>write my story</h3>
        </v-col>
      </v-col>
    </div>
    <!-- <div id="img-front" class="abs" top="1">
      <v-img
        contain
        height="30%"
        src="/images/woman_reading_silhouette hiclipart.com.png"
        class="left-image"
        align-self="end"
      />
      <v-img
        contain
        height="30%"
        src="/images/telescope silhouette-3694248_960_720.png"
        class="left-image"
      />
    </div> -->
  </div>
</template>

<style scoped>
.titlespace {
  max-width: max-content;
  max-height: max-content;
}
.v-parallax__content {
  padding: 100px !important;
}
.abs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
}
.my-cont {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  background: linear-gradient(
    12deg,
    #855988 0%,
    #6b4984 10%,
    #483475 20%,
    #2b2f77 35%,
    #141852 50%,
    #070b34 100%
  );
}
.particles-js {
  position: relative;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
}
.text-center {
  position: absolute;
  top: 0;
  z-index: 1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.left-image {
  position: absolute;
  left: 0;
  z-index: 20;
  align-self: left-end;
}
.right-image {
  position: absolute;
  left: 0;
  z-index: 20;
  align-self: right-end;
}
</style>

<script>
import { tsParticles } from 'tsparticles'
/* eslint-disable */
export default {
  data () {
    return {
      id: 'particles-instance-' + Math.floor(Math.random() * 5000)
    }
  },
  mounted () {
    const tsParticles = require("tsparticles")
    this.$nextTick(() => {
      this.initParticleJS()
    })
  },
  methods: {
    initParticleJS () {
    tsParticles.load(this.id, {
          "particles": {
            "number": {
              "value": 60,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "star",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
            },
            "opacity": {
              "value": 0.8,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 12.0,
                "opacity_min": 0.6,
                "sync": false
              }
            },
            "size": {
              "value": 2,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 0.3,
                "size_min": 1.,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 60,
              "color": "#ffffff",
              "opacity": 0.7,
              "width": 1.5
            },
            "move": {
              "enable": true,
              "speed": 0.5,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 0,
                "rotateY": 0
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
             "onDiv": [
              {
                "enable": true,
                "selectors": ".titlespace",
                "mode": "bounce",
                "type": "rectangle"
              },], 
              "resize": true,
              "onhover": {
                "enable": true,
                "mode": "bubble",
                "parallax":{
                  "enable":true,
                  "force":100,
                  "smooth":6
                }
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 250,
                "size": 6,
                "duration": 2,
                "opacity": 0.9,
                "speed": 3
              },
              "repulse": {
                "distance": 400,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 1
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "pauseOnOutsideViewport":true
        }).then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });
    }
  }
}
</script>