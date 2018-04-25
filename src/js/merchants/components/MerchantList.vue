<template lang="pug">
div.row.merchants

	.col-xs-12
		h6.section-merchant.major--title.ta-center-firm {{ catInfo.parent.title }} » {{ catInfo.child.title }}
		hr.fancy

	.col-lg-3.col-md-3.col-sm-6.col-xs-12.merchant-cell(v-for="(merchant, index) in merchantItems" :key="index")
		a.merchant(:href="'http://' + merchant.domain + '?utm_campaign=ZarinPalMerchant&utm_medium=banner&utm_source=ZarinPal'" target="_blank")
			figure.merch-figure(v-if="show" transition="expand" v-bind:style="{ 'border-color': colors[index] }")

				.category
					svg.svg--icon(width="24" height="24" viewBox="0 0 30 33")
						use(v-bind:xlink:href="'#'+catInfo.parent.slug" v-bind::fill="colors[index]")
					span {{ catInfo.child.title }}
						small {{ catInfo.parent.title }}
				.row
					img.picto(v-bind:src="merchant.logo" v-bind::alt="merchant.siteName" v-bind:style="{ 'background-color': colors[index] }")
					h2.titly {{ merchant.siteName | truncString }}
				p.decly {{ merchant.siteContent | truncString }}
				p.dately {{ merchant.createdAt | persian }}
				p.urly {{ merchant.domain }}

	nav.pagination
		router-link.page-link(v-if="pageInfo.currentPage - 1 > 0" tag="li" v-bind:to="{ name: 'MerchantList', params: { page: pageInfo.currentPage - 1 }}") &laquo; صفحه قبل
		router-link.page-link(v-for="n in pageInfo.lastPage" :key="n" v-if="(n < pageInfo.currentPage + 6 && n > pageInfo.currentPage - 6) && pageInfo.lastPage > pageInfo.currentPage - 1 " v-bind:class="{ 'current': pageInfo.currentPage === n }" v-bind:to="{ name: 'MerchantList', params: { page: n }}") {{ n | persian }}
		router-link.page-link(v-if="pageInfo.lastPage > pageInfo.currentPage" v-bind:to="{ name: 'MerchantList', params: { page: pageInfo.currentPage + 1 }}") صفحه بعد &raquo;
</template>

<script>
export default {
	name: 'MerchantList',
	data() {
		return {
			loading: true,
			show: true,
			colors: ['#F17105', '#3BCCFF', '#FF4C3A', '#5CA4A9', '#462255', '#94C9A9', '#7F6B7C', '#E5A532', '#1A8FE3', '#FF85C2', '#F876FF', '#FF4D63', '#3090D1', '#419D78', '#FF6B43', '#8DC63F', '#15D2AF', '#39A9DB', '#D63230', '#0fde32'],
			catInfo: null,
			merchantItems: [],
			pageInfo: [],
			catId: '',
		}
	},

	methods: {
		fetchData(cat, pageNum) {

		    let vm = this;
            axios.get(`https://www.zarinpal.com/rest/v3/merchantStatistics/webServicesList/${cat}.json?page=${pageNum}`)
                .then(function (response) {
                    vm.catInfo = response.data.catInfo;
                    vm.merchantItems = response.data.list;
                    vm.pageInfo = response.data.pageInfo;
                    vm.loading = false;
                    vm.catId = cat;

                    const nTitle = `${res.data.catInfo.parent.title} » ${res.data.catInfo.child.title}`;

                    document.title = `${nTitle} • پذیرندگان | زرین‌پال، کیف‌پول الکترونیک`;
                })
                .catch(function (error) {
                    console.log(error);
                });
		},
	},

    mounted() {
		// Get Merchant Items data
		this.fetchData(this.$route.params.cat, this.$route.params.page);
	},
    watch: {
        '$route' (to, from) {
            const page = to.params.page;
			const cat = to.params.cat;

			this.loading = true;
			this.merchantItems = '';

			this.fetchData(cat, page);
        }
    },

	filters: {
		persian(str) {
			let value = str.toString();
			const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];

			for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
				value = value.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
			}
			return value;
		},
		truncString(str) {
			const delimiter = "...";
			const overflow = false;
			let ret = str;
			const maxLength = 60;
			if (ret.length > maxLength) {
				let breakpoint = overflow ? maxLength + ret.substr(maxLength).indexOf(" ") : ret.substr(0, maxLength).lastIndexOf(" ");
				ret = ret.substr(0, breakpoint) + delimiter;
			}
			return ret;
		}
	}
}
</script>
