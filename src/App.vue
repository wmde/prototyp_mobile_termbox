<script>
import Utils from './components/Utils.js';

import SharedStore from './components/SharedData';
import CurrentTerm from './components/CurrentTerm';
import ContentBox from './components/ContentBox';
import ShowMoreLanguagesBar from './components/ShowMoreLanguagesBar';
import ObjectHelper from './components/ObjectHelper';

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
	name: 'termbox',
	template: '<div/>',
	components: { ContentBox, ShowMoreLanguagesBar },
	beforeCreate: function () {

	    CurrentTerm.Wrapper = wrapTerm;
		CurrentTerm.loadTerm( './data/Q64_data.json' );
	},
	computed: {
		id: function () {
			return this.$data.term[ this.getCurrentLanguage() ].id;
		},
		title: function () {
			return this.$data.term[ this.getCurrentLanguage() ].title;
		},
		description: function () {
			return this.$data.term[ this.getCurrentLanguage() ].description;
		},
		aliases: function () {
			return this.$data.term[ this.getCurrentLanguage() ].aliases;
		},
		getTerm: function () {
		    return ObjectHelper.copyObj( this.$data.term );
		}

	},
	mounted: function () {
		setTimeout( this.refreshOnLoaded, 10 );
	},
	methods: {
	    getCurrentLanguage: function () {
			return 'de';
		},
		refreshOnLoaded: function () {
			if ( false === Utils.isEmpty( CurrentTerm.Term ) ) {
				SharedStore.initStorage( CurrentTerm.Term[ this.getCurrentLanguage() ].id );
				SharedStore.set( { currentLanguage: this.getCurrentLanguage(), otherLanguages: [ this.getCurrentLanguage() ] } );
			    this.$data.term = ObjectHelper.copyObj( CurrentTerm.Term );
				this.$data.termLoaded = true;
				this.$data.hasAlias = 0 < this.$data.term[ this.getCurrentLanguage() ].aliases;
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
			hasAlias: false
		};
	}
};

</script>

<template>
    <div id="termbox" v-if="termLoaded">
        <ContentBox
                :title="title"
                :id="id"
                :description="description"
                :hasAlias="hasAlias"
                :aliases="aliases"
        />
        <ShowMoreLanguagesBar :term="getTerm"/>
    </div>
</template>

<style>
    body > *
    {
        margin: 0px 0px 0px 0px;
        padding: 0px 0px 0px 0px;
        border-width: 0px 0px 0px 0px;
        vertical-align: baseline;
        background: none;
    }

    div
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

    #termbox
    {
        width: 101%;
        left:0;
        margin-left:-10px;
    }

    #termbox > div
    {
        padding-left: 15px;
    }
</style>
