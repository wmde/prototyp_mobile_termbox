<script>
import Utils from './components/Utils.js';
import ObjectHelper from './components/ObjectHelper.js';
import { RuntimeErrorException } from './components/BaseExceptions.js';
import ContentBox from './components/ContentBox.vue'
//import MoreLanguagesBox from './components/MoreLanguages.vue'
import SharedData from './components/SharedData.js'

class CurrentTerm
{
    static Term = ''    
    static loadTerm() {
        CurrentTerm.Term = ''
        alert(Utils)    
        Utils.get( './data/Q64_data.json', CurrentTerm.onLoadTerm );
        Utils.waitUntil( CurrentTerm.termIsLoaded );
    }
    
    static onLoadTerm( Response, Error ) {
    //          Utils.debugObjectPrint( Response, 'debug' );
        if ( false === Utils.isEmpty( Error ) ) {
            throw new RuntimeErrorException( Error );
        }
            
        CurrentTerm.Term = Response;
    }
        
    static termIsLoaded() {
            return Utils.isEmpty( CurrentTerm.Term );
    }

}

export default {
	name: 'termbox',
    data: function () {
            const Return = {};
            Return.currentTerm = CurrentTerm.Term;
            Return.hasAlias = false;
            return Return;
    },
    components: { ContentBox },
    beforeCreate: function() {
        CurrentTerm.loadTerm()
        Utils.debugObjectPrint( CurrentTerm.Term, 'debug' );
    },
	mounted: function () {
	},
	methods: {
    },
    computed:{
        id: CurrentTerm.Term.id,
        title: function()
        {
            Utils.debugObjectPrint( CurrentTerm.Term, 'debug' );
            return CurrentTerm.Term.labels.de.value
        },
        description: function(){
            return CurrentTerm.Term.descriptions
        },
        hasAlias: function(){
            return 0 < CurrentTerm.Term.aliases.length
        },
        aliases: function() {
            return CurrentTerm.Term.aliases
        }
    }
};

</script>

<template>
    <div id="termbox">
        <ContentBox :title="title" :id="id" :description="description" :hasAlias="hasAlias" :aliases="aliases"/>
    </div>
</template>

<style>
#termbox {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
