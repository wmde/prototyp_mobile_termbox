<script>
import Utils from '../../../Utils';
import SharedStore from '../../lib/SharedStoreStatic';

export default {
	name: 'MoreLanguagesBox',
	props: {
	    term: Object,
        otherLanguages: Array
	},
	methods: {
	    isActiveOtherLanguages: function ( Language ) {
			return -1 < this.$props.otherLanguages.indexOf( Language );
		}
	}
};
</script>

<template>
    <div id="moreContentBox">
        <div class="otherLanguages" v-bind:key="mterm" v-for="mterm in term" v-if="isActiveOtherLanguages(mterm.language)">
            <h2 class="page-title-language">{{ mterm.language }}</h2>
            <div class="otherLanguagesContainer">
                <h3><span class="page-title-label">{{ mterm.title }}</span></h3>
                <p class="wikibase-entitytermsview-heading-description">{{ mterm.description }}</p>
                <ul class="wikibase-entitytermsview-aliases" v-if="0 < mterm.aliases.length">
                    <li class="listItem-extended" v-bind:key="alias" v-for="alias in mterm.aliases">{{ alias }}</li>
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
        margin-left: 15px;
        border-bottom-width: 1px;
        border-bottom-color: #A2A9B1;
        border-bottom-style: solid;
        max-width: 85%;
    }

    div.otherLanguages:last-child
    {
        border-width: 0px;
    }

    div.otherLanguages h2
    {
        font-weight: 300;
        font-size: 1em;
        color: #72777D;
        margin-left: 10px;
    }

    div.otherLanguages h3
    {
        font-weight: 600;
        margin-left: 0px;
        padding-bottom: 0px;
        margin-bottom: 0px;
        font-size: 1em;
        font-family: 'Linux Libertine','Georgia','Times',serif !important;
    }

    div.otherLanguagesContainer
    {
        padding-left: 15px;
    }

    div.otherLanguages > ul.wikibase-entitytermsview-aliases > li:last-child.listItem-extended::after
    {
        content: '';
    }

    div.otherLanguagesContainer > .wikibase-entitytermsview-heading-description, div.otherLanguagesContainer > .wikibase-entitytermsview-aliases
    {
        margin-left: 0px;
        margin-top: 15px;
    }
</style>
