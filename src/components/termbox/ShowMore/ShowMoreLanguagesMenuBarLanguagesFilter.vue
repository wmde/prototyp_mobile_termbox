<script>
import ObjectHelper from '../../lib/ObjectHelper';
import { DomHelper } from '../../lib/DomHelpers';
import Utils from '../../../Utils';
import LanguageCompare from '../../lib/LanguageCompare';
import { PatricaTrieCollection } from '../../lib/Patrica';

export default {
	name: 'ShowMoreLanguagesMenuBarLanguagesFilter',
	props: {
		languagesSettings: Object,
		menuSwitch: Object
	},
	data: function () {
		return {
			reframe: '',
			reframeIntervall: '',
			reAdjust: '',
			originLanguages: [],
			lastPosition: 0,
			keyMap: '',
			lastWidth: 0,
			documentBody: null,
			toReframe: null,
			searchField: null,
			currentLanguageString: '',
			lastSearch: null,
			lastSearchLength: 0,
			selectedLanguages: [],
			possibleLanguages: null,
			model: {}
		};
	},
	mounted: function () {
		let StartLanguages, Key;
		const TopBar = document.getElementById( 'showMoreLanguagesLanguagesFilterFixedTop' );
		this.$data.reAdjust = [
			TopBar,
			document.getElementById( 'showMoreLanguagesLanguagesFilterMenu' ),
			TopBar.firstChild,
			TopBar.lastChild
		];

		this.$data.documentBody = document.getElementsByTagName( 'body' )[ 0 ];
		this.$data.toReframe = document.getElementById( 'showMoreLanguagesLanguagesFilterBox' );
		this.$data.reframe = document.getElementById( 'showMoreLanguagesLanguagesFilterBox' );
		this.$data.reframeIntervall = window.setInterval( this.reframeComponent, 10 );

		this.$data.originLanguages = ObjectHelper.copyObj( this.$props.languagesSettings.get( 'otherLanguages' ) );
		this.$data.lastPosition = window.window.pageYOffset;
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).setAttribute( 'style', 'display:inline;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'termbox' ).setAttribute( 'style', 'overflow: hidden!important; height: 0px!important;' );
		document.getElementById( 'statementbox' ).setAttribute( 'style', 'overflow: hidden!important; height: 0px!important;' );
		this.$data.searchField = document.getElementById( 'showMoreLanguagesSearchField' );

		this.buildModel();

		this.$data.possibleLanguages = this.$props.languagesSettings.get( 'languages' ).findAllByValue(
			new LanguageCompare( this.$props.languagesSettings.get( 'possibleLanguages' ) )
		).getKeysAndValues();

		this.$data.startLanguagesShort = ObjectHelper.copyObj( this.$data.selectedLanguages );
		// eslint-disable-next-line
		StartLanguages = this.getLanguagesAndLabels( this.$data.selectedLanguages );
		for ( Key in this.$data.possibleLanguages ) {
			if ( -1 === this.$data.selectedLanguages.indexOf( this.$data.possibleLanguages[ Key ] ) ) {
				StartLanguages[ Key ] = this.$data.possibleLanguages[ Key ];
			}
		}

		this.$data.possibleLanguages = StartLanguages;

		this.$data.currentLanguageString = this.$props.languagesSettings.get( 'languages' ).findByValue(
			new LanguageCompare( this.$props.languagesSettings.get( 'currentLanguage' ) )
		).getKey();

		window.scrollTo( 0, 0 );
		this.reframeTop();
	},
	updated: function () {
		this.$data.reAdjust[ 0 ].removeAttribute( 'style' );
		this.$data.reAdjust[ 1 ].removeAttribute( 'style' );
		this.reframeTop();
	},
	beforeDestroy: function () {
		let Index;
		this.$props.languagesSettings.get( 'otherLanguages' ).length = 0;
		this.$forceUpdate();
		for ( Index in this.$data.selectedLanguages ) {
			this.$props.languagesSettings.get( 'otherLanguages' ).push( this.$data.selectedLanguages[ Index ] );
		}
		this.$forceUpdate();
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).setAttribute( 'style', 'display:block;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).setAttribute( 'style', 'display:inline;' );
		document.getElementById( 'termbox' ).removeAttribute( 'style' );
		document.getElementById( 'statementbox' ).removeAttribute( 'style' );
		window.scrollTo( 0, this.$data.lastPosition );
	},
	computed: {
		getTopLanguages() {

			if ( 0 === this.$data.selectedLanguages.length ) {
				this.getSelectedLanguages();
			}
			return this.getLanguagesAndLabels( this.$data.selectedLanguages );
		},
		getCurrentLanguage() {
			return this.$props.languagesSettings.get( 'currentLanguage' );
		},
		computeLanguages() {
			return this.getLanguages();
		}
	},
	methods: {
		getLanguages() {
			let CurrentSearch, SearchIndex, Results;

			this.$data.keyMap = this.$data.keyMap.trim();

			if ( 0 === this.$data.keyMap.length ) {
				if ( null === this.$data.possibleLanguages ) {
					return {};
				}
				this.$data.lastSearch = null;
				this.$data.lastSearchLength = 0;
				return this.$data.possibleLanguages;
			} else {
				if (
					null === this.$data.lastSearch					||
					this.$data.keyMap.length <= this.$data.lastSearchLength
				) {
					CurrentSearch = this.$props.languagesSettings.get( 'languages' ).findByKeyIgnoreCase( this.$data.keyMap );
				} else {
					if ( this.$data.lastSearch instanceof PatricaTrieCollection ) {
						CurrentSearch = [];
						for ( SearchIndex = 0; SearchIndex < this.$data.lastSearch.size(); SearchIndex++ ) {
							Results = this.$data.lastSearch.item( SearchIndex ).findByKeyIgnoreCase( this.$data.keyMap, true );
							CurrentSearch = CurrentSearch.concat( Results.toArray() );
						}

						if ( 0 === CurrentSearch.length ) {
							CurrentSearch = null;
						} else if ( 1 === CurrentSearch.length ) {
							CurrentSearch = CurrentSearch[ 0 ];
						} else {
							CurrentSearch = new PatricaTrieCollection( CurrentSearch );
						}
					} else {
						CurrentSearch = this.$data.lastSearch.findByKeyIgnoreCase( this.$data.keyMap, true );
					}
				}

				this.$data.lastSearchLength = this.$data.keyMap.length;
				this.$data.lastSearch = CurrentSearch;

				if ( null === CurrentSearch ) {
					return {};
				} else {
					if ( this.$data.lastSearch instanceof PatricaTrieCollection ) {
						return CurrentSearch.getAllKeysAndValues( this.filterSubKeys );
					} else {
						return CurrentSearch.getKeysAndValues( this.filterSubKeys );
					}
				}
			}
		},
		buildModel() {
			let Index;
			for ( Index in this.$props.languagesSettings.get( 'possibleLanguages' ) ) {
				if ( -1 < this.$props.languagesSettings.get( 'otherLanguages' ).indexOf(
					this.$props.languagesSettings.get( 'possibleLanguages' )[ Index ] )
				) {
					this.$data.model[ this.$props.languagesSettings.get( 'possibleLanguages' )[ Index ] ] = true;
				} else {
					this.$data.model[ this.$props.languagesSettings.get( 'possibleLanguages' )[ Index ] ] = false;
				}
			}
		},
		filterSubKeys( Key, Value ) {
			return -1 < this.$props.languagesSettings.get( 'possibleLanguages' ).indexOf( Value );
		},
		getLanguagesAndLabels( ToFind ) {
			let Languages, OuterLoop, InnerLoop;
			const Output = {};
			let Subtree;

			Languages = new LanguageCompare( ToFind );
			Languages = this.$props.languagesSettings.get( 'languages' ).findAllByValue( Languages, true );
			// eslint-disable-next-line
			Subtree = Languages.getKeysAndValues();
			for ( OuterLoop in ToFind ) {
				for ( InnerLoop in Subtree ) {
					if ( Subtree[ InnerLoop ] === ToFind[ OuterLoop ] ) {
						Output[ InnerLoop ] = ToFind[ OuterLoop ];
						break;
					}
				}
			}

			return Output;
		},
		showCurrentLanguage: function ( Language ) {
			if ( 0 === this.$data.keyMap.length ) {
				return true;
			}

			return Language.toLowerCase().startsWith( this.$data.keyMap.toLowerCase() );
		},
		getSelectedLanguages: function () {
			let Index;
			this.$data.selectedLanguages.push( this.$props.languagesSettings.get( 'currentLanguage' ) );
			for ( Index in this.$props.languagesSettings.get( 'otherLanguages' ) ) {
				if ( -1 < Utils.binarySearch(
					this.$props.languagesSettings.get( 'possibleLanguages' ),
					this.$props.languagesSettings.get( 'otherLanguages' )[ Index ]
				) ) {
					if ( this.$props.languagesSettings.get( 'currentLanguage' ) !== this.$props.languagesSettings.get( 'otherLanguages' )[ Index ] ) {
						this.$data.selectedLanguages.push( this.$props.languagesSettings.get( 'otherLanguages' )[ Index ] );
					}
				}
			}
		},
		focusSearchField: function () {
			this.$data.searchField.focus();
		},
		ignoreLanguage: function ( Language ) {
			return this.$props.languagesSettings.get( 'currentLanguage' ) === Language;
		},
		isSelected: function ( Language ) {
			return this.$data.model[ Language ];
		},
		close: function () {
			this.$props.menuSwitch.set( 'switch', 0 );
		},
		activateTypeFilter: function () {
			this.$props.menuSwitch.set( 'switch', 1 );
		},
		selection( Language ) {
			if ( false === this.$data.model[ Language ] ) {
				this.selectLanguage( Language );
			} else {
				this.unSelectLanguage( Language );
			}
			this.$data.model[ Language ] = !this.$data.model[ Language ];
			this.renderTextInput();
			this.$forceUpdate();
		},
		selectLanguage: function ( Language ) {
			this.$data.selectedLanguages.push( Language );
		},
		unSelectLanguage: function ( Language ) {
			// I really do not like that
			this.$data.selectedLanguages.splice( this.$data.selectedLanguages.indexOf( Language ), 1 );
		},
		renderTextInput: function () {
			let Reload;
			if ( 0 < this.$data.keyMap.length ) {
				Reload = this.$data.keyMap;
				this.$data.keyMap = '';
				this.$data.keyMap = Reload;
			}
		},
		reframeTop: function () {
			const TopHeight = DomHelper.computeHeight( this.$data.reAdjust[ 2 ] ) +
				DomHelper.computeHeight( this.$data.reAdjust[ 3 ] );

			if ( null === this.$data.reAdjust[ 0 ] || null === this.$data.documentBody ) {
				return;
			}

			if ( null === this.$data.reAdjust[ 0 ].getAttribute( 'style' ) ) {
				this.$data.reAdjust[ 0 ].setAttribute( 'style', `height:${ TopHeight }px;` );
			} else {
				this.$data.reAdjust[ 0 ].style.height = `${ TopHeight }px;`;
			}

			if ( null === this.$data.reAdjust[ 1 ].getAttribute( 'style' ) ) {
				this.$data.reAdjust[ 1 ].setAttribute( 'style', `margin-top:${
					( TopHeight + 25 )
				}px;` );
			} else {
				this.$data.reAdjust[ 1 ].style.marginTop = `${
					( TopHeight + 25 )
				}px;`;
			}
			DomHelper.reframeToElement( this.$data.reAdjust[ 0 ], this.$data.documentBody );
		},
		reframeComponent: function () {
			if ( this.$data.lastWidth !== window.innerWidth ) {
				DomHelper.reframeToElement( this.$data.toReframe, this.$data.documentBody );
				this.$data.reAdjust[ 0 ].removeAttribute( 'style' );
				this.reframeTop();
				this.$data.lastWidth = window.innerWidth;
				this.$forceUpdate();
			}
		}
	}
};
</script>

