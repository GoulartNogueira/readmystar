<template>
  <div id="StarReader" class="main">
    <v-divider></v-divider>
    <div id="results">
      <div>
        <div class="title">
          <h2>My Characters</h2>
        </div>
        <div class="row">
          <div
            v-for="(planet, planet_id) in planets"
            :key="planet_id"
            class="col-sm-6 col-lg-3"
          >
            <v-card v-if="myChart.planets[planet_id]" elevation="2" shaped>
              <v-card-title>
                <v-icon large left> {{ planet.symbol }} </v-icon>
                <span class="title font-weight-light">{{ planet.name }}</span>
              </v-card-title>
              <v-card-subtitle>
                in
                {{ signs_list[myChart.planets[planet_id].sign]['name'] }}
                ({{ signs_list[myChart.planets[planet_id].sign]['symbol'] }})
                <span v-if="myChart.planets[planet_id].house">
                  at House {{ myChart.planets[planet_id].house }}</span
                >
              </v-card-subtitle>
              <v-card-text>
                {{ planet.char.name }}
                <span v-if="planet.char.tribe"
                  >da tribo dos {{ planet.char.tribe }}</span
                >
                <span v-if="planet.char.place"
                  >está {{ planet.char.place }}</span
                >
              </v-card-text>
              <v-card-actions>
                <v-select
                  v-model="planet.char.name"
                  class="char-selector"
                  label="Escolha seu herói"
                  :append-outer-icon="planet.symbol"
                  :items="planet.keywords.basic"
                >
                </v-select>
              </v-card-actions>
              <v-card-actions>
                <label for="Char_sign">{{ signs_list.id_char }}</label>
                <v-select
                  v-model="planet.char.tribe"
                  class="char-selector"
                  label="Escolha sua tribo"
                  :append-outer-icon="
                    signs_list[myChart.planets[planet_id].sign]['symbol']
                  "
                  :items="
                    signs_list[myChart.planets[planet_id].sign]['keywords'][
                      'basic'
                    ]
                  "
                >
                </v-select>
              </v-card-actions>
              <v-card-actions>
                <v-select
                  v-if="myChart.planets[planet_id].house"
                  v-model="planet.char.place"
                  class="char-selector"
                  label="Escolha seu cenário"
                  :append-outer-icon="
                    myChart.planets[planet_id].house.toString()
                  "
                  :items="houses_info[myChart.planets[planet_id].house - 1]"
                >
                </v-select>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="container">
      <div class="title">
        <h2>Minha História</h2>
      </div>
      <div class="row">
        <div
          v-for="(myaspect, myAspectId) in myChart.aspects"
          :key="myAspectId"
          class="col-sm-6 col-lg-3"
        >
          <v-card>
            <v-card-title>
              <span v-if="planets[myaspect[0][0]]">{{
                planets[myaspect[0][0]].symbol
              }}</span>
              <span v-else> myaspect[0][0]] </span>
              {{ aspects[myaspect[1]].symbol }}
              <span v-if="planets[myaspect[0][1]]">{{
                planets[myaspect[0][1]].symbol
              }}</span>
              <span v-else> {{ myaspect[0][1] }} </span>
            </v-card-title>
            <v-card-text>
              <span v-if="planets[myaspect[0][0]]">{{
                planets[myaspect[0][0]].name
              }}</span>
              <span v-else>{{ myaspect[0][0] }}</span>
              em {{ aspects[myaspect[1]].translation }} com
              <span v-if="planets[myaspect[0][1]]">{{
                planets[myaspect[0][1]].name
              }}</span>
              <span v-else>{{ myaspect[0][1] }}</span>
            </v-card-text>
            <div
              v-if="
                planets[myaspect[0][1]].char.name &&
                planets[myaspect[0][0]].char.name
              "
            >
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
            <v-btn
              v-if="
                false /*excluir essa linha para habilitar*/ &&
                planets[myaspect[0][1]].char.name &&
                planets[myaspect[0][0]].char.name
              "
              :id="'btn'.concat(myAspectId)"
              elevation="2"
              small
              @click="gpt(myAspectId)"
              >História</v-btn
            >
          </v-card>
          <!-- planets[myaspect[0][0]].char.name.concat(
              ' e ',
              planets[myaspect[0][1]].char.name,
              aspects[myaspect[1]].history[0]
            ) -->
        </div>
      </div>
    </div>
    <v-card v-if="historydone" id="history"> {{ myhistory }} </v-card>
  </div>
</template>

<style scoped>
.char-selector {
  outlined: true;
}
</style>

<script>
import astrojson from '~/static/astro.json'

