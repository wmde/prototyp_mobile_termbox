<script>
export default{
	name: 'contentBox',
	props: {
		title: String,
		id: String,
		description: String,
		hasAlias: Boolean,
		aliases: Array
	}
};

</script>

<template>
    <div id="contentBox">
        <h1><span class="page-title-id">({{ id }})</span><span class="page-title-label">{{ title }}</span></h1>
        <p class="wikibase-entitytermsview-heading-description">{{ description }}</p>
        <ul class="wikibase-entitytermsview-aliases" v-if="0 < aliases.length">
            <li class="listItem-extended" v-bind:key="alias" v-for="alias in aliases">{{ alias }}</li>
        </ul>
    </div>
</template>

<style>
    .page-title-id
    {
        color: #72777D;
        display: block;
        font-size:0.7em;
        font-weight: 600;
    }
    .page-title-label
    {
        font-size:1.2em;
        padding-right: 0.5em;
    }

    .wikibase-entitytermsview-heading-description, .wikibase-entitytermsview-aliases
    {
        margin-left: 30px;
        margin-top: 15px;
		padding-right: 10px;
	}

    .wikibase-entitytermsview-aliases > *
    {
        color: #72777D;
    }

    ul.wikibase-entitytermsview-aliases
    {
        list-style-type: none;
        padding: 0px 0px 0px 0px;
    }

    ul.wikibase-entitytermsview-aliases > li
    {
        display: inline-block;
    }

    ul.wikibase-entitytermsview-aliases > li.listItem-extended::after
    {
        content: ' |';
        padding-right: 5px;
    }

    ul.wikibase-entitytermsview-aliases > li:last-child.listItem-extended::after
    {
        content: '';
    }

</style>
