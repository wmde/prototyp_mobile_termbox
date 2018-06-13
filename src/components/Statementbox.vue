<script>
/*eslint-disable */
export default {
	name: 'Statementbox',
	props: {},
	components: {},
	methods: {
		getStatementGroupHtml: function ( PropertyId ) {
			// Each statement group was pulled directly from wikidata mobile web view html (with some elements removed)
			// 2 simple statements
			if ( PropertyId == 'P361' ) {
				return "<div class=\"wikibase-statementgroupview-property\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementgroupview-property-label\" dir=\"auto\"><a title=\"Property:P361\" href=\"/wiki/Property:P361\">part of</a></div>\n" +
					"\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t<div class=\"wikibase-statementlistview\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementlistview-listview\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview wikibase-statement-Q64$e963b715-4154-5dad-8474-e3c0ffd64945 wb-normal\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-c25c70e9f42ad8fa94ec6304621e1061fa8ede5e\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q648102\" href=\"/wiki/Q648102\">Berlin/Brandenburg Metropolitan Region</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$2ffffad0-4008-dc30-a1a3-b61d3b43b2de wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-893b4917dfc97fac3dc660a245e719207d29fdd3\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q15781847\" href=\"/wiki/Q15781847\">agglomeration of Berlin</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t</div>";
			}
			// 1 statement with a reference
			if ( PropertyId == 'P571' ) {
				return "<div class=\"wikibase-statementgroupview-property\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementgroupview-property-label\" dir=\"auto\"><a title=\"Property:P571\" href=\"/wiki/Property:P571\">inception</a></div>\n" +
					"\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t<div class=\"wikibase-statementlistview\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementlistview-listview\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview wikibase-statement-Q64$E3806EC8-210D-4380-BCF7-B05592E5555B wb-normal\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-1eeaf7eed0e2cf10974a84d02b1dcdd1e77f177f\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\">1237</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">1 reference</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references wikibase-initially-collapsed\"><div class=\"wikibase-listview\"><div class=\"wikibase-referenceview wikibase-referenceview-a9980e823c98f6dd9b7c8d4ca28319c510b4250a\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-referenceview-heading\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-referenceview-listview\"><div class=\"wikibase-snaklistview\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snaklistview-listview\"><div class=\"wikibase-snakview wikibase-snakview-9bffff9e0b5a99f93d68814b2c1768fa50885283\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"><a title=\"Property:P854\" href=\"/wiki/Property:P854\">reference URL</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a rel=\"nofollow\" class=\"external free\" href=\"https://www.berlin.de/berlin-im-ueberblick/geschichte/die-mittelalterliche-handelsstadt/\">https://www.berlin.de/berlin-im-ueberblick/geschichte/die-mittelalterliche-handelsstadt/</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div></div></div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t</div>";
			}
			// a larger group of statements
			if ( PropertyId == 'P1367' ) {
				return "<div class=\"wikibase-statementgroupview-property\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementgroupview-property-label\" dir=\"auto\"><a title=\"Property:P1376\" href=\"/wiki/Property:P1376\">capital of</a></div>\n" +
					"\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t<div class=\"wikibase-statementlistview\">\n" +
					"\t\t\t\t\t\t<div class=\"wikibase-statementlistview-listview\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview wikibase-statement-Q64$43CCD3D6-F52E-4742-B0E3-BCA671B69D2C wb-preferred\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-preferred\" title=\"Preferred rank\"></span>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-60f5e7dcc4ed96d177a691643f0d914e8c0b2102\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q183\" href=\"/wiki/Q183\">Germany</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">1 reference</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references wikibase-initially-collapsed\"><div class=\"wikibase-listview\"><div class=\"wikibase-referenceview wikibase-referenceview-05890ab5086b34c28bd1707bfa6432bf270f3e9c\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-referenceview-heading\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-referenceview-listview\"><div class=\"wikibase-snaklistview\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snaklistview-listview\"><div class=\"wikibase-snakview wikibase-snakview-7682bad24611b7a308053ee20d4808ebf02d563f\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"><a title=\"Property:P248\" href=\"/wiki/Property:P248\">stated in</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q451546\" href=\"/wiki/Q451546\">Einigungsvertrag</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div><div class=\"wikibase-snaklistview\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snaklistview-listview\"><div class=\"wikibase-snakview wikibase-snakview-0ff3f4a0d80d8d5f66857b80dfe359dbc1eb2729\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"><a title=\"Property:P958\" href=\"/wiki/Property:P958\">section, verse, or paragraph</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\">Artikel 2 (1)</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div></div></div>\n" +
					"\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$5AEF9E21-96BB-444D-A53E-5888B2469AC6 wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-fc4e5ca1c916506f9d52570d74a8630e61bf9cce\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q7318\" href=\"/wiki/Q7318\">Nazi Germany</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$646047ED-3B4F-4AB7-BAD4-7EF9B81B7BCD wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-27a3b8ab11677ee2ab2b66fdc1549ad8e0cef3c2\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q27306\" href=\"/wiki/Q27306\">Kingdom of Prussia</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$166D612D-B270-4F14-BBE1-584540BE46F8 wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-d92a005894d78a9415c68242701a209b8791ad81\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q41304\" href=\"/wiki/Q41304\">Weimar Republic</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$45C51BF2-C595-49A7-981E-78709BE1FB6E wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-1db39b0928b0db2c7b30c33a7ae87303b6b71b0d\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q157367\" href=\"/wiki/Q157367\">Brandenburg-Prussia</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$A19006DC-B074-4761-AE71-FC0474066DFF wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-8167091b208458b85f9447d4c807e557e8b86742\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q161036\" href=\"/wiki/Q161036\">Free State of Prussia</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$84B41B39-3DE3-4DDB-A6F1-CE53C75C035B wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-84265cd879b385ffce0bbf671e36996dd77a19c6\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q2415901\" href=\"/wiki/Q2415901\">Allied-occupied Germany</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t\t\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div><div class=\"wikibase-statementview wikibase-statement-Q64$252ca848-443e-21b3-f2c1-39230a37ac0d wb-normal\">\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-rankselector\"><div class=\"wikibase-rankselector ui-state-disabled\">\n" +
					"\t\t\t\t\t\t\t\t<span class=\"ui-icon ui-icon-rankselector wikibase-rankselector-normal\" title=\"Normal rank\"></span>\n" +
					"\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-mainsnak\" dir=\"auto\"><div class=\"wikibase-snakview wikibase-snakview-6746459784a683398d08a5afddbd6115c1cf1696\">\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property-container\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-property\" dir=\"auto\"></div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value-container\" dir=\"auto\">\n" +
					"\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-body\">\n" +
					"\t\t\t\t\t\t\t\t\t\t\t<div class=\"wikibase-snakview-value wikibase-snakview-variation-valuesnak\"><a title=\"Q43287\" href=\"/wiki/Q43287\">German Empire</a></div>\n" +
					"\t\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t\t</div></div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-container\">\n" +
					"\t\t\t\t\t\t\t\t<div class=\"wikibase-statementview-references-heading\">0 references</div>\n" +
					"\t\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t\t</div>\n" +
					"\t\t\t\t\t</div>";
			}
		}
	},
	computed: {}
};
</script>
<template>
	<div id="statementbox">

		<h2 class="wb-section-heading section-heading wikibase-statements" dir="auto"><span class="mw-headline" id="claims">Statements</span></h2>
		<div class="wikibase-statementgrouplistview">
			<div class="wikibase-listview">
				<div class="wikibase-statementgroupview" id="P361" v-html="getStatementGroupHtml('P361')"></div>
				<div class="wikibase-statementgroupview" id="P571" v-html="getStatementGroupHtml('P571')"></div>
				<div class="wikibase-statementgroupview" id="P1376" v-html="getStatementGroupHtml('P1367')"></div>
			</div>
		</div>
	</div>
</template>
<style scoped>

	/* NOTE: You'll find the rest of the style for this statementbox in index... */

	#statementbox
	{
		width: 100%;
		left:0;
		/* margin-left:-10px;*/
		padding-top: 10px;
	}

	#statementbox > div
	{
		padding-left: 15px;
	}

</style>
