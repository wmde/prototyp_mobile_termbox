<script>
export default {
	name: 'ShowMoreLanguagesContentBox',
	props: {
		languagesSettings: Object,
		directives: Object
	},
	data: function () {
		return { otherLanguages: [] };
	},
	mounted: function () {
		this.$data.otherLanguages = this.$props.languagesSettings.get( 'otherLanguages' );
	},
	computed: {
		getTerm: function () {
			return this.$props.languagesSettings.get( 'term' );
		},
		getLanguageNames: function () {
			return this.$props.languagesSettings.get( 'languageNames' );
		},
		currentLanguage: function () {
			return this.$props.languagesSettings.get( 'currentLanguage' );
		},
		displayLabels: function () {
			return this.$props.directives.get( 'labels' );
		},
		displayDescriptions: function () {
			return this.$props.directives.get( 'descriptions' );
		},
		displayAliases: function () {
			return this.$props.directives.get( 'aliases' );
		}
	},
	methods: {
		shouldDisplayInOtherLanguages: function ( Language ) {
			return this.$props.languagesSettings.get( 'currentLanguage' ) !== Language &&
					this.$props.languagesSettings.get( 'term' ).hasOwnProperty( Language );
		}
	}
};
</script>

<template>
    <div id="moreContentBox">
        <div class="otherLanguages">
            <h2 class="page-title-language">{{ getLanguageNames[getTerm[currentLanguage].language ]}}</h2>
            <div class="otherLanguagesContainer">
                <h3 v-if="displayLabels"><span class="page-title-label">{{ getTerm[currentLanguage].title }}</span></h3>
                <p v-if="displayDescriptions" class="wikibase-entitytermsview-heading-description">{{ getTerm[currentLanguage].description }}</p>
                <ul class="wikibase-entitytermsview-aliases" v-if="0 < getTerm[currentLanguage].aliases.length && displayAliases">
                    <li class="listItem-extended" v-bind:key="alias" v-for="alias in getTerm[currentLanguage].aliases">{{ alias }}</li>
                </ul>
            </div>
        </div>
        <div class="otherLanguages" v-bind:key="language" v-for="language in otherLanguages" v-if="shouldDisplayInOtherLanguages(language)">
            <h2 class="page-title-language">{{ getLanguageNames[getTerm[language].language] }}</h2>
            <div  class="otherLanguagesContainer">
                <h3 v-if="displayLabels"><span class="page-title-label">{{ getTerm[language].title }}</span></h3>
                <p v-if="displayDescriptions" class="wikibase-entitytermsview-heading-description">{{ getTerm[language].description }}</p>
                <ul class="wikibase-entitytermsview-aliases" v-if="0 < getTerm[language].aliases.length && displayAliases">
                    <li class="listItem-extended" v-bind:key="alias" v-for="alias in getTerm[language].aliases">{{ alias }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    moreContentBox>div
    {
        margin-left: 0px!important;
        padding-left: 0px!important;
    }

    div.otherLanguages
    {
        margin-left: 1em;
        border-bottom-width: 1px;
        border-bottom-color: #A2A9B1;
        border-bottom-style: solid;
    }

    div.otherLanguages:last-child
    {
        border-width: 0px;
        margin-bottom: 1em;
    }

    div.otherLanguages h2
    {
        font-weight: 300;
        font-size: 0.8em;
        color: #72777D;
        margin-left: 0;
        margin-bottom: 0;
		font-family:'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans',sans-serif;
    }

    div.otherLanguages h3
    {
        font-weight: 600;
        margin-left: 0px;
        padding-bottom: 0px;
        margin-bottom: 0.5em;
        margin-top: 0;
        font-size: 0.9em;
        font-family: 'Helvetica Neue','Helvetica','Nimbus Sans L','Arial','Liberation Sans',sans-serif;
    }

    div.otherLanguagesContainer
    {
        padding-left: 0.5em;
    }

    div.otherLanguagesContainer > .wikibase-entitytermsview-heading-description,
    div.otherLanguagesContainer > .wikibase-entitytermsview-aliases
    {
        font-size: 0.9em;
        margin-left: 0;
        margin-top: 0;
        margin-bottom: 0.5em;
    }
</style>
