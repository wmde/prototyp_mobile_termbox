<script>
import Utils from './components/Utils.js';

import { RuntimeErrorException } from './components/BaseExceptions.js';
import ContentBox from './components/ContentBox.vue';
import ShowMoreLanguagesBar from './components/ShowMoreLanguagesBar.vue';
import ObjectHelper from './components/ObjectHelper';

class CurrentTerm {
    static Term = '';
    static Wrapper;

    static loadTerm( Term ) {
    	CurrentTerm.Term = '';
    	Utils.get( Term, CurrentTerm.onLoadTerm );
    	Utils.waitUntil( CurrentTerm.termIsLoaded );
    }

    static onLoadTerm( Response, Error ) {
    	if ( false === Utils.isEmpty( Error ) ) {
    		throw new RuntimeErrorException( Error );
    	}

    	if ( 'function' !== typeof CurrentTerm.Wrapper ) {
    		CurrentTerm.Term = Response;
    	} else {
    		CurrentTerm.Term = CurrentTerm.Wrapper( Response );
    	}
    }

    static termIsLoaded() {
    	return Utils.isEmpty( CurrentTerm.Term );
    }
}

function wrapTerm( Term ) {
	let Key, Alias;
	const NewTerms = {};

	for ( Key in Term.labels ) {
		NewTerms[ Key ] = {
			label: Term.labels[ Key ].value
		};

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

	NewTerms.id = Term.id;
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
			return this.$data.term.id;
		},
		title: function () {
			return this.$data.term[ this.$data.currentLanguage ].label;
		},
		description: function () {
			return this.$data.term[ this.$data.currentLanguage ].description;
		},
		aliases: function () {
			return this.$data.term[ this.$data.currentLanguage ].aliases;
		}
	},
	mounted: function () {
		setTimeout( this.refreshOnLoaded, 10 );
	},
	methods: {
		refreshOnLoaded: function () {
			if ( false === Utils.isEmpty( CurrentTerm.Term ) ) {
			    this.$data.term = ObjectHelper.copyObj( CurrentTerm.Term );
				this.$data.termLoaded = true;
				this.$data.hasAlias = 0 < this.$data.term[ this.$data.currentLanguage ].aliases;
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
			hasAlias: false,
			currentLanguage: 'de'
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
        <ShowMoreLanguagesBar/>
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
        padding-left: 10px;
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