/* const getParams = () => import('./astro.json').then((m) => m.default || m) */
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
  asyncData({ params }) {
    return { astrojson }
  },
  data() {
    return {
      historydone: false,
      myhistory: null,
      signs_list: {
        '': {
          name: '',
          symbol: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: [''],
          tribo: [''],
        },
        Aries: {
          name: 'Áries',
          symbol: '♈',
          keywords: {
            basic: ['Self-esteem', 'initiative', 'pioneering'],
            positive: ['Ambition', 'courage', 'enterprise'],
            negative: ['Self-will', 'temper', 'brusqueness', 'overbearance'],
          },
          tribe: ['nomads', 'amazons', 'frantic', 'conquerors', 'pioneers'],
          tribo: ['nômades', 'amazonas', 'conquistadores', 'pioneiros'],
        },
        Taurus: {
          name: 'Touro',
          symbol: '♉',
          keywords: {
            basic: ['Determination', 'interest in mundane affairs'],
            positive: ['Endurance', 'thoroughness', 'conservatism', 'harmony'],
            negative: ['Obstinacy', 'argumentativeness'],
          },
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
          keywords: {
            basic: [
              'Intellectuality',
              'literary affairs',
              'work with hands, dualism',
            ],
            positive: [],
            negative: [],
          },
          tribe: ['writers', 'curious', 'scholars', 'exhibitionists'],
          tribo: ['escritores', 'curiosos', 'estudantes', 'exibicionistas'],
        },
        Cancer: {
          name: 'Câncer',
          symbol: '♋',
          keywords: {
            basic: [
              'Love of home',
              'capacity for home building',
              'impressionability',
            ],
            positive: ['Sympathy', 'sensitiveness', 'artistry'],
            negative: ['Clannishness', 'timidity', 'restlessness', 'indolence'],
          },
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
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: ['chiefs', 'luxury lovers', 'stars', 'pashas'],
          tribo: ['chefes', 'amantes do luxo', 'estrelas'],
        },
        Virgo: {
          name: 'Virgem',
          symbol: '♍',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
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
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
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
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: ['mighty', 'mysterious', 'healers', 'sorcerers', 'evil'],
          tribo: [
            'poderosos',
            'misteriosos',
            'curandeiros',
            'feiticeiros',
            'malvados',
          ],
        },
        Sagittarius: {
          name: 'Sagitário',
          symbol: '♐',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
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
            'olímpicos',
            'missionários',
            'arrogantes',
            'hipócritas',
          ],
        },
        Capricorn: {
          name: 'Capricórnio',
          symbol: '♑',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: [
            'performers',
            'conservatives',
            'reliable',
            'trustworthy',
            'serious',
            'ascetics',
          ],
          tribo: [
            'performáticos',
            'conservadores',
            'confiáveis',
            'sérios',
            'ascetas',
          ],
        },
        Aquarius: {
          name: 'Aquário',
          symbol: '♒',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: [
            'wise',
            'utopics',
            'cloudheads',
            'individualists',
            'reformers',
          ],
          tribo: [
            'sábios',
            'utópicos',
            'cabeças de núvem',
            'individualistas',
            'reformadores',
          ],
        },
        Pisces: {
          name: 'Peixes',
          symbol: '♓',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
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
        ['Beginnings', 'early environment', 'personality', 'physical body'],
        ['Finance', 'freedom given by money'],
        ['Lower mind and speaking', 'short journeys', 'brothers and sisters'],
        [
          'The home',
          'the mother',
          'conditions at end of life',
          'lands',
          'mines',
        ],
        ['Pleasure', 'education', 'children', 'publications', 'speculation'],
        [
          'Servicem',
          'relations with employers and employees',
          'health and sickness',
        ],
        ['Partnership', 'marriage', 'the public'],
        ['Legacies', 'cause of death', 'occult tragedy', 'regeneration'],
        ['Higher mind', 'religion, law', 'long journeys'],
        ['Profession', 'standing in community', 'the father'],
        ['Friends', 'hopes', 'wishes'],
        [
          'Paying debts of destiny',
          'limitations',
          'institutions for care of unfortunates',
          'secrecy',
          'mysticism',
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
        Trine: { symbol: '△', translation: 'Trígono', history: ['são amigos'] },
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
        Sun: {
          name: 'Sol',
          symbol: '☉',
          sign: '',
          house: '',
          keywords: {
            basic: [
              'Individuality',
              'What you really are',
              'vitality',
              'will',
              'chief ambitions',
              'those in authority',
              'men',
            ],
            positive: ['Generosity', 'dignity'],
            negative: [
              'Despotism',
              'arrogance',
              'ostentation',
              'lack of ambition',
              'animalistic qualities',
            ],
          },
          chars: ['O Rei', 'O Herói', 'O Pai', 'O Soberano'],
          char: { name: '', tribe: '', place: '' },
        },
        Moon: {
          name: 'Lua',
          symbol: '☽',
          sign: '',
          house: '',
          keywords: {
            basic: [
              'Personality',
              'imagination',
              'instinctual mind',
              'emotions',
              'change',
              'fecundation',
              'the people',
              'women',
            ],
            positive: ['Positive psychic qualities', 'personal magnetism'],
            negative: [
              'Negativeness',
              'visionariness',
              'dreaming',
              'vacillation',
              'frivolity',
              'fretfulness',
              'procrastination',
              'indecision',
              'incorrect impressions',
            ],
          },

          chars: ['A Rainha', 'A Heroina', 'A Mãe'],
          char: { name: '', tribe: '', place: '' },
        },
        Mercury: {
          name: 'Mercúrio',
          symbol: '☿',
          sign: '',
          house: '',
          keywords: {
            basic: [
              'Reason',
              'self-expression of all kinds',
              'speaking',
              'writing',
              'gestures',
              'knowledge through reason',
            ],
          },
          chars: ['O Olheiro', 'O Guia Local', 'O Comerciante', 'O Explorador'],
          char: { name: '', tribe: '', place: '' },
        },
        Venus: {
          name: 'Vênus',
          symbol: '♀',
          sign: '',
          house: '',
          keywords: {
            basic: [
              'Attraction',
              'cohesion',
              'coalition',
              'personal love',
              'social instincts and activities',
              'art',
              'ornamentation',
              'beauty',
            ],
          },
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
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          chars: ['O Guerreiro', 'O Imprudente', 'O Conquistador', 'O Malvado'],
          char: { name: '', tribe: '', place: '' },
        },
        Jupiter: {
          name: 'Jupiter',
          symbol: '♃',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          chars: ['O Padre', 'O Homem Culto', 'O Filósofo', 'O Aristocrata'],
          char: { name: '', tribe: '', place: '' },
        },
        Saturn: {
          name: 'Saturno',
          symbol: '♄',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
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
          keywords: {
            basic: ['path of evolution', 'reason of existence'],
            positive: [],
            negative: [],
          },
          chars: ['o caminho da evolução', 'o motivo da existência'],
          char: { name: '', tribe: '', place: '' },
        },
        Asc: {
          name: 'Ascendente',
          symbol: 'ᴬˢᶜ',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          chars: ['A Imagem', 'O Início'],
          char: { name: '', tribe: '', place: '' },
        },
      },
    }
  },

  // Example posting a text URL:
  // Get the 'deepai' package here (Compatible with browser & nodejs):
  //     https://www.npmjs.com/package/deepai
  // All examples use JS async-await syntax, be sure to call the API inside an async function.
  //     Learn more about async-await here: https://javascript.info/async-await

  methods: {
    CharName(CharID) {
      return this.planets[CharID].char.name
    },
    IntroText(myAspectId) {
      const intro =
        'Resumo: A seguinte história é uma metáfora sobre astrologia no formato de uma peça teatral. Cada personagem representa um planeta e seu respectivo signo. Cada cena é um aspecto, com situações que evidenciam as características e as relações entre os personagens.\n\nPERSONAGENS:'
      const Char1 = this.myChart.aspects[myAspectId][0][0]
      const Char2 = this.myChart.aspects[myAspectId][0][1]
      const HistAsp = this.myChart.aspects[myAspectId][1]
      const HistIntro = intro
        .concat(
          this.CharName(Char1),
          ' da tribo dos ',
          this.planets[Char1].tribe,
          ' está ',
          this.planets[Char1].place,
          '.'
        )
        .concat(
          this.CharName(Char2),
          ' da tribo dos ',
          this.planets[Char2].tribe,
          ' está ',
          this.planets[Char2].place,
          '.'
        )
        .concat(
          '\n\nCONFIGURAÇÃO:',
          ' e ',
          this.planets[Char2].char.name,
          ' ',
          this.aspects[HistAsp].history[0]
        )
        .concat('\n\nATO I\n\nCENA 1')
        .concat('.\n\n', this.CharName(Char1), ':')
      return HistIntro
    },
    gpt(myAspectId) {
      /* constructor(textinput) {
        this.textinput = textinput;
      }
      then(result){
        alert(result);
      } */

      this.$emit('historyclicked')
      console.log('starting API query...')
      // Example posting file picker input text (Browser only):
      const deepai = require('deepai') // OR include deepai.min.js as a script tag in your HTML
      const textinput = this.IntroText(myAspectId)
      console.log(textinput)
      console.log('1st log')
      deepai.setApiKey('d6ccc08d-4cc0-46a2-bbe5-cae32f91559a')
      ;(async function (textinput) {
        const resp = await deepai.callStandardApi('text-generator', {
          text: textinput,
        })
        console.log('2st log')
        console.log(resp)
        return resp.output
      })(textinput).then((finaltext) => {
        this.myhistory = finaltext
        this.historydone = true
      })
    },
  },
}
</script>
