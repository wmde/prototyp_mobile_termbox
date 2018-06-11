<script>
import TermContentBox from './termbox/MainContentBox';
import ShowMoreLanguagesBar from './termbox/ShowMoreLanguagesHub';
import ObjectHelper from './lib/ObjectHelper';

export default {
	name: 'Termbox',
	props: {
		shared: Object
	},
	components: { TermContentBox, ShowMoreLanguagesBar },
	methods: {
		getCurrentLanguage: function () {
	        return this.$props.shared.get( 'currentLanguage' );
		}

	},
	computed: {
		id: function () {
			return this.$props.shared.get( 'term' )[ this.getCurrentLanguage() ].id;
		},
		title: function () {
			return this.$props.shared.get( 'term' )[ this.getCurrentLanguage() ].title;
		},
		description: function () {
			return this.$props.shared.get( 'term' )[ this.getCurrentLanguage() ].description;
		},
		aliases: function () {
			return this.$props.shared.get( 'term' )[ this.getCurrentLanguage() ].aliases;
		},
		getTerm: function () {
			return ObjectHelper.copyObj( this.$props.shared.get( 'term' ) );
		},
		hasAlias: function () {
			return 0 < this.$props.shared.get( 'term' )[ this.getCurrentLanguage() ].aliases;
		},
		getShared: function () {
			return this.$props.shared;
		}
	},
	data: function () {
		return {
		};
	}
};
</script>
<template>
<div id="termbox">
    <TermContentBox
            :title="title"
            :id="id"
            :description="description"
            :hasAlias="hasAlias"
            :aliases="aliases"
    />
    <ShowMoreLanguagesBar :shared="getShared"/>
</div>
</template>
<style scoped>
#termbox
{
    width: 100%;
    left:0;
    /*margin-left:-10px;*/
}

#termbox > div
{
    padding-left: 15px;
}
</style>
