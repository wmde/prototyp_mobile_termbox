<script>
export default {
	name: 'showMoreLanguagesMenuTypeFilterActivator',
	props: {
		menuSwitch: Object,
		directives: Object
	},
	computed: {
		isLabeled: function () {
			return this.$props.directives.get( 'labels' );
		},
		isDescribed: function () {
			return this.$props.directives.get( 'descriptions' );
		},
		isAka: function () {
			return this.$props.directives.get( 'aliases' );
		}
	},
	methods: {
		doSwitch: function ( Key ) {
			this.$props.directives.set( Key, !this.$props.directives.get( Key ) );
		},
		doLabel: function () {
			this.doSwitch( 'labels' );
		},
		doDescription: function () {
			this.doSwitch( 'descriptions' );
		},
		doAka: function () {
			this.doSwitch( 'aliases' );
		},
		activateLanguageFilter: function () {
			this.$props.menuSwitch.set( 'switch', -1 );
		},
		close: function () {
			this.$props.menuSwitch.set( 'switch', 0 );
		}
	}
};
</script>

<template>
    <div>
        <div class="showMoreLanguagesTypeFilter">
            <button @click="activateLanguageFilter()" class="showMoreLanguagesMenuLanguageFilterActivator" >Show more languages</button>
            <div @click="close()" id="showMoreLanguagesTypeFilterSave">
                <button><img src="../../../assets/DoneType.png" /></button>
            </div>
        </div>
        <form id="showMoreLanguagesTypeFilterMenu">
            <div @click="doLabel()">
                <input v-if="isLabeled" type="checkbox" checked/>
                <input v-else id="showMoreLanguagesTypeFilterLabel" type="checkbox"/>
                <label>Label</label>
            </div>
            <div @click="doDescription">
                <input v-if="isDescribed" type="checkbox" checked/>
                <input v-else type="checkbox"/>
                <label>Description</label>
            </div>
            <div @click="doAka()">
                <input v-if="isAka" type="checkbox" checked/>
                <input v-else type="checkbox"/>
                <label>Also known as</label>
            </div>
        </form>
    </div>
</template>

<style scoped>
.showMoreLanguagesTypeFilter
{
    height: 50px;
    background-color: #c8ccd1;
    border-color: #f5f5f5;
    border-bottom-width: 2px;
    border-bottom-color: #a2a9b1;
    border-bottom-style: solid;
}

.showMoreLanguagesMenuLanguageFilterActivator
{
    color: #2a4b8d;
}

div#showMoreLanguagesTypeFilterSave > button
{
    display: inline-block;
    height: 50px;
    border: 0px;
    position: relative;
    top: -50px;
    padding-right: 16px;
    padding-left: 16px;
    border-left-color: #a2a9b1;
    background-color: #3366cc;
    float: right;
}

div#showMoreLanguagesTypeFilterSave > button > img
{
    margin-top: 4px;
    display: inline-block;
    width: 35px;
}

#showMoreLanguagesTypeFilterMenu
{
    background-color: #eaecf0;
    border-bottom: 5px solid #a2a9b1;
    padding: 0px 0px 0px 0px;
    position: relative;
}

#showMoreLanguagesTypeFilterMenu > div
{
    padding:1em;
    margin-bottom: 0px;
}

#showMoreLanguagesTypeFilterMenu > div:last-child
{
    padding-bottom: 1.5em;
}

#showMoreLanguagesTypeFilterMenu > div > label
{
    display: inline-block;
    color: #72777d;
    font-size: 1em;
}

#showMoreLanguagesTypeFilterMenu > div > input[checked]+label
{
    color:#000000 !important;
}

#showMoreLanguagesTypeFilterMenu > div > input
{
    display: inline-block;
    float: right;
    right: 35px;
    position: absolute;
    background:transparent;
	width:20px;
	height:20px;
}

#showMoreLanguagesTypeFilterMenu > div > input[checked]
{
    background:#3366cc;
}
</style>
