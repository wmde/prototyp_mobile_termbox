<script>
import MoreLanguagesBox from './ShowMore/ShowMoreLanguagesContentBox';
import ConfigurationBox from './ShowMore/ShowMoreLanguagesMenuSwitch';
import SharedStore from '../lib/SharedStore';
import { DomHelper, DomEffects } from '../lib/DomHelpers';

export default{
	name: 'ShowMoreLanguagesHub',
	components: { MoreLanguagesBox, ConfigurationBox },
	props: {
		languagesSettings: Object
	},
	data: function () {
		const Directives = new SharedStore();
		Directives.set( 'labels', true );
		Directives.set( 'descriptions', true );
		Directives.set( 'aliases', true );
		return {
			displayDirectives: Directives
		};
	},
	mounted: function () {
		this.loadProperties();
		this.$data.IsScrolledIntervall = setInterval( this.keepButtonFieldVisible, 1 );
	},
	destroyed: function () {
		clearInterval( this.$data.IsScrolledIntervall );
	},
	methods: {
		loadProperties() {
			this.$data.TroggelField = document.getElementById( 'showMoreLanguagesBarTroggleField' );
			this.$data.MoreImage = document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' );
			this.$data.Repositioning = null;
			this.$data.VisibilityCheckerNodes = document.getElementsByClassName( 'showMoreLanguagesBarVisibilityChecker' );
			this.$data.ContentBox = document.getElementById( 'showMoreLanguagesBox' );
			this.$data.IsScrolledIntervall = null;
			this.$data.DomEffects = new DomEffects(
				this.$data.TroggelField,
				this.$data.VisibilityCheckerNodes,
				null,
				[ 'keepOnTheTop' ]
			);
		},
		showMoreLanguages() {
			const More = document.getElementById( 'showMoreLanguagesBarTroggleFieldLessImage' );

			if ( 'inline' === More.style.display ) {
				this.$data.MoreImage.style.display = 'inline';
				More.style.display = 'none';
				this.goBackToStartPositionTroggleField();
			} else {
				More.style.display = 'inline';
				this.$data.MoreImage.style.display = 'none';
				DomHelper.addClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
			}
		},
		keepButtonFieldVisible() { // it become a watchdog...I should rename it

			if ( 'none' === this.$data.MoreImage.style.display ) {
				this.$data.DomEffects.sticky();
			}
		},
		goBackToStartPositionTroggleField() {
			let Scroll, Shrink;
			this.$data.TroggelField.removeAttribute( 'class' );
			if ( 0 !== window.pageYOffset ) {
				Scroll = DomEffects.scrollToMinusY( 0, this.scrollHook );
				Shrink = DomEffects.shrink( this.$data.ContentBox, 0, window.innerWidth );
				if ( false === Scroll || false === Shrink ) {
					this.$data.Repositioning = setTimeout( this.goBackToStartPositionTroggleField, 50 );
				} else {
					clearTimeout( this.$data.Repositioning );
					this.$data.Repositioning = null;
					DomHelper.removeClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
					this.$data.ContentBox.removeAttribute( 'style' );
					this.$data.TroggelField.removeAttribute( 'style' );

				}
			} else {
				DomHelper.removeClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
				this.$data.ContentBox.removeAttribute( 'style' );
			}
		},
		scrollHook() {
			this.$data.TroggelField.removeAttribute( 'class' );
		}
	},
	computed: {
		getLanguagesSettings() {
			return this.$props.languagesSettings;
		},
		getDirectives() {
			return this.$data.displayDirectives;
		}
	}
};

</script>

<template>
    <div id="showMoreLanguagesHub">
        <div class="showMoreLanguagesBarVisibilityChecker"></div>
        <div id="showMoreLanguagesBarTroggleField" v-on:click="showMoreLanguages">
            <button class="showMoreLanguagesButtonIsActive">In other languages</button>
            <img id="showMoreLanguagesBarTroggleFieldMoreImage" src="../../assets/Arror1.png"/>
            <img id="showMoreLanguagesBarTroggleFieldLessImage" src="../../assets/Arror2.png"/>
        </div>
        <div id="showMoreLanguagesBox" class="showMoreLanguagesContentInactive">
            <div id="showMoreLanguagesContent">
                <MoreLanguagesBox :languagesSettings="getLanguagesSettings" :directives="getDirectives" />
            </div>
            <div id="showMoreLanguagesMenuBar" style="height:54px;">
                <ConfigurationBox :languagesSettings="getLanguagesSettings" :directives="getDirectives" />
            </div>
        </div>
        <div class="showMoreLanguagesBarVisibilityChecker"></div>
    </div>
</template>

<style scoped>
#showMoreLanguagesMenuBar
{
	max-width: 100vw;
	overflow: hidden;
}
#showMoreLanguagesHub
{
    margin: 1em 0 0 0!important;
    padding-left: 0px!important;
    /*width: 102.5%;*/
    width: 100%;
    background-color: #F8F9FA;
}

#showMoreLanguagesContent, #showMoreLanguagesBarTroggleField, .keepOnTheTop
{
    padding-left: 0.5em;
    padding-right: 15px;
}

#showMoreLanguagesBarTroggleField, .keepOnTheTop
{
    height: 50px;
    border-color: #f5f5f5;
    border-width: 1px;
    border-bottom-color: #f4f4f4;
    border-style: solid;
    padding-right: 4%!important;
}

.keepOnTheTop
{
    z-index:3;
    position: absolute!important;
    opacity: 0.9;
    background-color: #F8F9FA;
    top:0;
    /*width: 85.4% ;*/
}

.keepOnTheTop>img
{
    margin-right: 13px;
    margin-top: 11px;
}

@-moz-document url-prefix()
{
    .keepOnTheTop>img
    {
        margin-top: 12.5px!important;
        margin-right: 20px!important;
    }
}

button.showMoreLanguagesButtonIsActive
{
    display: inline;
    border-style: none;
    background-color: inherit;
    margin-top: 15px;
    color: #72777D;
    position: relative;
    font-size:1em;
}

img#showMoreLanguagesBarTroggleFieldMoreImage, img#showMoreLanguagesBarTroggleFieldLessImage
{
    border-style: none;
    background-color: inherit;
    margin-top: 20px;
    height: 12.5px;
    overflow: hidden;
    position:relative;
    float: right;
    margin-right:20px;
}

img#showMoreLanguagesBarTroggleFieldMoreImage
{
    display: inline;
}

img#showMoreLanguagesBarTroggleFieldLessImage
{
    display: none;
}

div.showMoreLanguagesContentInactive
{
    display: none;
}

div.showMoreLanguagesContentActive
{
    display: block;
}

</style>
