<script>
import SharedStore from '../../lib/SharedStore';
import LanguageFilter from './ShowMoreLanguagesMenuBarLanguagesFilter';
import TypeFilter from './ShowMoreLanguagesMenuBarTypeFilter';

export default {
	name: 'ShowMoreLanguagesMenuSwitch',
	components: { LanguageFilter, TypeFilter },
	props: {
		directives: Object
	},
	data: function () {
    	const State = new SharedStore();
		State.set( 'switch', 0 );
		return { menuSwitch: State };
	},
	computed: {
		getSwitch: function () {
			return this.$data.menuSwitch;
		},
		getDirectives: function () {
			return this.$props.directives;
		}
	},
	methods: {
		activateLanguageFilter: function () {
			this.$data.menuSwitch.set( 'switch', -1 );
		},
		activateTypeFilter: function () {
			this.$data.menuSwitch.set( 'switch', 1 );
		}
	}
};
</script>

<template>
    <div id="showMoreLanguagesMenuSwitch">
        <div v-if="0===getSwitch.get('switch')" class="showMoreLanguagesMenuFilter">
            <button @click="activateLanguageFilter()" class="showMoreLanguagesMenuLanguageFilterActivator">show more languages</button>
            <button @click="activateTypeFilter()" id="showMoreLanguagesMenuTypeFilterActivator">
                <img src="../../../assets/Bars.png"/>
            </button>
        </div>
        <LanguageFilter v-if="-1===getSwitch.get('switch')" :menuSwitch="getSwitch"/>
        <TypeFilter v-if="1===getSwitch.get('switch')" :directives="getDirectives" :menuSwitch="getSwitch"/>
    </div>
</template>

<style>
#showMoreLanguagesMenuSwitch
{
    height: 50px;
    background-color: #eaecf1;
    border-color: #f5f5f5;
    border-bottom-width: 2px;
    border-bottom-color: #a2a9b1;
    border-bottom-style: solid;
    width: 100%;
}

button.showMoreLanguagesMenuLanguageFilterActivator
{
    display: inline;
    border-style: none;
    background-color: inherit;
    color: #425f9a;
    padding-top: 3px;
    padding-left: 30px;
    font-size:1em;
    width: 100%;
    height: 50px;
}

button#showMoreLanguagesMenuTypeFilterActivator
{
    display: inline-block;
    height: 50px;
    border: 0px;
    background-color: inherit;
    border-left-style: solid;
    border-left-width: 2px;
    position: relative;
    top: -50px;
    padding-right: 15px;
    padding-left: 15px;
    border-left-color: #a2a9b1;
    float: right;
}

button#showMoreLanguagesMenuTypeFilterActivator > img
{
    margin-top: 8px;
    display: inline-block;
    width: 35px;
}
</style>
