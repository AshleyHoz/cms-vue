<template>
	<div class="modal-shadow" v-show="show">
		<div class="modal">
			<div class="title">
				<slot name="title"></slot>
			</div>
			<div class="body">
				<slot name="content"></slot>
			</div>
			<div class="action">
				<button type="button" @click="$emit('close')">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['show','content'],
	}
</script>

<style>
	.modal {
		min-width: 400px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid #999999;
		text-align: center;
		background-color: white;
	}

	.modal .title {
		font-size: 16px;
		padding: 16px 0;
		border-bottom: 1px solid #999999;
	}

	.modal .body {
		padding: 20px 10px;
		font-size: 14px;
		color: #666;
		border-bottom: 1px solid #999999;
	}

	.modal .action {
		padding: 10px;
		text-align: right;
	}

	.modal .action .btn {
		padding: 6px 20px;
	}

	.modal-shadow::before {
		content: '';
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	/* 使用active 绑定 class的方法 */
	/* .modal-shadow.active {
		display: block;
	}
	.modal-shadow {
		display: none;
	} */
</style>
