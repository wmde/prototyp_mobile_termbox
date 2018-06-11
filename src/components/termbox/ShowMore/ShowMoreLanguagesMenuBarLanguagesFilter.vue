<script>
export default {
	name: 'ShowMoreLanguagesMenuBarLanguagesFilter',
	props: {
		languagesSettings: Object,
		menuSwitch: Object
	},
	data: function () {
		return { lastPosition: 0 };
	},
	mounted: function () {

		this.$data.lastPosition = window.window.pageYOffset;
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).style.display = 'none'
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).style.display = 'inline';
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).style.display = 'none';
		document.getElementById( 'termbox' ).setAttribute( 'style', 'overflow: hidden!important; height: 0px!important;' );
		window.scrollTo( 0, 0 );
	},
	beforeDestroy: function () {
		document.getElementById( 'showMoreLanguagesBarTroggleField' ).style.display = 'block'
		document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' ).style.display = 'none';
		document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' ).style.display = 'inline';
		document.getElementById( 'termbox' ).removeAttribute( 'style' );
		window.scrollTo( 0, this.$data.lastPosition );
	},
	computed: {
		getLanguages() {
			return this.$props.languagesSettings.get( 'otherLanguages' );
		},
		getPossibleLanguages() {
			return this.$props.languagesSettings.get( 'possibleLanguages' );
		}
	},
	methods: {
		isInActiveLanguage: function ( Language ) {
        	return -1 === this.$props.languagesSettings.get( 'otherLanguages' ).indexOf( Language );
		},
		close: function () {
			this.$props.menuSwitch.set( 'switch', 0 );
		},
		activateTypeFilter: function () {
			this.$props.menuSwitch.set( 'switch', 1 );
		},
		selectLanguage: function ( Language ) {
			this.$props.languagesSettings.get( 'otherLanguages' ).push( Language );
			this.$forceUpdate();
		},
		unSelectLanguage: function ( Language ) {
			if ( 1 < this.$props.languagesSettings.get( 'otherLanguages' ).length ) {
            	this.$props.languagesSettings.get( 'otherLanguages' ).splice(
					this.$props.languagesSettings.get( 'otherLanguages' ).indexOf( Language ),
					1
				);
				this.$forceUpdate();
			}
		}
	}
};
</script>

<template>
    <div id="showMoreLanguagesLanguagesFilterBox">
        <div id="showMoreLanguagesActiveLanguages">
            <span v-bind:key="language" v-for="language in getLanguages">{{language}}</span>
        </div>
        <div class="showMoreLanguagesLanguagesFilter">
            <button @click="close()"
                    class="showMoreLanguagesMenuLanguageFilterDone" >Remember selected languages</button>
            <div @click="activateTypeFilter()"
                    class="showMoreLanguagesMenuTypeFilterActivator">
                <button><img src="../../../assets/Bars.png" /></button>
            </div>
        </div>
        <form id="showMoreLanguagesLanguagesFilterMenu">
            <div id="showMoreLanguagesSearchBar">
            </div>
            <div id="showMoreLanguagesLanguagesSelection">
                <div v-if="1 === getLanguages.length" class="showMoreLanguagesLanguagesActiveLanguage">
                    <input disabled checked type="checkbox"/>
                    <label>{{getLanguages[0]}}</label>
                </div>
                <div v-else class="showMoreLanguagesLanguagesActiveLanguage"
                     v-bind:key="language"
                     v-for="language in getLanguages"
                     @click="unSelectLanguage(language)">
                    <input checked type="checkbox"/>
                    <label>{{language}}</label>
                </div>
                <div class="showMoreLanguagesLanguagesInActiveLanguage"
                     v-if="isInActiveLanguage(language)"
                     v-bind:key="language"
                     v-for="language in getPossibleLanguages"
                     @click="selectLanguage(language)" >
                    <input type="checkbox"/>
                    <label>{{language}}</label>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
#showMoreLanguagesLanguagesFilterBox
{
    position: absolute;
    top:0;
    width: 100%;
}

.showMoreLanguagesLanguagesFilter
{
    height: 50px;
    background-color: #3366cc;
    border-color: #f5f5f5;
    border-bottom-width: 2px;
    border-bottom-color: #a2a9b1;
    border-bottom-style: solid;
}

.showMoreLanguagesMenuLanguageFilterDone
{
    background-color: #3366cc;
    color: #ffffff;
    display: inline;
    border-style: none;
    padding-top: 3px;
    padding-left: 15px;
    font-size:1em;
    width: 100%;
    height: 50px;
}

.showMoreLanguagesLanguagesFilter > div
{
    background-color: #c8ccd1;
    border-left-width: 0px;
}

.showMoreLanguagesLanguagesFilter > div > img
{
    padding-left: 8.5px;
    padding-right: 8.5px;
}

#showMoreLanguagesActiveLanguages
{
    text-align: left;
    background-color: #f8f9fa;
    color: #696d71;
    padding-top: 12.5px;
    margin-bottom: 12.5px;
    width: 90%;
    margin-left: 5%;
    padding-right: 5%;
    line-height: 1.5;
}

#showMoreLanguagesActiveLanguages > span
{
    display: inline-block;
    margin-left: 30px;
}

#showMoreLanguagesActiveLanguages
{
    display: inline-block;
    margin-left: 0px!important;
}

#showMoreLanguagesLanguagesFilterMenu
{
    width: 100%;
    background-color:#eaecf0;
    color: #7a7e84;
}

#showMoreLanguagesLanguagesSelection > div
{
    padding: 30px 0px 0px 30px;
    margin-bottom: 0px;
}

#showMoreLanguagesLanguagesSelection > div:last-child
{
    padding-bottom: 30px;
}

#showMoreLanguagesLanguagesSelection > div > label
{
    display: inline-block;
    color: #72777d;
    font-size: 1.3em;
}

#showMoreLanguagesLanguagesSelection > div > input[checked]+label
{
    color:#000000 !important;
}

#showMoreLanguagesLanguagesSelection > div > input[disabled]+label
{
    color:#3366cc !important;
}

#showMoreLanguagesLanguagesSelection > div > input
{
    display: inline-block;
    float: right;
    right: 35px;
    position: absolute;
    background:transparent;
}

#showMoreLanguagesLanguagesSelection > div > input[checked]
{
    background:#3366cc;
}
</style>
