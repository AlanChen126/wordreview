//将文本内容复制到剪贴板
function copy2Clipboard(content, idN) {
    // var input = document.createElement('TEXTAREA');
    var input = document.getElementById(idN);
    input.value = content; // 修改文本框的内容
    input.select(); // 选中文本
    if (document.execCommand('copy')) {
    } else {
        console.error('复制失败');
    }
}