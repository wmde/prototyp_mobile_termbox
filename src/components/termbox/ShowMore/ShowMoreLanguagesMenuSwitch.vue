<script>
import SharedStore from '../../lib/SharedStore';
import LanguageFilter from './ShowMoreLanguagesMenuBarLanguagesFilter';
import TypeFilter from './ShowMoreLanguagesMenuBarTypeFilter';

export default {
	name: 'ShowMoreLanguagesMenuSwitch',
	components: { LanguageFilter, TypeFilter },
	props: {
		directives: Object,
		languagesSettings: Object
	},
	data: function ()
	{
		const State = new SharedStore();
		State.set( 'switch', 0 );
		return { menuSwitch: State };
	},
	computed: {
		getLanguagesSettings: function ()
		{
			return this.$props.languagesSettings;
		},
		getSwitch: function ()
		{
			return this.$data.menuSwitch;
		},
		getDirectives: function ()
		{
			return this.$props.directives;
		}
	},
	methods: {
		activateLanguageFilter: function ()
		{
			this.$data.menuSwitch.set( 'switch', -1 );
		},
		activateTypeFilter: function ()
		{
			this.$data.menuSwitch.set( 'switch', 1 );
		}
	}
};
</script>

<template>
    <div id="showMoreLanguagesMenuSwitch">
        <div v-if="0===getSwitch.get('switch')" class="showMoreLanguagesMenuFilter">
            <button @click="activateLanguageFilter()" class="showMoreLanguagesMenuLanguageFilterActivator">Show more languages</button>
            <div @click="activateTypeFilter()" class="showMoreLanguagesMenuTypeFilterActivator">
                <button><img src="../../../assets/Bars.png"/></button>
            </div>
        </div>
        <LanguageFilter v-if="-1===getSwitch.get('switch')" :languagesSettings="getLanguagesSettings" :menuSwitch="getSwitch"/>
        <TypeFilter v-if="1===getSwitch.get('switch')" :directives="getDirectives" :menuSwitch="getSwitch"/>
    </div>
</template>

<style>

.showMoreLanguagesMenuFilter
{
    height: 50px;
    background-color: #eaecf1;
    border-color: #f5f5f5;
    border-bottom-width: 2px;
    border-bottom-color: #a2a9b1;
    border-bottom-style: solid;
    width: 100%;
}

#showMoreLanguagesMenuSwitch
{
    overflow: hidden;
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

div.showMoreLanguagesMenuTypeFilterActivator
{
    display: inline-block;
    height: 45px;
    border: 0px;
    background-color: inherit;
    border-left-style: solid;
    border-left-width: 2px;
    position: relative;
    top: -50px;
    padding-right: 10px;
    padding-left: 7px;
    padding-top: 5px;
    border-left-color: #a2a9b1;
    float: right;
}

div.showMoreLanguagesMenuTypeFilterActivator > button
{
    border:0px solid;
    background: transparent;
}

div.showMoreLanguagesMenuTypeFilterActivator > button > img
{
    margin-top: 13px;
    display: inline-block;
    width: 20px;
    margin-left:7.5px;
    margin-right:7.5px;
}
</style>
