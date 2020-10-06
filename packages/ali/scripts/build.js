// 或者const alipaydev = require('alipay-dev')
import alipaydev from 'alipay-dev'
alipaydev.setConfig({
    toolId: '',
    privateKey: '',
})
const previewResult = await alipaydev.miniPreview({
    project: '/code/mini/path',
    appId: '2019012963164448',
    page: 'page/shop/detail?id=10&from=name'
})
const uploadResult = await alipaydev.miniUpload({
    project: '/code/mini/path',
    appId: '2019012963164448',
    clientType: 'alipay',
    experience: true,
    onProgressUpdate(info) {
        const { status, data } = info
        console.log(status, data)
    }
})
module.exports = {previewResult,uploadResult}