<template>
	<div id="showMoreLanguagesLanguagesFilterBox">
		<div id="showMoreLanguagesLanguagesFilterFixedTop">
			<div id="showMoreLanguagesActiveLanguages">
				<span v-bind:key="languagestring" v-for="( languagecode, languagestring) in getTopLanguages">{{languagestring}}</span>
			</div>
			<div class="showMoreLanguagesLanguagesFilter">
				<button @click="close()"
						class="showMoreLanguagesMenuLanguageFilterSave"
				>Remember selected languages
				</button>
				<div @click="activateTypeFilter()"
					class="showMoreLanguagesMenuTypeFilterActivator">
					<button><img src="../../../assets/Bars.png"/></button>
				</div>
			</div>
		</div>
		<form id="showMoreLanguagesLanguagesFilterMenu">
			<div @click="focusSearchField()"
				id="showMoreLanguagesSearchBar">
				<div @click="focusSearchField()">
					<input id="showMoreLanguagesSearchField" type="text" v-model="keyMap" placeholder="Find language"/>
				</div>
				<button disabled><img src="../../../assets/Lupe.png"/></button>
			</div>
			<div id="showMoreLanguagesLanguagesSelection">
				<div v-if="showCurrentLanguage( currentLanguageString )" class="showMoreLanguagesLanguagesActiveLanguage">
					<div>
						<input
							id="lastStanding"
							disabled
							checked
							type="checkbox"
						/>
						<label>{{currentLanguageString}}</label>
					</div>
				</div>
				<!-- just stupido you are forced to do that //-->
				<div v-bind:key="languagestring"
					v-for="(languagecode, languagestring) in computeLanguages"
					@click="selection( languagecode )"
				>
					<div v-if="
						false === ignoreLanguage(languagecode)
					&&
						false === isSelected(languagecode)"
						class="showMoreLanguagesLanguagesInActiveLanguage"
					>
						<input
							v-model="model[languagecode]"
							type="checkbox"
						/>
						<label>{{languagestring}}</label>
					</div>
					<div v-else-if="
						false === ignoreLanguage(languagecode)
					&&
						true === isSelected(languagecode)"
						class="showMoreLanguagesLanguagesActiveLanguage"
					>
						<input
							v-model="model[languagecode]"
							checked
							type="checkbox"
						/>
						<label>{{languagestring}}</label>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<style scoped>
