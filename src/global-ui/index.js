import { MessageBox, Toast} from 'mint-ui';

// mint-ui
export default {
	MessageBox:MessageBox,
	alert: MessageBox.alert ,
	confirm:(str='',yes,no)=>{
		MessageBox({
			message: str,
			showCancelButton: true,
			// showConfirmButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
		}).then(action=>{
			action=='confirm' ? (yes&&yes()) : (no&&no()) ;
		})
	},
	success:( str='操作成功' , time=1000 )=>{
		Toast({
			message: str ,
			duration: time ,
			iconClass: 'icon-checkmark'
		})	
	},
	say:( str='' , time=1200 , )=>{
		Toast({
			message: str ,
            duration: time ,
            className: "toast"
		})		
	},
}