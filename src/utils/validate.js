import { Validator } from 'vee-validate';
const isMobile = {
    messages: {
        'zh_CN':(field, args) => { console.info(field,args);return `${field}必须是11位手机号码`},
    },
    validate: (value, args) => {
       return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
}
Validator.extend('mobile', isMobile);



