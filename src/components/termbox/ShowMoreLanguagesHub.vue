<script>
import MoreLanguagesBox from './ShowMore/ShowMoreLanguagesContentBox';
import ConfigurationBox from './ShowMore/ShowMoreLanguagesMenuSwitch';
import SharedStore from '../lib/SharedStore';
import Utils from '../../Utils';
import StringHelper from '../lib/StringHelper';
import { TypeErrorException } from '../lib/BaseExceptions';

const ErrorMessages = {
	INVALID_ELEMENT_CLASS: 'Expected non empty string as parameter got {}.'
};

export default{
	name: 'ShowMoreLanguagesHub',
	components: { MoreLanguagesBox, ConfigurationBox },
	props: {
	    shared: Object
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
			this.$data.TroggleFieldStartPosition = this.getPositionY( document.getElementById( 'showMoreLanguagesBarTroggleField' ) );
			this.$data.TroggelField = document.getElementById( 'showMoreLanguagesBarTroggleField' );
			this.$data.MoreImage = document.getElementById( 'showMoreLanguagesBarTroggleFieldMoreImage' );
			this.$data.Repositioning = null;
			this.$data.VisibilityCheckerNodes = document.getElementsByClassName( 'showMoreLanguagesBarVisibilityChecker' );
			this.$data.ContentBox = document.getElementById( 'showMoreLanguagesBox' );
			this.$data.IsScrolledIntervall = null;
            this.$data.WindowWidth = window.innerWidth
			this.$data.TroggleWidth = this.computeWidth(this.$data.TroggelField)
        },
        computeWidth( Element ){
			let PaddingX = parseInt(window.getComputedStyle(Element, null).getPropertyValue('padding-left').replace('px', ''))
			PaddingX += parseInt(window.getComputedStyle(Element, null).getPropertyValue('padding-right').replace('px', ''))
			PaddingX += parseInt(window.getComputedStyle(Element, null).getPropertyValue('border-right-width').replace('px', ''))
			PaddingX += parseInt(window.getComputedStyle(Element, null).getPropertyValue('border-left-width').replace('px', ''))
            return Element.offsetWidth-PaddingX
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
				this.addClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
			}
		},
        resize(){
			this.$data.TroggelField.removeAttribute( 'class' );
			this.$data.TroggelField.removeAttribute( 'style' );
			this.$data.WindowWidth = window.innerWidth
            this.$data.TroggleWidth = this.computeWidth(this.$data.TroggelField)
        },
		keepButtonFieldVisible() {
			const VisibilityChecker = [
				this.getPositionY( this.$data.VisibilityCheckerNodes[ 0 ] ),
				this.getPositionY( this.$data.VisibilityCheckerNodes[ 1 ] )
			];

			if ( 'none' === this.$data.MoreImage.style.display ) {
				if( window.innerWidth !== this.$data.WindowWidth )
				{
					this.resize()
				}

				if (
					( window.pageYOffset > VisibilityChecker[ 0 ] && this.getWindowPositionY() <= VisibilityChecker[ 1 ] ) ||
                    true === this.isElementInVertical( this.$data.VisibilityCheckerNodes[ 1 ] )
				) {
					if ( window.pageYOffset > VisibilityChecker[ 0 ] ) {

						this.$data.TroggelField.setAttribute( 'class', 'keepOnTheTop' );
						this.$data.TroggelField.setAttribute( 'style', `width:${this.$data.TroggleWidth}px`);
						this.$data.TroggelField.style.top = `${window.pageYOffset }px`;
						/*this.$data.TroggelField.style.width = `${window.innerWidth*this.$data.TroggleWidth}px!important`*/
					}
					else {
						this.$data.TroggelField.removeAttribute( 'class' );
						this.$data.TroggelField.removeAttribute( 'style' );
                    }
				} else {
					this.$data.TroggelField.removeAttribute( 'class' );
					this.$data.TroggelField.removeAttribute( 'style' );
				}
			}
		},
		getWindowPositionY() {
			return window.pageYOffset + window.innerHeight;
		},
		getPositionY( Element ) {
			let Top = Element.offsetTop;
			const Height = Element.offsetHeight;

			while ( Element.offsetParent ) {
				Element = Element.offsetParent;
				Top += Element.offsetTop;
			}

			return ( Top + Height );
		},
		isElementInVertical( Element ) {
			let Top = Element.offsetTop;
			const Height = Element.offsetHeight;
			while ( Element.offsetParent ) {
				Element = Element.offsetParent;
				Top += Element.offsetTop;
			}
			return (
				window.pageYOffset <= Top &&
                ( window.pageYOffset + window.innerHeight ) >= ( Top + Height )
			);
		},
		removeClass( Element, ElementClass ) {
			const ElementClasses = Element.getAttribute( 'class' );
			if ( 'string' !== typeof ElementClass || 0 === ElementClass.length ) {
				throw new TypeErrorException( StringHelper.format( ErrorMessages.INVALID_ELEMENT_CLASS, typeof ElementClass ) );
			}
			if ( null !== ElementClasses ) {
				ElementClass = ElementClasses.replace( ElementClass, '' ).trim();
				Element.setAttribute( 'class', ElementClass );
				if ( 0 === ElementClass.length ) {
					Element.removeAttribute( 'class' );
					return;
				}
			}
		},
		addClass( Element, ElementClass ) {
			const ElementClasses = Element.getAttribute( 'class' );
			if ( 'string' !== typeof ElementClass || 0 === ElementClass.length ) {
				throw new TypeErrorException( StringHelper.format( ErrorMessages.INVALID_ELEMENT_CLASS, typeof ElementClass ) );
			}
			if ( true !== Utils.isEmpty( ElementClasses ) ) {
				ElementClass = `${ElementClasses } ${ ElementClass}`;
				Element.setAttribute( 'class', ElementClass );
			} else {
				Element.setAttribute( 'class', ElementClass );
			}
		},
		goBackToStartPositionTroggleField() {
			let Scroll, Shrink;
			this.$data.TroggelField.removeAttribute( 'class' );
			if ( this.$data.TroggleFieldStartPosition < this.getPositionY( this.$data.TroggelField ) ) {
				Scroll = this.scrollUp();
				Shrink = this.shrinkContentBox();

				if ( false === Scroll || false === Shrink ) {
					this.$data.Repositioning = setTimeout( this.goBackToStartPositionTroggleField, 50 );
				} else {
					clearTimeout( this.$data.Repositioning );
					this.$data.Repositioning = null;
					this.removeClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
					this.$data.ContentBox.removeAttribute( 'style' );
					this.$data.TroggelField.removeAttribute( 'style' );

				}
			} else {
				this.removeClass( this.$data.ContentBox, 'showMoreLanguagesContentActive' );
				this.$data.ContentBox.removeAttribute( 'style' );
			}
		},
		scrollUp() {
			let ScrollTo;
			if ( 0 < window.pageYOffset ) {
				if ( 1 < window.pageYOffset ) {
					ScrollTo = window.pageYOffset >> 1;
					window.scrollTo( 0, ScrollTo );
					return false;
				} else {
					this.$data.TroggelField.removeAttribute( 'class' );
					window.scrollTo( 0, 0 );
					return true;
				}
			} else {
				return true;
			}
		},
		shrinkContentBox() {
			if ( 0 < this.$data.ContentBox.offsetHeight ) {
				this.$data.ContentBox.style.overflow = 'hidden';
				if ( window.innerHeight <= this.$data.ContentBox.offsetHeight ) {
					if ( 1 & window.innerHeight ) {
						this.$data.ContentBox.style.height = `${window.innerHeight - 1 }px`;
					} else {
						this.$data.ContentBox.style.height = `${window.innerHeight }px`;
					}
				}

				if ( 1 < this.$data.ContentBox.offsetHeight ) {
					this.$data.ContentBox.style.height = `${this.$data.ContentBox.offsetHeight >> 1 }px`;
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	},
	computed: {
	    getShared() {
	        return this.$props.shared;
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
            <button class="showMoreLanguagesButtonIsActive">other languages</button>
            <img id="showMoreLanguagesBarTroggleFieldMoreImage" src="../../assets/Arror1.png"/>
            <img id="showMoreLanguagesBarTroggleFieldLessImage" src="../../assets/Arror2.png"/>
        </div>
        <div id="showMoreLanguagesBox" class="showMoreLanguagesContentInactive">
            <div id="showMoreLanguagesContent">
                <MoreLanguagesBox :shared="getShared" :directives="getDirectives" />
            </div>
            <div id="showMoreLanguagesMenuBar">
                <ConfigurationBox :directives="getDirectives" />
            </div>
        </div>
        <div class="showMoreLanguagesBarVisibilityChecker"></div>
    </div>
</template>

<style scoped>
#showMoreLanguagesHub
{
    margin: 50px 0px 0px 0px!important;
    padding-left: 0px!important;
    /*width: 102.5%;*/
    width: 100%;
    background-color: #F8F9FA;
}

#showMoreLanguagesContent, #showMoreLanguagesBarTroggleField, .keepOnTheTop
{
    padding-left: 30px;
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
