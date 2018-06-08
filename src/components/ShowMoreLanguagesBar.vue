<script>
import MoreLanguagesBox from './MoreLanguagesBox';

export default{
	name: 'ShowMoreLanguagesBar',
	components: { MoreLanguagesBox },
	props: {
	    term: Object
	},
	methods: {
	    showMoreLanguages() {
			const More = document.getElementById( 'img_moreLanguages' );
			const Less = document.getElementById( 'img_lessLanguages' );
			const ContentBox = document.getElementById( 'showMoreLanguagesContent' );

			if ( 'inline' === More.style.display ) {
				Less.style.display = 'inline';
				More.style.display = 'none';
			} else {
				More.style.display = 'inline';
				Less.style.display = 'none';
			}

			ContentBox.style.display = Less;
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
        <div id="showMoreLanguagesBar_buttonField" v-on:click="showMoreLanguages">
            <button class="b_isActive">Show more languages</button><img id="img_moreLanguages" src="../assets/Arror1.png"/><img id="img_lessLanguages" src="../assets/Arror2.png"/>
        </div >
        <div id="showMoreLanguagesContent">
            <MoreLanguagesBox :term="getTerm"/>
        </div>
    </div>
</template>

<style>
#showMoreLanguagesBar
{
    margin: 50px 0px 0px 0px!important;
    padding-left: 0px!important;
    width: 100%;
}
#showMoreLanguagesBar_buttonField
{
    height: 50px;
    width: 100%;
    padding-left: 15px;
    background-color: #F8F9FA;
    border-color: #f5f5f5;
    border-width: 1px;
    border-bottom-color: #f4f4f4;
    border-style: solid;
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
    right:20px;
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
