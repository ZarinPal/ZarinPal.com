<template lang="pug">
	div.row.merchants
		div.col-lg-3.col-md-3.col-sm-6.col-xs-12(v-for="(cat, index) in catList")
			figure.cat-figure(v-if="show" transition="expand" v-bind:style="{ 'border-color': colors[index] }")
				div.head
					svg.cat-icon(width="30" height="30" viewBox="0 0 30 33")
						use(v-bind:xlink:href="'#' + cat.category.slug" v-bind:fill="colors[index]")
					div.cat-name {{ cat.category.title }}

				ul(v-for="item in cat.subCats")
					li(v-bind:id="item.slug")
						a(v-bind:href="'#/cat/'+item.publicId + '/page/1'") {{ item.title }}
</template>

<script>
export default {
	name: 'CatList',
	data() {
		return {
			loading: true,
			show: true,
			colors: ['#F17105', '#3BCCFF', '#FF4C3A', '#5CA4A9', '#462255', '#94C9A9', '#7F6B7C', '#E5A532', '#1A8FE3', '#FF85C2', '#F876FF', '#FF4D63', '#3090D1', '#419D78', '#FF6B43', '#8DC63F', '#15D2AF', '#39A9DB', '#D63230', '#0fde32'],
			catList: [],
		}
	},

	methods: {
		fetchData() {
		    let vm = this;
            axios.get('https://www.zarinpal.com/panel/frontPage/webServicesCat.json/')
                .then(function (response) {
                    vm.catList = response.data;
                    vm.loading = false;
                })
                .catch(function (error) {

                });
		}
	},

    mounted() {
        // Get Merchant Items data
		this.fetchData();
	},

	route: {
		data ({ to }) {
		    this.loading = true;
			this.fetchData();
		}
	}
}
</script>