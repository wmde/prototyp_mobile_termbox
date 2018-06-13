<script>
import ObjectHelper from '../../lib/ObjectHelper';
export default {
	name: 'ShowMoreLanguagesMenuBarLanguagesFilter',
	props: {
		languagesSettings: Object,
		menuSwitch: Object
	},
	data: function () {
		return { reset: true, originLanguages: [], lastPosition: 0, include: '', isDiabled: false };
	},
	mounted: function () {
		this.$data.reset = true;
		this.$data.originLanguages = ObjectHelper.copyObj( this.$props.languagesSettings.get( 'otherLanguages' ) );
		this.$data.lastPosition = window.window.pageYOffset;
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).setAttribute( 'style', 'display:inline;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'termbox' ).setAttribute( 'style', 'overflow: hidden!important; height: 0px!important;' );
		document.getElementById( 'statementbox' ).setAttribute( 'style', 'overflow: hidden!important; height: 0px!important;' );
		window.scrollTo( 0, 0 );
	},
	beforeDestroy: function () {
		let Index;
		if ( true === this.$data.reset ) {
			for ( Index in this.$data.originLanguages ) {
				if ( -1 === this.$props.languagesSettings.get( 'otherLanguages' ).indexOf( this.$data.originLanguages[ Index ] ) ) {
					this.$props.languagesSettings.get( 'otherLanguages' ).splice( Index, 0, this.$data.originLanguages[ Index ] );
				}
			}
			this.$forceUpdate();
		}
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).setAttribute( 'style', 'display:block;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).setAttribute( 'style', 'display:none;' );
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).setAttribute( 'style', 'display:inline;' );
		document.getElementById( 'termbox' ).removeAttribute( 'style' );
		document.getElementById( 'statementbox' ).removeAttribute( 'style' );
		window.scrollTo( 0, this.$data.lastPosition );
	},
	computed: {
		getLanguages() {
			return this.pushVisibleLanguages( 'otherLanguages' );
		},
		getTopLanguages() {
			return this.$props.languagesSettings.get( 'otherLanguages' );
		},
		getPossibleLanguages() {
			return this.pushVisibleLanguages( 'possibleLanguages' );
		},
		getLanguageNames: function () {
			return this.$props.languagesSettings.get( 'languageNames' );
		}
	},
	methods: {
		shouldBeDisabled: function ( Language ) {
			return this.$props.languagesSettings.get( 'currentLanguage' ) === Language;
		},
		pushVisibleLanguages( Key ) {
			let Index;
			const Output = [];
			if ( 0 === this.$data.include.length ) {
				return this.$props.languagesSettings.get( Key );
			}	else {
				for ( Index in this.$props.languagesSettings.get( Key ) ) {
					if ( this.$props.languagesSettings.get( Key )[ Index ] in this.$props.languagesSettings.get( 'languageNames' ) &&
						true === this.$props.languagesSettings.get( 'languageNames' )[ this.$props.languagesSettings.get( Key )[ Index ] ].toLowerCase().startsWith( this.$data.include.toLowerCase() )
					) {
						Output.push( this.$props.languagesSettings.get( Key )[ Index ] );
					}
				}

				return Output;
			}
		},
		isInActiveLanguage: function ( Language ) {
			return -1 === this.$props.languagesSettings.get( 'otherLanguages' ).indexOf( Language );
		},
		close: function () {
			this.$data.reset = false;
			this.$props.menuSwitch.set( 'switch', 0 );
		},
		activateTypeFilter: function () {
			this.$data.reset = false;
			this.$props.menuSwitch.set( 'switch', 1 );
		},
		selectLanguage: function ( Language ) {
			this.$props.languagesSettings.get( 'otherLanguages' ).push( Language );
			this.$data.isDiabled = false;
			this.$forceUpdate();
		},
		unSelectLanguage: function ( Language ) {
			if ( 1 < this.$props.languagesSettings.get( 'otherLanguages' ).length ) {
				this.$props.languagesSettings.get( 'otherLanguages' ).splice(
					this.$props.languagesSettings.get( 'otherLanguages' ).indexOf( Language ),
					1
				);
				if ( 1 === this.$props.languagesSettings.get( 'otherLanguages' ).length ) {
					this.$data.isDiabled = true;
				}
				this.$forceUpdate();
			} else {
				this.$data.isDiabled = true;
				this.$forceUpdate();
			}
		}
	}
};
</script>

<template>
	<div id="showMoreLanguagesLanguagesFilterBox">
		<div id="showMoreLanguagesActiveLanguages">
			<span v-bind:key="language" v-for="language in getTopLanguages">{{getLanguageNames[language]}}</span>
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
		<form id="showMoreLanguagesLanguagesFilterMenu">
			<div id="showMoreLanguagesSearchBar">
				<div>
					<input type="text" v-model="include" placeholder="Find language"/>
				</div>
				<button disabled><img src="../../../assets/Lupe.png"/></button>
			</div>
			<div id="showMoreLanguagesLanguagesSelection">
				<div v-bind:key="language"
					v-for="language in getLanguages"
					class="showMoreLanguagesLanguagesActiveLanguage">
					<div v-if="shouldBeDisabled(language)">
						<input id="lastStanding" disabled checked type="checkbox"/>
						<label>{{getLanguageNames[getLanguages[0]]}}</label>
					</div>
					<div v-else
						@click="unSelectLanguage(language)">
						<input checked type="checkbox"/>
						<label>{{getLanguageNames[language]}}</label>
					</div>
				</div>
				<div class="showMoreLanguagesLanguagesInActiveLanguage"
					v-if="isInActiveLanguage(language)"
					v-bind:key="language"
					v-for="language in getPossibleLanguages"
					@click="selectLanguage(language)">
					<div>
						<input type="checkbox"/>
						<label>{{getLanguageNames[language]}}</label>
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
	width: 100%;
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
	padding-right: 5%;
	line-height: 1.5;
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

input:focus {
   outline:none;
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
	font-size: 1.3em;
	padding-right: 90px;
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
	margin: 0.5em;
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
