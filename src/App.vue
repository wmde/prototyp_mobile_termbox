<script>
import Utils from './Utils.js';
import ObjectHelper from './components/lib/ObjectHelper';
import CurrentTerm from './components/lib/CurrentTerm';
import Termbox from './components/Termbox.vue';
import SharedStore from './components/lib/SharedStore';

function wrapTerm( Term ) {
	let Key, Alias;
	const NewTerms = {};
	const Languages = [];
	for ( Key in Term.labels ) {
		NewTerms[ Key ] = {
			title: Term.labels[ Key ].value
		};

		NewTerms[ Key ].language = Key;
		NewTerms[ Key ].id = Term.id;
		Languages.push( Key );

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

	return NewTerms;
}

export default {
	name: 'mainHub',
	template: '<div/>',
	components: { Termbox },
	beforeCreate: function () {
	    CurrentTerm.Wrapper = wrapTerm;
		CurrentTerm.loadTerm( 'components/data/Q64_data.json' );
	},
	mounted: function () {
		setTimeout( this.refreshOnLoaded, 10 );
	},
	methods: {
	    getCurrentLanguage: function () {
			return 'de';
		},
		getOtherLanguages: function () {
			return [ 'de' ];
		},
		refreshOnLoaded: function () {
			if ( false === Utils.isEmpty( CurrentTerm.Term ) ) {
				this.$data.shared = new SharedStore();
				this.$data.shared.multibleSets( [
				    [ 'term', ObjectHelper.copyObj( CurrentTerm.Term ) ],
					[ 'currentLanguage', this.getCurrentLanguage() ],
					[ 'otherLanguages', this.getOtherLanguages() ]
				] );
			    // Utils.debugObjectPrint(CurrentTerm.Term )
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
			shared: null
		};
	},
	computed: {
	    getShared: function () {
			return this.$data.shared;
		}
	}
};

</script>

<template>
    <section id="termboxSection">
        <Termbox :shared="getShared" v-if="termLoaded"/>
    </section>
</template>

<style>
    body
    {
        overflow-x: hidden;
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
