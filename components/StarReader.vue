<template>
  <div id="StarReader" class="main">
    <div id="results">
      <div class="title">
        <h2>Meu Mapa Astral</h2>
      </div>

      <div class="row">
        <div
          v-for="(planet, planet_id) in planets"
          :key="planet_id"
          class="col-sm-6 col-lg-3"
        >
          <div v-if="myChart.planets[planet_id]" class="title">
            <h3>
              {{ planet.name }} {{ planet.symbol }}
              <!-- {{ myChart.planets[planet_id].sign }}
              {{ myChart.planets[planet_id].house }} -->
            </h3>
            <h5>
              <span>
                em {{ signs_list[myChart.planets[planet_id].sign]['name'] }} ({{
                  signs_list[myChart.planets[planet_id].sign]['symbol']
                }})
              </span>
              <span v-if="myChart.planets[planet_id].house">
                na Casa {{ myChart.planets[planet_id].house }}</span
              >
            </h5>
            <!--{{planet.sign}},
                 {{signs_list.signo2.symbol}} -->
            <br />
          </div>
        </div>
      </div>

      <div>
        <div class="title">
          <h2>Personagens</h2>
        </div>
        <div class="row">
          <div
            v-for="(planet, planet_id) in planets"
            :key="planet_id"
            class="col-sm-6 col-lg-3"
          >
            <div v-if="myChart.planets[planet_id]">
              <div>
                <h3>
                  {{ planet.name }} ({{ planet.symbol }}) em
                  {{ signs_list[myChart.planets[planet_id].sign]['name'] }}({{
                    signs_list[myChart.planets[planet_id].sign]['symbol']
                  }}) na Casa {{ myChart.planets[planet_id].house }}
                </h3>
              </div>
              <div>
                <v-select v-model="planet.char.name" :items="planet.chars">
                </v-select>
                <label for="Char planet">{{ planet.symbol }}</label>
                <!--<span v-for="(sign_details,id_sign_details) in signs_list[planet.sign]">{{ id_sign_details }} </span>
                      
                    <span v-for="sign_details in signs_list[planet.sign]">{{ sign_details }} </span> -->
                <!-- <span v-repeat="signs_list[planet.sign]">{{ $tribe }} </span> -->

                <label for="Char_sign">{{ signs_list.id_char }}</label>
                <v-select
                  v-model="planet.char.tribe"
                  :items="signs_tribes[myChart.planets[planet_id].sign]"
                >
                  <!-- <option
                      v-for="(tribb, sign_id) in signs_tribes[planet.sign]"
                      :key="sign_id"
                    > 
                  {{ tribb }}
                  -->
                  <!-- </option> -->
                </v-select>
                {{ signs_list[myChart.planets[planet_id].sign]['symbol'] }}

                <v-select
                  v-if="myChart.planets[planet_id].house"
                  v-model="planet.char.place"
                  :items="houses_info[myChart.planets[planet_id].house - 1]"
                >
                  <!-- <option
                    v-for="place in houses_info[myChart.planets[planet_id].house - 1]"
                    :key="place"
                  >
                    {{ place }}
                  </option> -->
                </v-select>
                <label for="Char_house">(Casa {{ planet.house }})</label>

                <br />
              </div>
              <div>
                {{ planet.char.name }} da tribo dos {{ planet.char.tribe }} está
                {{ planet.char.place }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title">
        <h2>História</h2>
      </div>
      <div class="row">
        <div
          v-for="(myaspect, myaspect_id) in myChart.aspects"
          :key="myaspect_id"
          class="col-sm-6 col-lg-3"
        >
          <div>
            <h2>
              <span v-if="planets[myaspect[0][0]]">{{
                planets[myaspect[0][0]].symbol
              }}</span>
              <span v-else> myaspect[0][0]] </span>
              {{ aspects[myaspect[1]].symbol }}
              <span v-if="planets[myaspect[0][1]]">{{
                planets[myaspect[0][1]].symbol
              }}</span>
              <span v-else> {{ myaspect[0][1] }} </span>
            </h2>
            <h5>
              <span v-if="planets[myaspect[0][0]]">{{
                planets[myaspect[0][0]].name
              }}</span>
              <span v-else>{{ myaspect[0][0] }}</span>
              em {{ aspects[myaspect[1]].translation }} com
              <span v-if="planets[myaspect[0][1]]">{{
                planets[myaspect[0][1]].name
              }}</span>
              <span v-else>{{ myaspect[0][1] }}</span>
            </h5>
            <span v-if="planets[myaspect[0][0]]">{{
              planets[myaspect[0][0]].char.name
            }}</span>
            <span v-else> {{ myaspect[0][0] }} </span>
            <span> e </span>
            <span v-if="planets[myaspect[0][1]]">{{
              planets[myaspect[0][1]].char.name
            }}</span>
            <span v-else> {{ myaspect[0][1] }} </span>
            {{ aspects[myaspect[1]].history[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* const getParams = () => import('./astro.json').then((m) => m.default || m) */
/* import json from './astro.json' */
export default {
  name: 'StarReader',
  props: {
    myChart: {
      type: Object,
      required: false,
      default() {
        return {
          planets: {
            Asc: {
              sign: 'Virgo',
            },
            Sun: {
              sign: 'Capricorn',
              house: 4,
            },
            Moon: {
              sign: 'Scorpio',
              house: 2,
            },
          },
          aspects: [[['Sun', 'Moon'], 'Sextile', 2.2314]],
        }
      },
    },
  },
  data() {
    return {
      signs_tribes: {
        Aries: ['nômades', 'amazonas', '', 'conquistadores', 'pioneiros'],
        Taurus: [
          'fazendeiros',
          'tradicionalistas',
          'pessoas da terra',
          'bancários',
          'amantes do prazer',
        ],
        Gemini: ['escritores', 'curiosos', 'estudantes', 'exibicionistas'],
        Cancer: [
          'ajudantes',
          'sonhadores',
          'românticos',
          'conselheiros espirituais',
        ],
        Leo: ['chefes', 'amantes do luxo', 'estrelas'],
        Virgo: [
          'pessoas eficientes',
          'frugais',
          'professores primários',
          'mestres',
        ],
        Libra: [
          'artistas elegantes',
          'diplomatas',
          'sedutores',
          'juízes indecisos',
        ],
        Scorpio: [
          'poderoso',
          'misterioso',
          'curandeiros',
          'feiticeiros',
          'mal',
        ],
        Sagittarius: [
          'nobres',
          'pastores',
          'olimpíadas',
          'missionários',
          'arrogantes',
          'hipócritas',
        ],
        Capricorn: [
          'confiáveis',
          'performáticos',
          'conservadores',
          'sérios',
          'ascetas',
        ],
        Aquarius: [
          'sábio',
          'utópico',
          'cabeça de nuvem',
          'individualistas',
          'reformadores',
        ],
        Pisces: [
          'videntes',
          'musas',
          'sonhadores',
          'transfigurados',
          'bons samaritanos',
          'mártires',
        ],
      },
      signs_list: {
        '': { name: '', symbol: '', tribe: [''], tribo: [''] },
        Aries: {
          name: 'Áries',
          symbol: '♈',
          tribe: ['nomads', 'amazons', 'frantic', 'conquerors', 'pioneers'],
          tribo: ['nômades', 'amazonas', 'conquistadores', 'pioneiros'],
        },
        Taurus: {
          name: 'Touro',
          symbol: '♉',
          tribe: [
            'farmers',
            'traditionalists',
            'earth people',
            'bankers',
            'pleasure lovers',
          ],
          tribo: [
            'fazendeiros',
            'tradicionalistas',
            'pessoas da terra',
            'bancários',
            'amantes do prazer',
          ],
        },
        Gemini: {
          name: 'Gêmeos',
          symbol: '♊',
          tribe: ['writers', 'curious', 'scholars', 'exhibitionists'],
          tribo: ['escritores', 'curiosos', 'estudantes', 'exibicionistas'],
        },
        Cancer: {
          name: 'Câncer',
          symbol: '♋',
          tribe: [
            'helpers',
            'daydreamers',
            'romantics',
            'spiritual counselors',
          ],
          tribo: [
            'ajudantes',
            'sonhadores',
            'românticos',
            'conselheiros espirituais',
          ],
        },
        Leo: {
          name: 'Leão',
          symbol: '♌',
          tribe: ['chiefs', 'luxury lovers', 'stars', 'pashas'],
          tribo: ['chefes', 'amantes do luxo', 'estrelas'],
        },
        Virgo: {
          name: 'Virgem',
          symbol: '♍',
          tribe: ['efficient people', 'frugal', 'primary teachers', 'masters'],
          tribo: [
            'pessoas eficientes',
            'frugais',
            'professores primários',
            'mestres',
          ],
        },
        Libra: {
          name: 'Libra',
          symbol: '♎',
          tribe: [
            'elegant artists',
            'diplomats',
            'seducers',
            'undecided judges',
          ],
          tribo: [
            'artistas elegantes',
            'diplomatas',
            'sedutores',
            'juízes indecisos',
          ],
        },
        Scorpio: {
          name: 'Escorpião',
          symbol: '♏',
          tribe: ['mighty', 'mysterious', 'healers', 'sorcerers', 'evil'],
          tribo: [
            'poderoso',
            'misterioso',
            'curandeiros',
            'feiticeiros',
            'mal',
          ],
        },
        Sagittarius: {
          name: 'Sagitário',
          symbol: '♐',
          tribe: [
            'nobles',
            'shepherds',
            'olympics',
            'missionaries',
            'arrogants',
            'hypocrites',
          ],
          tribo: [
            'nobres',
            'pastores',
            'olimpíadas',
            'missionários',
            'arrogantes',
            'hipócritas',
          ],
        },
        Capricorn: {
          name: 'Capricórnio',
          symbol: '♑',
          tribe: [
            'performers',
            'conservatives',
            'reliable',
            'trustworthy',
            'serious',
            'ascetics',
          ],
          tribo: [
            'performers',
            'conservadores',
            'confiáveis',
            'sérios',
            'ascetas',
          ],
        },
        Aquarius: {
          name: 'Aquário',
          symbol: '♒',
          tribe: [
            'wise',
            'utopics',
            'cloudheads',
            'individualists',
            'reformers',
          ],
          tribo: [
            'sábio',
            'utópico',
            'cabeça de nuvem',
            'individualistas',
            'reformadores',
          ],
        },
        Pisces: {
          name: 'Peixes',
          symbol: '♓',
          tribe: [
            'seers',
            'muses',
            'dreamers',
            'transfigured',
            'good samaritans',
            'martyrs',
          ],
          tribo: [
            'videntes',
            'musas',
            'sonhadores',
            'transfigurados',
            'bons samaritanos',
            'mártires',
          ],
        },
      },
      houses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      houses_info: [
        [
          'na ponte levadiça',
          'no mundo exterior',
          'no hall de entrada',
          'na vitrine',
        ],
        ['no mundo financeiro', 'na sala de tesouros'],
        ['na biblioteca', 'no mundo cotidiano', 'no mercado', 'na escola'],
        [
          'no berço',
          'no mundo interno',
          'na terra natal',
          'no mundo da fantasia',
          'no quarto das crianças',
          'no mundo da infância',
        ],
        [
          'no mundo do glamour',
          'no playground',
          'sob os refletores',
          'no palco',
        ],
        ['no workshop', 'no hospital', 'no mundo profissional', 'no spa'],
        [
          'na cama nupcial',
          'na montanha sagrada',
          'no mundo das relações íntimas',
          'no mundo das relações',
        ],
        [
          'no porão',
          'no cemitério',
          'na boca do lixo',
          'no mundo das sombras',
          'no subterraneo',
          'na zona de perigo',
          'no submundo',
        ],
        [
          'no púlpito',
          'na universidade',
          'na agência de viagens',
          'na terra santa',
          'no mundão velho e sem porteira',
        ],
        [
          'ma torre',
          'no salão da fama',
          'no mundo da seriedade',
          'na vida profissional',
        ],
        [
          'no quarto de hospedes',
          'no salão do grupo',
          'na comunidade',
          'no mundo de irmãos e irmãs',
        ],
        [
          'no eremitério',
          'bem longe',
          'em isolamento',
          'em outros mundos',
          'no topo do mundo',
        ],

        [
          'basement',
          'cemetery',
          'garbage dump',
          'shadow world',
          'underground',
          'danger zone',
          'underworld',
        ],
        ['drawbridge', 'outside world', 'entrance hall', 'showcase'],
        ['financial world', 'tesaure room'],
        ['library', 'everyday world', 'market', 'school'],
        [
          'cradle',
          'internal world',
          'homeland',
          'fantasy',
          'children room',
          'childhood world',
        ],
        ['glamor world', 'playground', 'under the reflectors', 'stage'],
        ['workshop', 'hospital', 'professional world', 'spa'],
        [
          'bridal bed',
          'sacred mountain',
          'world of intimate relationships',
          'world of relationships',
        ],
        [
          'pulpit',
          'university',
          'travel agency',
          'holy land',
          'old world and no gatekeeper',
        ],
        ['tower', 'hall of fame', 'world of seriousness', 'professional life'],
        [
          'guest room',
          'group room',
          'community world',
          'brothers and sisters world',
        ],
        [
          'hermitage',
          'far away',
          'isolation',
          'other worlds',
          'top of the world',
        ],
      ],
      aspects: {
        Conjunction: {
          symbol: '☌',
          translation: 'Conjunção',
          history: ['estão lado a lado', 'estão juntos'],
        },
        Opposition: {
          symbol: '☍',
          translation: 'Oposição',
          history: [
            'se desafiam',
            'são oponentes',
            'são opostos que se equilibram',
          ],
        },
        Trine: { symbol: '△', translation: 'Trino', history: ['são amigos'] },
        Square: {
          symbol: '□',
          translation: 'Quadratura',
          history: ['não se dão bem'],
        },
        'Semi-Square': {
          symbol: '∠',
          translation: 'Semi-Quadratura',
          history: ['se cutucam'],
        },
        Sextile: {
          symbol: '⚹',
          translation: 'Sextil',
          history: ['estão conversando', 'se apoiam'],
        },
        Quincunx: {
          symbol: '⚻',
          translation: 'Quincúcio',
          history: ['tendem a ter uma relação difícil'],
        },
        Quintile: {
          symbol: '⬠',
          translation: 'Quintil',
          history: [
            'têm oportunidade de criar juntos',
            'fluem criatividade entre si',
            'criam juntos',
            'performam juntos',
            'se expressam e criam entretenimento',
          ],
        },
        'Semi-sextile': {
          symbol: '⚺',
          translation: 'Semi-Sextil',
          history: ['compartilham um pensamento comum'],
        },
      },

      planets: {
        Asc: {
          name: 'Ascendente',
          symbol: 'ASC',
          sign: '',
          house: '',
          chars: ['A Imagem', 'O Início'],
          char: { name: '', tribe: '', place: '' },
        },
        Sun: {
          name: 'Sol',
          symbol: '☉',
          sign: '',
          house: '',
          chars: ['O Rei', 'O Herói', 'O Pai', 'O Soberano'],
          char: { name: '', tribe: '', place: '' },
        },
        Moon: {
          name: 'Lua',
          symbol: '☽',
          sign: '',
          house: '',
          chars: ['A Rainha', 'A Heroina', 'A Mãe'],
          char: { name: '', tribe: '', place: '' },
        },
        Mercury: {
          name: 'Mercúrio',
          symbol: '☿',
          sign: '',
          house: '',
          chars: ['O Olheiro', 'O Guia Local', 'O Comerciante', 'O Explorador'],
          char: { name: '', tribe: '', place: '' },
        },
        Venus: {
          name: 'Vênus',
          symbol: '♀',
          sign: '',
          house: '',
          chars: [
            'A Beleza',
            'A Musa',
            'A Sedutora',
            'A Namorada',
            'A Pomba da Paz',
          ],
          char: { name: '', tribe: '', place: '' },
        },
        Mars: {
          name: 'Marte',
          symbol: '♂',
          sign: '',
          house: '',
          chars: ['O Guerreiro', 'O Imprudente', 'O Conquistador', 'O Malvado'],
          char: { name: '', tribe: '', place: '' },
        },
        Jupiter: {
          name: 'Jupiter',
          symbol: '♃',
          sign: '',
          house: '',
          chars: ['O Padre', 'O Homem Culto', 'O Filósofo', 'O Aristocrata'],
          char: { name: '', tribe: '', place: '' },
        },
        Saturn: {
          name: 'Saturno',
          symbol: '♄',
          sign: '',
          house: '',
          chars: [
            'O Antigo',
            'O Homem Sério',
            'O Oponente',
            'O Objetor',
            'O Alarmista',
          ],
          char: { name: '', tribe: '', place: '' },
        },
        'North Node': {
          name: 'Nodo Norte',
          symbol: '☊',
          sign: '',
          house: '',
          chars: ['o caminho da evolução', 'o motivo da existência'],
          char: { name: '', tribe: '', place: '' },
        },
      },
    }
  },
  /* async asyncData({ req }) {
    const astro = await getParams()

    return { astro }
  }, */
}
</script>
