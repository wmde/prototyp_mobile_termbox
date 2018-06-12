<script>
import Utils from './Utils.js';
import ObjectHelper from './components/lib/ObjectHelper';
import CurrentTerm from './components/lib/CurrentTerm';
import CurrentLanguageNames from './components/lib/CurrentLanguageNames';
import Termbox from './components/Termbox.vue';
import SharedStore from './components/lib/SharedStore';
import PatricaTrie from './components/lib/Patrica';

function wrapTerm( Term ) {
	let Key, Alias, Index;
	const NewTerms = {};
	const Languages = [];
	const Trie = new PatricaTrie();
	for ( Key in Term.labels ) {
		NewTerms[ Key ] = {
			title: Term.labels[ Key ].value
		};

		NewTerms[ Key ].language = Key;
		NewTerms[ Key ].id = Term.id;
		Index = Utils.binaryInsertSearch( Languages, Key );
		if ( 0 > Index ) {
			Languages.splice(
				-( Index + 1 ),
				0,
				Key
			);
		}

		Trie.insert( Key );

		if ( Key in Term.descriptions ) {
			NewTerms[ Key ].description = Term.descriptions[ Key ].value;
		} else {
			NewTerms[ Key ].description = '';
		}

		NewTerms[ Key ].aliases = [];
		if ( Key in Term.aliases ) {
			for ( Alias in Term.aliases[ Key ] ) {
				NewTerms[ Key ].aliases.push( Term.aliases[ Key ][ Alias ].value );
			}
		}
	}

	// Add PTrie here
	for ( Key in NewTerms ) {
		NewTerms[ Key ].languages = ObjectHelper.copyObj( Languages );
	}

	// Utils.debugObjectPrint(Trie.getValues())
	return NewTerms;
}

