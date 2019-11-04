<template>
	<div class="list">
		<div class="title">Cart</div>
		<div class="content">
			<el-table :data="cart" style="width: 100%">
				<el-table-column label="序号" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="商品名称" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="数量" width="180">
					<template slot-scope="scope">
						<!-- <el-button :disabled="scope.row.num == 1" @click="reduce(scope.$index)">-</el-button>
						<el-input v-model="scope.row.num" style="width: 50px;"></el-input>
						<el-button @click="add(scope.$index)">+</el-button> -->
						<el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
					</template>
				</el-table-column>
				<el-table-column label="单价" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.price }}</span>
					</template>
				</el-table-column>
				<el-table-column label="小计" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ total(scope.row) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="del(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="txt">商品一共{{ totalNum }}件，共计花费{{ totalPrice }}元</div>
		</div>

	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	let { mapState, mapGetters, mapMutations } = createNamespacedHelpers('Cart')

	export default {
		data() {
			return {

			}
		},
		methods: {
			// add() {
			// 	this.$store.commit('addNum');
			// },
			// reduce() {
			// 	this.$store.commit('reduceNum');
			// },
			// del(data) {
			// 	this.store.commit('del')
			// },
			...mapMutations({
				// add:'addNum',
				// reduce:'reduceNum',
				del:'del',
				handleChange:'change'
			}),
			
			handleDelete(index, row) {

			},
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['totalNum', 'totalPrice', 'total']),
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width: 1250px;
		border: 1px solid #337ab7;
		border-radius: 5px;

		.title {
			font-size: 16px;
			width: 1220px;
			color: white;
			background-color: #337ab7;
			padding: 10px 15px;
		}

		.content {
			padding: 0 15px;
		}

		.item {
			font-size: 16px;
			padding: 10px 15px;
		}

		.txt {
			font-size: 16px;
			line-height: 28px;
		}
	}
</style>
