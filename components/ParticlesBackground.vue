<template>
  <div class="my-cont ma-0 pa-0">
    <div id="img-back" class="abs">
      <div :id="id" class="particles-js ma-0 pa-0"></div>
      <v-col justify="center end" class="text-center" align-self="center">
        <v-img contain src="icon_white.png" height="200px" />
        <h1>read my star</h1>
        <h3>write my story</h3>
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
.v-parallax__content {
  padding: 0px !important;
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
  width: 100%;
  height: 500px;
  color: white;
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
/* eslint-disable */
export default {
  props: {
  },
  data () {
    return {
      id: 'particles-instance-' + Math.floor(Math.random() * 5000)
    }
  },
  mounted () {
    require('particles.js')
    this.$nextTick(() => {
      this.initParticleJS()
    })
  },
  methods: {
    initParticleJS () {
        particlesJS(this.id, {
          "particles": {
            "number": {
              "value": 160,
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
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "https://readmystar.com/icon_white.png",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.9,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 8.0,
                "opacity_min": 0.3,
                "sync": false
              }
            },
            "size": {
              "value": 3,
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
              "distance": 70,
              "color": "#ffffff",
              "opacity": 0.7,
              "width": 1.5
            },
            "move": {
              "enable": true,
              "speed": 0.9,
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
              "onhover": {
                "enable": true,
                "mode": "bubble"
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
                "size": 3.5,
                "duration": 2,
                "opacity": 0.8,
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
          "retina_detect": true
        })
    }
  }
}
</script>