#showMoreLanguagesLanguagesFilterBox {
	position: absolute;
	top: 0;
	overflow-x: hidden;
	height: 100%;
	background-color: #eaecf0;
}

.showMoreLanguagesLanguagesFilter {
	height: 50px;
	background-color: #3366cc;
	border-color: #f5f5f5;
	border-bottom-width: 2px;
	border-bottom-color: #a2a9b1;
	border-bottom-style: solid;
}

.showMoreLanguagesLanguagesFilter > button
{
	width: 100%;
}

#showMoreLanguagesLanguagesFilterFixedTop
{
	position: fixed;
	z-index:3;
}

.showMoreLanguagesMenuLanguageFilterSave {
	background-color: #3366cc;
	color: #ffffff;
	display: inline;
	border-style: none;
	padding-top: 3px;
	padding-left: 15px;
	font-size: 1em;
	width: 100%;
	height: 50px;
	font-family: 'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans',sans-serif;
}

.showMoreLanguagesLanguagesFilter > div {
	background-color: #c8ccd1;
	border-left-width: 0px;
}

.showMoreLanguagesLanguagesFilter > div > img {
	padding-left: 8.5px;
	padding-right: 8.5px;
}

#showMoreLanguagesActiveLanguages {
	text-align: left;
	background-color: #f8f9fa;
	color: #696d71;
	padding-top: 12.5px;
	padding-bottom: 12.5px;
	width: 100%;
	margin-left: 5%;
	line-height: 1.5;
	font-family: 'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans',sans-serif;
}

