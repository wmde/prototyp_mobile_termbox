<script>
import Utils from "./Utils.js"

export default{
    name: 'contentBox',
    props: {
        title: String,
        id: String,
        description: String,
        hasAlias: Boolean,
        aliases: Array,
    },
}
    
</script>

<template>
    <div id="contenBox">
        <h1><span class="page-title-label">{{ title }}</span><span class="page-title-id"> {{ id }}</span></h1>
        <p class="wikibase-entitytermsview-heading-description">{{ description }}</p>
        <ul class="wikibase-entitytermsview-aliases" v-if="0 < aliases.length">
            <li class="alias in aliases">{{ alias }}</li>
        </ul>
    </div>
</template>

<style>
    
</style>
