/*
 * @Author: duanguang
 * @Date: 2021-05-15 16:51:08
 * @LastEditTime: 2021-05-17 23:37:55
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/tests/burst.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const Seven = require('node-7z');
const fs = require('fs');
const src =
  '/Users/duanguang/Documents/Front-End/legions/legions-design-element/packages/legions-pro-design/src/examples/assets/images/containers/cropper-1.png.zip';
const root =
  '/Users/duanguang/Documents/Front-End/legions/legions-design-element/packages/legions-pro-design/src/examples/assets/images/containers/';
const file = fs.readFileSync(src);
console.log(file);
const myStream = Seven.add(src, root, {
   /*  $progress: true, */
   recursive: true
});
myStream.on('data', function (data) {
  console.log(`data:${JSON.stringify(data)}`); //? { status: 'extracted', file: 'extracted/file.txt" }
});

myStream.on('progress', function (progress) {
  console.log(`progress:${JSON.stringify(progress)}`); //? { percent: 67, fileCount: 5, file: undefinded }
});

myStream.on('end', function () {
  // end of the operation, get the number of folders involved in the operation
  myStream.info.get('Folders'); //? '4'
});

myStream.on('error', err => {
  console.log(err);
});
