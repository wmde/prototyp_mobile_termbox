<template>
    <div id="contenBox">
        <h1><span class="page-title-label"></span><span class="page-title-id"></span></h1>
        <p class="wikibase-entitytermsview-heading-description"></p>
        <ul class="wikibase-entitytermsview-aliases" v-if="hasAlias">
            <li class="alias in aliases">{{ alias }}</li>
        </ul>
    </div>    
</template>

<script>
export default{
    name: 'contentBox'
}
    
</script>

<style>
    
</style>
