<template>
  <div id="StarReader" class="main">
    <v-divider></v-divider>
    <div id="results">
      <div>
        <div class="title">
          <h2>My Natal Chart</h2>
          <div style="position: absolute; right: 0; z-index: 6">
            <v-btn x-small rounded color="secondary" @click="RandomFill()"
              >Fill Random<v-icon>mdi-shuffle</v-icon>
            </v-btn>
          </div>
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
                <!-- <v-badge :content="planet.symbol" overlap> -->
                <span class="title font-weight-light">{{ planet.name }}</span>
                <!-- </v-badge> -->
              </v-card-title>
              <v-card-subtitle>
                is in
                {{ signs_list[myChart.planets[planet_id].sign]['name'] }}
                ({{ signs_list[myChart.planets[planet_id].sign]['symbol'] }})
                <span v-if="myChart.planets[planet_id].house">
                  , at House {{ myChart.planets[planet_id].house }}</span
                >
              </v-card-subtitle>
              <v-card-text>
                {{ planet.char.name }}
                <span v-if="planet.char.tribe"
                  >from the tribe of the {{ planet.char.tribe }}</span
                >
                <span v-if="planet.char.place"
                  >stands in the {{ planet.char.place }}</span
                >
              </v-card-text>
              <v-card-actions>
                <v-select
                  v-model="planet.char.name"
                  class="char-selector"
                  label="Choose a character"
                  :append-outer-icon="planet.symbol"
                  :items="planet.archetypes"
                >
                </v-select>
              </v-card-actions>
              <v-card-actions>
                <label for="Char_sign">{{ signs_list.id_char }}</label>
                <v-select
                  v-model="planet.char.tribe"
                  class="char-selector"
                  label="Choose a tribe"
                  :append-outer-icon="
                    signs_list[myChart.planets[planet_id].sign]['symbol']
                  "
                  :items="signs_list[myChart.planets[planet_id].sign]['tribe']"
                >
                </v-select>
              </v-card-actions>
              <v-card-actions>
                <v-select
                  v-if="myChart.planets[planet_id].house"
                  v-model="planet.char.place"
                  class="char-selector"
                  label="Choose a place"
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
        <h2>My Aspects</h2>
      </div>
      <div class="row">
        <div
          v-for="(myaspect, myAspectId) in filteredAspects(myChart.aspects)"
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
              in {{ myaspect[1] }} with
              <span v-if="planets[myaspect[0][1]]">{{
                planets[myaspect[0][1]].name
              }}</span>
              <span v-else>{{ myaspect[0][1] }}</span>
            </v-card-text>
            <div
              v-if="
                planets[myaspect[0][1]] &&
                planets[myaspect[0][0]] &&
                planets[myaspect[0][1]].char.name &&
                planets[myaspect[0][0]].char.name
              "
            >
              <span>{{ CharName(myaspect[0][0]) }}</span>

              {{ aspects[myaspect[1]].history[0] }}

              <span> {{ CharName(myaspect[0][1]) }}.</span>
            </div>
            <v-btn
              v-if="
                planets[myaspect[0][1]].char.name &&
                planets[myaspect[0][0]].char.name &&
                planets[myaspect[0][0]].tribe &&
                planets[myaspect[0][1]].tribe &&
                planets[myaspect[0][0]].place &&
                planets[myaspect[0][1]].place
              "
              :id="'btn'.concat(myAspectId)"
              :loading="LoadingStory"
              :disabled="LoadingStory"
              elevation="2"
              small
              @click="gpt(myAspectId)"
            >
              Generate Story
            </v-btn>
            <p
              v-if="
                myChart.aspects[myAspectId].hasOwnProperty('story') &&
                'story' in myChart.aspects[myAspectId]
              "
            >
              {{ myChart.aspects[myAspectId].story }}
            </p>
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
      LoadingStory: false,
      myhistory: null,
      signs_list: {
        '': {
          name: '',
          nome: '',
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
          name: 'Aries',
          nome: 'Áries',
          symbol: '♈',
          keywords: {
            basic: ['Self-esteem', 'initiative', 'pioneering'],
            positive: ['Ambition', 'courage', 'enterprise'],
            negative: ['Self-will', 'temper', 'brusqueness', 'overbearance'],
          },
          tribe: ['nomads', 'amazons', 'berserks', 'conquerors', 'pioneers'],
          tribo: ['nômades', 'amazonas', 'conquistadores', 'pioneiros'],
        },
        Taurus: {
          name: 'Taurus',
          nome: 'Touro',
          symbol: '♉',
          keywords: {
            basic: ['Determination', 'interest in mundane affairs'],
            positive: ['Endurance', 'thoroughness', 'conservatism', 'harmony'],
            negative: ['Obstinacy', 'argumentativeness'],
          },
          tribe: [
            'farmers',
            'traditionalists',
            'earthy people',
            'bankers',
            'enjoyers',
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
          name: 'Gemini',
          nome: 'Gêmeos',
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
          tribe: ['writers', 'curious', 'scholars', 'butterflies'],
          tribo: ['escritores', 'curiosos', 'estudantes', 'exibicionistas'],
        },
        Cancer: {
          name: 'Cancer',
          nome: 'Câncer',
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
            'romanticists',
            'spiritual advisors',
          ],
          tribo: [
            'ajudantes',
            'sonhadores',
            'românticos',
            'conselheiros espirituais',
          ],
        },
        Leo: {
          name: 'Leo',
          nome: 'Leão',
          symbol: '♌',
          keywords: {
            basic: [''],
            positive: [],
            negative: [],
          },
          tribe: ['bosses', 'greatests', 'luxurious', 'stars', 'pashas'],
          tribo: ['chefes', 'amantes do luxo', 'estrelas'],
        },
        Virgo: {
          name: 'Virgo',
          nome: 'Virgem',
          symbol: '♍',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          tribe: ['practical people', 'frugal', 'school teachers', 'masters'],
          tribo: [
            'pessoas eficientes',
            'frugais',
            'professores primários',
            'mestres',
          ],
        },
        Libra: {
          name: 'Libra',
          nome: 'Libra',
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
          name: 'Scorpio',
          nome: 'Escorpião',
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
          name: 'Sagittarius',
          nome: 'Sagitário',
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
          name: 'Capricorn',
          nome: 'Capricórnio',
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
          name: 'Aquarius',
          nome: 'Aquário',
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
          name: 'Pisces',
          nome: 'Peixes',
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
        ['drawbridge', 'outside world', 'entrance hall', 'display window'],
        ['financial world', 'tesaury'],
        ['library', 'everyday world', 'marketplace', 'school'],
        [
          'cradle',
          'inner world',
          'homeland',
          'fantasies',
          "child's room",
          'world of childhood',
        ],
        ['glitter world', 'playground', 'spotlight', 'stage'],
        ['workrooms', 'hospital', 'professional world', 'fitness park'],
        [
          'marriage bed',
          'sacred mountain',
          'world of partnership',
          'world of the intimate other',
        ],
        [
          'cellar',
          'cemetery',
          'red-light district',
          'shadow world',
          'underground',
          'danger zone',
          'underworld',
        ],
        ['pulpit', 'university', 'travel agency', 'holy land', 'wide world'],
        ['tower', 'hall of fame', 'serious world', 'professional life'],
        [
          'guest room',
          'group room',
          'world of community',
          'world of sisters and brothers',
        ],
        [
          'hermitage',
          'remoteness',
          'isolation',
          'other worlds',
          'roof of the world',
        ],
        [
          'porão, cemitério, boca do lixo, mundo das sombras, subterraneo, zona de perigo, submundo',
        ],
        [
          'púlpito, universidade, agencia de viagens, terra santa, mundão velho e sem porteira',
        ],
        ['torre, salão da fama, mundo da seriedade, vida profissional'],
        [
          'quarto de hospedes, sala do grupo, mundo comunidade, mundo de irmãos e irmãs',
        ],
        ['ermida, bem longe, isolamento, outros mundos, topo do mundo'],
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
          history: [
            'is side by side with',
            'At their side stands',
            'They stand side-by-side with',
          ],
          historia: ['estão lado a lado', 'estão juntos'],
        },
        Opposition: {
          symbol: '☍',
          translation: 'Oposição',
          history: [
            'is challenging',
            'In the other side, their challenging opponent is',
            'His/Her challenging opponent (counterbalance) is',
          ],
          historia: [
            'se desafiam',
            'são oponentes',
            'são opostos que se equilibram',
          ],
        },
        Trine: {
          history: [
            'is friends with',
            'Their friend is',
            'He/She is friends with',
          ],
          symbol: '△',
          translation: 'Trígono',
          historia: ['são amigos'],
        },
        Square: {
          symbol: '□',
          translation: 'Quadratura',
          history: ["doesn't get along at all with"],
          historia: ['não se dão bem'],
        },
        'Semi-Square': {
          symbol: '∠',
          translation: 'Semi-Quadratura',
          history: ['pokes'],
          historia: ['se cutucam'],
        },
        Sextile: {
          symbol: '⚹',
          translation: 'Sextil',
          history: ['is talking to', 'They support'],
          historia: ['estão conversando', 'se apoiam'],
        },
        Quincunx: {
          symbol: '⚻',
          translation: 'Quincúcio',
          history: ['tends to have a difficult relationship with'],
          historia: ['tendem a ter uma relação difícil'],
        },
        Quintile: {
          symbol: '⬠',
          translation: 'Quintil',
          history: ['has opportunity to create togheter with'],
          historia: [
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
          history: ['shares common thoughts with'],
          historia: ['compartilham um pensamento comum'],
        },
      },

      planets: {
        Sun: {
          name: 'Sun',
          nome: 'Sol',
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
          archetypes: ['the hero', 'the father', 'the king'],
          chars: ['O Rei', 'O Herói', 'O Pai', 'O Soberano'],
          char: { name: '', tribe: '', place: '' },
        },
        Moon: {
          name: 'Moon',
          nome: 'Lua',
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
          archetypes: ['the mother', 'the child'],
          chars: ['A Rainha', 'A Heroina', 'A Mãe'],
          char: { name: '', tribe: '', place: '' },
        },
        Mercury: {
          name: 'Mercury',
          nome: 'Mercúrio',
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
          archetypes: ['the trader', 'the navigator', 'the scout'],
          chars: ['O Olheiro', 'O Guia Local', 'O Comerciante', 'O Explorador'],
          char: { name: '', tribe: '', place: '' },
        },
        Venus: {
          name: 'Venus',
          nome: 'Vênus',
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
          archetypes: ['the muse', 'the lover', 'the beautiful one'],
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
          name: 'Mars',
          nome: 'Marte',
          symbol: '♂',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: ['the hero', 'the conqueror'],
          chars: ['O Guerreiro', 'O Imprudente', 'O Conquistador', 'O Malvado'],
          char: { name: '', tribe: '', place: '' },
        },
        Jupiter: {
          name: 'Jupiter',
          nome: 'Júpiter',
          symbol: '♃',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: ['the high priest', 'the missionary', 'the just person'],
          chars: ['O Padre', 'O Homem Culto', 'O Filósofo', 'O Aristocrata'],
          char: { name: '', tribe: '', place: '' },
        },
        Saturn: {
          name: 'Saturn',
          nome: 'Saturno',
          symbol: '♄',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: ['the old', 'a wise man', 'the hermit'],
          chars: [
            'O Antigo',
            'O Homem Sério',
            'O Oponente',
            'O Objetor',
            'O Alarmista',
          ],
          char: { name: '', tribe: '', place: '' },
        },
        Uranus: {
          name: 'Uranus',
          nome: 'Urano',
          symbol: '⛢',
          sign: '',
          house: '',
          keywords: {
            basic: [
              'the awakener',
              'altruism',
              'inventiveness',
              'originality',
              'sudden action',
              'unconventionality',
            ],
            positive: [],
            negative: [],
          },
          archetypes: ['eccentric', 'fool', 'free spirit', 'rebel', 'inventor'],
          chars: [],
          char: { name: '', tribe: '', place: '' },
        },
        Neptune: {
          name: 'Neptune',
          nome: 'Netuno',
          symbol: '♆',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: ['prophet', 'dreamer', 'crackpot', 'drinker'],
          chars: [],
          char: { name: '', tribe: '', place: '' },
        },
        Pluto: {
          name: 'Pluto',
          nome: 'Plutão',
          symbol: '♇',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: ['magician', 'healer', 'devil', 'witch'],
          chars: [],
          char: { name: '', tribe: '', place: '' },
        },
        'North Node': {
          name: 'North Node',
          nome: 'Nodo Norte',
          symbol: '☊',
          sign: '',
          house: '',
          keywords: {
            basic: ['path of evolution', 'reason of existence'],
            positive: [],
            negative: [],
          },
          archetypes: ['purpose of existence', 'tasks to be mastered'],
          chars: ['o caminho da evolução', 'o motivo da existência'],
          char: { name: '', tribe: '', place: '' },
        },
        Asc: {
          name: 'Ascendant',
          nome: 'Ascendente',
          symbol: 'ᴬˢᶜ',
          sign: '',
          house: '',
          keywords: {
            basic: [],
            positive: [],
            negative: [],
          },
          archetypes: [''],
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
    selectRandom(lista) {
      const random = Math.floor(Math.random() * lista.length)
      return lista[random]
    },
    filteredAspects() {
      return this.myChart.aspects.filter(
        (eachaspect) =>
          eachaspect[0][0] in this.planets && eachaspect[0][1] in this.planets
        /* this.planets.hasOwnProperty(myaspect[0][0]) &&
          this.planets.hasOwnProperty(myaspect[0][1]) */
      )
    },
    CharName(CharID) {
      const capitalize = (str, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(
          /(?:^|\s|["'([{])+\S/g,
          (match) => match.toUpperCase()
        )
      const CharName = this.planets[CharID].char.name
      return capitalize(CharName)
    },
    IntroText(myAspectId) {
      const intro = ''
      /* 'Resumo: A seguinte história é uma metáfora sobre astrologia no formato de uma peça teatral. Cada personagem representa um planeta e seu respectivo signo. Cada cena é um aspecto, com situações que evidenciam as características e as relações entre os personagens.\n\nPERSONAGENS:' */
      /* 'Summary: The following story is a metaphor about astrology in a play format. Each character represents a planet and its corresponding sign. Each scene is an aspect, with situations that highlight the characteristics and relationships between the characters.\n\n' */
      const Char1 = this.myChart.aspects[myAspectId][0][0]
      const Char2 = this.myChart.aspects[myAspectId][0][1]
      const HistAsp = this.myChart.aspects[myAspectId][1]
      const HistIntro = intro
        .concat(
          this.CharName(Char1),
          ' from the tribe of the ',
          this.planets[Char1].tribe,
          ' stands in the ',
          this.planets[Char1].place,
          '.',
          this.aspects[HistAsp].history[0],
          ' ',
          this.CharName(Char2),
          /* this.planets[Char2].char.name, */
          ' from the tribe of the ',
          this.planets[Char2].tribe,
          ', who stands in the ',
          this.planets[Char2].place,
          '.'
        )
        .concat('.\n\n', this.CharName(Char1).toUpperCase(), ':')
      return HistIntro
    },
    RandomFill() {
      let PlanetId
      for (PlanetId in this.planets) {
        this.planets[PlanetId].char.name = this.selectRandom(
          this.planets[PlanetId].archetypes
        )
        this.planets[PlanetId].char.tribe = this.selectRandom(
          this.signs_list[this.myChart.planets[PlanetId].sign].tribe
        )
        if (
          'place' in this.planets[PlanetId].char &&
          !isNaN(this.myChart.planets[PlanetId].house - 0)
        ) {
          this.planets[PlanetId].char.place = this.selectRandom(
            this.houses_info[this.myChart.planets[PlanetId].house - 1]
          )
        }
      }
    },
    gpt(myAspectId) {
      /* constructor(textinput) {
        this.textinput = textinput;
      }
      then(result){
        alert(result);
      } */
      this.myChart.aspects[myAspectId].story = 'Loading...'
      this.LoadingStory = true
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
        this.myChart.aspects[myAspectId].story = finaltext
        this.historydone = true
        this.LoadingStory = false
      })
    },
  },
}
</script>