#showMoreLanguagesActiveLanguages > span {
	display: inline-block;
	margin-left: 30px;
}

#showMoreLanguagesActiveLanguages {
	display: inline-block;
	margin-left: 0px !important;
}

#showMoreLanguagesLanguagesFilterMenu {
	color: #7a7e84;
	padding-top: 25px;
}

#showMoreLanguagesLanguagesSelection > div > div {
	padding: 0.8em;
	margin-bottom: 0px;
}

#showMoreLanguagesLanguagesSelection > div:first-child {
	padding-top: 1.5em;
}

#showMoreLanguagesLanguagesSelection > div > div:last-child {
	padding-bottom: 1.5em;
}

#showMoreLanguagesLanguagesSelection > div > div > label {
	display: inline-block;
	color: #72777d;
	font-size: 1.1em;
	padding-right: 90px;
	font-family: 'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans',sans-serif;
}

#showMoreLanguagesLanguagesSelection > div > div > input[checked] + label {
	color: #000000 !important;

}

#showMoreLanguagesLanguagesSelection > div > div > input[disabled] + label {
	color: #3366cc !important;
}

#showMoreLanguagesLanguagesSelection > div > div > input {
	display: inline-block;
	float: right;
	right: 35px;
	position: absolute;
	width: 20px;
	height: 20px;

}

#showMoreLanguagesLanguagesSelection > div > div > input[checked] {
	background: #3366cc;
}

#showMoreLanguagesSearchBar {
	margin: auto;
	background-color: #ffffff;
	height: 30px;
	border: 1px solid #a2a9b1;
	border-radius: 5px;
	padding: 5px 5px 5px 5px;
}

#showMoreLanguagesSearchBar > div > input {
	width: 70%;
	height: 27px;
	border-width: 0px !important;
	padding-left: 1em;
	font-size: 1em;
}

#showMoreLanguagesSearchBar > button {
	float: right;
	border-width: 0px !important;
	background: transparent;
	top: -1.8em;
	margin: auto;
	position: relative;
}

#showMoreLanguagesSearchBar > button > img {
	height: 1.5em;
}
</style>
