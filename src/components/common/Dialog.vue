<template>
	<div class="modal fade" id="dialogModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="modalTitle">
						{{title}}
					</h4>
				</div>
				<div class="modal-body">
					<component :is="contentView"></component>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button type="button" class="btn btn-primary">
						提交更改
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Dialog',
  components: {},
  data () {
    return {
      title: '提示',
      msg: '提示文本',
      contentView: null
    }
  },
  mounted(){
    this.$bus.$on('dialogshow', this.show);
  },
  destroy(){
  	this.$bus.$off('dialogshow', this.show);
  },
  methods: {
    show(data){
    	let modalStr = data && data.hide ? 'hide' : null;
    	this.msg = data && data.msg || this.msg;
    	this.title = data && data.title || this.title;
    	$('#dialogModal').modal(modalStr);
    }
  }
}
</script>