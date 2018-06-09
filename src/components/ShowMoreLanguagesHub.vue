<script>
import MoreLanguagesBox from '../ShowMore/ShowMoreLanguagesContentBox';
import Utils from "./Utils";

export default{
	name: 'ShowMoreLanguagesHub',
	components: { MoreLanguagesBox },
	props: {
	    term: Object
	},
    data: function() {
	    return { IsScrolledIntervall: null }
    },
    created: function () {
        this.$data.IsScrolledIntervall = setInterval(this.keepButtonFieldVisible, 1)
    },
    destroyed: function() {
        clearInterval(this.$data.IsScrolledIntervall)
    },
	methods: {
	    showMoreLanguages() {
			const More = document.getElementById( 'img_lessLanguages' );
			const Less = document.getElementById( 'img_moreLanguages' );
			const ContentBox = document.getElementById( 'showMoreLanguagesContent' );

			if ( 'inline' === More.style.display ) {
				Less.style.display = 'inline';
				More.style.display = 'none';
				ContentBox.style.display = 'none';
                document.getElementById('showMoreLanguagesBar_buttonField').removeAttribute( 'class' )
			} else {
				More.style.display = 'inline';
				Less.style.display = 'none';
				ContentBox.style.display = 'block';
			}

			ContentBox.style.display = Less;
		},
        keepButtonFieldVisible()
        {
            const More = document.getElementById( 'img_moreLanguages' );
            const VisibilityCheckerNodes = document.getElementsByClassName('showMoreLanguagesBarVisibilityChecker')
            const VisibilityChecker = [this.getPositionY(VisibilityCheckerNodes[0]), this.getPositionY(VisibilityCheckerNodes[1])]
            const ButtonField = document.getElementById('showMoreLanguagesBar_buttonField')

            if( 'none' === More.style.display ) {
                if ( window.pageYOffset > VisibilityChecker[0] && this.getWindowPositionY() <= VisibilityChecker[1] )
                {
                    ButtonField.setAttribute('class', 'keepOnTheTop')
                }
                else
                {
                    ButtonField.removeAttribute( 'class' )
                }
            }
        },
        getWindowPositionY()
        {
            return window.pageYOffset+window.innerHeight
        },
        getPositionY(Element) {
            var Top = Element.offsetTop;
            var Height = Element.offsetHeight;

            while (Element.offsetParent) {
                Element = Element.offsetParent;
                Top += Element.offsetTop;
            }

            return (Top + Height);
        },
        isElementInVertical(Element) {
            var Top = Element.offsetTop;
            var Height = Element.offsetHeight;

            while(Element.offsetParent) {
                Element = Element.offsetParent;
                Top += Element.offsetTop;
            }

            return (
                window.pageYOffset <= Top &&
                (window.pageYOffset + window.innerHeight) >= (Top + Height)
            );
        },
        removeClass( Element, ElementClass )
        {
            let ElementClasses = Element.getAttribute('class')

            if( null !== ElementClasses )
            {
                ElementClass = ElementClasses.replace( ElementClass, '')
                Element.setAttribute('class', ElementClass)
                if( 0 === ElementClass.length )
                {
                    Element.removeAttribute('class')
                    return;
                }


            }
        }

	},
	computed: {
	    getTerm() {
	        return this.$props.term;
		}
	}

};

</script>

<template>
    <div id="showMoreLanguagesBar">
        <div class="showMoreLanguagesBarVisibilityChecker"></div>
        <div id="showMoreLanguagesBar_buttonField" v-on:click="showMoreLanguages">
            <button class="b_isActive">Show more languages</button><img id="img_moreLanguages" src="../assets/Arror1.png"/><img id="img_lessLanguages" src="../assets/Arror2.png"/>
        </div >
        <div id="showMoreLanguagesContent">
            <MoreLanguagesBox :term="getTerm"/>
        </div>
        <div id="showMoreLanguagesMenuBar">

        </div>
        <div class="showMoreLanguagesBarVisibilityChecker"></div>
    </div>
</template>

<style>
#showMoreLanguagesBar
{
    margin: 50px 0px 0px 0px!important;
    padding-left: 0px!important;
    width: 100%;
}

#showMoreLanguagesContent, #showMoreLanguagesBar_buttonField, .keepOnTheTop
{
    width: 100%;
    padding-left: 15px;
    background-color: #F8F9FA;
}

#showMoreLanguagesBar_buttonField, .keepOnTheTop
{
    -webkit-transition-timing-function: linear;
    height: 50px;
    border-color: #f5f5f5;
    border-width: 1px;
    border-bottom-color: #f4f4f4;
    border-style: solid;
}

.keepOnTheTop
{
    position: fixed!important;
    transition-timing-function: linear;
    top:0;

}

.keepOnTheTop>img
{
    margin-right: 13px;
    margin-top: 11px;
}

@-moz-document url-prefix() {
    .keepOnTheTop>img
    {
        margin-top: 12.5px!important;
        margin-right: 20px!important;
    }
}

button.b_isActive
{
    display: inline;
    border-style: none;
    background-color: inherit;
    margin-top: 15px;
    color: #72777D;
    position: relative;
    font-size:1em;
}

img#img_moreLanguages, img#img_lessLanguages
{
    border-style: none;
    background-color: inherit;
    margin-top: 12.5px;
    height: 25px;
    overflow: hidden;
    position:relative;
    float: right;
    margin-right:20px;
}

img#img_moreLanguages
{
    display: inline;
}

img#img_lessLanguages
{
    display: none;
}

div#showMoreLanguagesContent
{
    display: none;
}
</style>
