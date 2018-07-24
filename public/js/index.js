new Vue({
	el:'#app',
	data:function(){
		return {
			list:[
				{
					id:1,
					name:'iphone 6',
					price:3000,
					count:1
				},
				{
					id:2,
					name:'iphone 7',
					price:6000,
					count:2
				},
				{
					id:3,
					name:'ipad',
					price:4000,
					count:2
				}
			],
			checked:[]
		}
	},
	methods:{
		/**
		 * 减少商品购买数量
		 * @param {Number} index
		 */
		handleReduce:function(index){
			if(this.list[index].count===1){
				return ;
			}else{
				this.list[index].count--;
			}
		},
		/**
		 * 增加商品购买数量
		 * @param {Number} index
		 */
		handleAdd:function(index){
			this.list[index].count++;
		},
		/**
		 * 移除商品
		 * @param {Number} index
		 */
		handleRemove:function(index){
			this.list.splice(index,1);
		},
		/**
		 * 全选
		 * @param {Object} e
		 */
		checkedAll:function(e){
			if(e.target.checked){
				for(let i=0;i<this.list.length;i++){
					if(!this.checked.includes(this.list[i].id)){
						this.checked.push(this.list[i].id);
					}
				}
			}else{
				this.checked.splice(0,this.checked.length);	
			}
		}
	},
	computed:{
		/**
		 * 计算总价格
		 */
		totalPrice:function(){
			var total=0;
			for(let i=0;i<this.list.length;i++){
				if(this.checked.includes(this.list[i].id)){
					total+=this.list[i].price*this.list[i].count;
				}
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
		}
	},
	watch:{
		/**
		 * 监听checked的值的变化，判断是否已经全选
		 */
		checked:function(){
			var flag=true;
			for(let i=0;i<this.list.length;i++){
				if(!this.checked.includes(this.list[i].id)){
					console.log(i);
					flag=false;
					break;
				}
			}
			if(flag){//全选了
				this.$refs.checkedAll.checked=true;
			}else{
				this.$refs.checkedAll.checked=false;
			}
		}
	}
});