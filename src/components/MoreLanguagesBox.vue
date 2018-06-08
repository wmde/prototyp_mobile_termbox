<template>
    <div id="moreContentBox">
        <h1><span class="page-title-id"> ({{ id }})</span> <span class="page-title-label">{{ title }}</span></h1>
        <p class="wikibase-entitytermsview-heading-description">{{ description }}</p>
        <ul class="wikibase-entitytermsview-aliases" v-if="0 < aliases.length">
            <li class="listItem-extended" v-bind:key="alias" v-for="alias in aliases">{{ alias }}</li>
        </ul>
    </div>
</template>

<script>
export default {
	name: 'MoreLanguagesBox'
};
</script>

<style scoped>

</style>