export default {
	name: 'mainHub',
	template: '<div/>',
	components: { Termbox },
	beforeCreate: function () {
		// Detect item ID from URL, fallback to Q64
		let itemId = document.URL.substr( document.URL.lastIndexOf( '/' ) + 1 );
		if ( !itemId || !itemId.match( /^[Qq][0-9].*$/ ) ) {
			itemId = 'Q64';
		}

		CurrentTerm.Wrapper = wrapTerm;
		CurrentTerm.loadTerm( {
			baseURL: `${window.location.origin }/wikidata`,
			url: '/w/api.php',
			params: {
				action: 'wbgetentities',
				format: 'json',
				ids: itemId,
				props: 'aliases|labels|descriptions'
			},
			cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				// 'user-agent': 'Wikidata Mobile Term Box Prototype'
			},
			transformResponse: [ function ( data ) {
				data = JSON.parse( data );
				for ( const name in data.entities ) {
					// We only requested a single entity, so get it
					return data.entities[ name ];
				}
			} ]
		} );

		/**
		 * Language data was generated using Language::fetchLanguageNames('en','all') in mediawiki
		 */
		CurrentLanguageNames.loadLanguageNames( './components/data/en_lang_data.json' );

		// dirty body overflow fix
		document.getElementsByTagName( 'body' )[ 0 ].setAttribute( 'style', `${window.innerWidth}px` );
	},
	mounted: function () {
		if ( false === this.$data.termLoaded ) {
			this.getClientLanguages();
			setTimeout( this.refreshOnLoaded, 10 );
		}
	},
	methods: {
		getClientLanguages: function () {
			let Index, Value;// , Index2, ;
			if ( 'undefined' !== typeof window.navigator.language ) {
				this.$data.defaultLanguage = window.navigator.language.toLowerCase();
				this.$data.languages.push( this.$data.defaultLanguage );
			}

			if ( 'undefined' !== typeof window.navigator.languages ) {

				for ( Index in window.navigator.languages ) {
					Value = window.navigator.languages[ Index ].toLowerCase();// any formatter could putted here
					// Index2 = Utils.binaryInsertSearch( this.$data.languages, Value );
					if ( 0 > this.$data.languages.indexOf( Value ) ) {
						/* this.$data.languages.splice(
							-( Index2 + 1 ),
							0,
							Value
						);*/
						this.$data.languages.push( Value );
					}
				}
			}

			if ( 'undefined' !== typeof window.navigator.systemLanguage ) {
				Value = window.navigator.systemLanguage.toLowerCase();// any formatter could putted here
				// Index2 = Utils.binaryInsertSearch( this.$data.languages, Value );
				if ( 0 > this.$data.languages.indexOf( Value ) ) {
					/* this.$data.languages.splice(
						-( Index2 + 1 ),
						0,
						Value// any formatter could putted here
					);*/
					this.$data.languages.push( Value );
				}
				this.$data.defaultLanguage = Value;
			}

			if ( 'undefined' !== typeof window.navigator.browserLanguage ) {
				Value = window.navigator.browserLanguage.toLowerCase();// any formatter could putted here
				// Index2 = Utils.binaryInsertSearch( this.$data.languages, Value );
				if ( 0 > this.$data.languages.indexOf( Value ) ) {
					/* this.$data.languages.splice(
						-( Index2 + 1 ),
						0,
						Value// any formatter could putted here
					);*/
					this.$data.languages.push( Value );
				}
				this.$data.defaultLanguage = Value;
			}

			if ( 'undefined' !== typeof window.navigator.userLanguage ) {
				Value = window.navigator.userLanguage.toLowerCase();// any formatter could putted here
				// Index2 = Utils.binaryInsertSearch( this.$data.languages, Value );
				if ( 0 > this.$data.languages.indexOf( Value ) ) {
					/* this.$data.languages.splice(
						-( Index2 + 1 ),
						0,
						Value// any formatter could putted here
					);*/
					this.$data.languages.push( Value );
				}
				this.$data.defaultLanguage = Value;
			}
		},
		getCurrentLanguage: function ( SupportedLanguages ) {
			let Index;
			if ( -1 === SupportedLanguages.indexOf( this.$data.defaultLanguage ) ) {
				this.$data.languages.splice( this.$data.languages.indexOf( this.$data.defaultLanguage ), 1 );
				for ( Index in this.$data.languages ) {
					if ( -1 < SupportedLanguages.indexOf( this.$data.languages[ Index ] ) ) {
						this.$data.defaultLanguage = this.$data.languages[ Index ];
						break;
					}
				}
			} else {
				if ( -1 < SupportedLanguages.indexOf( 'en' ) ) {
					this.$data.defaultLanguage = 'en';
				} else {
					this.$data.defaultLanguage = SupportedLanguages[ 0 ];
				}
			}

			return this.$data.defaultLanguage;
		},
		getOtherLanguages: function () {
			return this.$data.languages;
		},
		refreshOnLoaded: function () {
			if ( false === Utils.isEmpty( CurrentTerm.Term ) ) {
				this.$data.languageSettings = new SharedStore();
				this.$data.languageSettings.multibleSets( [
					[ 'term', ObjectHelper.copyObj( CurrentTerm.Term ) ],
					[ 'currentLanguage', this.getCurrentLanguage( CurrentTerm.Term.en.languages ) ], // TODO
					[ 'otherLanguages', this.getOtherLanguages() ],
					[ 'possibleLanguages', CurrentTerm.Term.en.languages ],
					[ 'languageNames', CurrentLanguageNames.LanguageNames ]
				] );
				/**
                 *  Put the following in the code to debug troggle button behavior

                 Utils.debugObjectPrint(CurrentTerm)
                 */
				this.$data.termLoaded = true;
				this.$nextTick( function () {
					this.$forceUpdate();
				} );
			} else {
				setTimeout( this.refreshOnLoaded, 10 );
			}
		}
	},
	data: function () {
		return {
			termLoaded: false,
			languageSettings: null,
			defaultLanguage: null,
			languages: []
		};
	},
	computed: {
		getLanguagesSettings: function () {
			return this.$data.languageSettings;
		}
	}
};

</script>

<template>
    <section id="termboxSection">
        <Termbox :languagesSettings="getLanguagesSettings" v-if="termLoaded"/>
    </section>
</template>

<style>
    body
    {
        overflow-x: hidden;
        margin: 0px;
    }

    body > *
    {
        margin: 0px 0px 0px 0px;
        padding: 0px 0px 0px 0px;
        border-width: 0px 0px 0px 0px;
        vertical-align: baseline;
        background: none;
    }

    div, section
    {
        margin-top: 0!important;
    }

    h1,h2,h3,h4,h5,h6,p,ul, button
    {
        color: #222222;
        font-family: 'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans', sans-serif;
        text-align: left;
        line-height: 1.3;
    }

    h1
    {
        font-weight: 300;
        margin-left: 10px;
        padding-bottom: 0px;
        margin-bottom: 0px;
        font-family: 'Linux Libertine','Georgia','Times',serif !important;
    }

</style>
