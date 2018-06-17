<script>
import { DomHelper } from '../../lib/DomHelpers';
export default {
	name: 'showMoreLanguagesMenuTypeFilterActivator',
	props: {
		menuSwitch: Object,
		directives: Object
	},
	data: function () {
		return {
			marginTopElement: null,
			marginTop: 0,
			offset: 0,
			labels: true,
			descriptions: true,
			aliases: true
		};
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
	mounted: function () {
		document.getElementById( 'showMoreLanguagesMenuBar' ).removeAttribute( 'style' );
		this.$data.marginTopElement = document.getElementById( 'showMoreLanguagesTypeFilterMenu' );
		this.$data.labels = this.$props.directives.get( 'labels' );
		this.$data.descriptions = this.$props.directives.get( 'descriptions' );
		this.$data.aliases = this.$props.directives.get( 'aliases' );

	},
	destroyed: function () {
		document.getElementById( 'showMoreLanguagesMenuBar' ).setAttribute( 'style', 'height:54px;' );
	},
	updated: function () {
		const Differenz = this.$data.marginTop - DomHelper.getPositionY( this.$data.marginTopElement );
		const ScrollTo = this.$data.offset - Differenz;
		if ( 0 !== Differenz ) {
			if ( 0 >= ScrollTo ) {
				window.scrollTo( 0, 0 );
			} else {
				window.scrollTo( 0, ScrollTo );
			}
		}
	},
	methods: {
		doSwitch: function ( Key ) {
			this.$data.offset = window.pageYOffset;
			this.$data.marginTop = DomHelper.getPositionY( this.$data.marginTopElement );
			this.$props.directives.set( Key, !this.$props.directives.get( Key ) );
			this.$data[ Key ] = !this.$data[ Key ];
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
            <button @click="activateLanguageFilter()"
					class="showMoreLanguagesMenuLanguageFilterActivator"
			>Show more languages</button>
            <div @click="close()" id="showMoreLanguagesTypeFilterSave">
                <button><img src="../../../assets/DoneType.png" /></button>
            </div>
        </div>
        <form id="showMoreLanguagesTypeFilterMenu">
            <div @click="doLabel()">
				<input v-if="isLabeled"
						v-model="labels"
						type="checkbox"
						checked
				/>
				<input v-else
						v-model="labels"
						type="checkbox"
				/>
				<label>Label</label>
			</div>
			<div @click="doDescription">
				<input v-if="isDescribed"
						v-model="descriptions"
						type="checkbox"
						checked
				/>
				<input v-else
						v-model="descriptions"
						type="checkbox"
				/>
				<label>Description</label>
			</div>
			<div @click="doAka()">
				<input v-if="isAka"
						v-model="aliases"
						type="checkbox"
						checked
				/>
				<input v-else
						v-model="aliases"
						type="checkbox"
				/>
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
    border-bottom: 2px solid #a2a9b1;
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
