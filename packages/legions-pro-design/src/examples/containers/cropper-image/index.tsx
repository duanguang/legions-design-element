/*
 * @Author: duanguang
 * @Date: 2021-05-13 22:03:08
 * @LastEditTime: 2021-05-17 23:15:06
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/cropper-image/index.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button } from 'antd';
import React,{ useState } from 'react';
import '../../assets/css/cropper.css';
import SparkMD5 from 'spark-md5';

/* const mattera = require('../../assets/images/containers/ChMkKmCcnN2INzJBAATXBEkTqDoAAOv9gGHxKgABNcc744.jpg'); */
const mattera = require('../../assets/images/containers/cropper-1.png');
function fileReader (blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.readAsDataURL(blob)
    })
}
export const CropperImage = () => {
    const [previewImg,setPreviewImg] = useState('');
    return (<div>
       {/*  <img id="image" style={{ display: 'none' }} src={mattera}></img> */}
        <Button onClick={() => {
            /* const image = document.getElementById('image') as HTMLImageElement; */
            const image = new Image();
            image.src = mattera;
            image.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                /* context.fillStyle = "#FFF";
                context.fillRect(0,0,1800,1200); */
                const originWidth = image.width;
                const originHeight = image.height;
                const originAspectRatio = originWidth / originHeight;
                
                const aspectRatio = 16 / 10;
                let cropperWidth = 0;
                let cropperHeight = 0;
                let sx = 0;// 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 X 轴坐标。
                let sy = 0;// 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 Y 轴坐标。
                if (originWidth > originHeight) {
                    if (originAspectRatio > aspectRatio) {
                        cropperHeight = originHeight; // 如果图片原比例大于待裁剪尺寸，则把原图片高度值赋给待裁剪高度;
                        cropperWidth = cropperHeight * aspectRatio; // 待裁剪宽度值为高度*裁剪比例值
                        sx = (originWidth - cropperWidth) / 2;
                        sy = (originHeight - cropperHeight) / 2;
                        
                        canvas.width = cropperWidth;
                        canvas.height = cropperHeight;
                        context.fillStyle =  'transparent';
                        context.fillRect(0, 0, cropperWidth, cropperHeight);
                        context.drawImage(image,sx,sy,cropperWidth,cropperHeight,0,0,cropperWidth,cropperHeight);
                        const dataURL = canvas.toDataURL('image/jpg',100);
                        setPreviewImg(dataURL)
                        console.log(sx,sy,cropperWidth,cropperHeight)
                    }
                }
                else {
                    cropperWidth = originWidth;
                    cropperHeight = cropperHeight * aspectRatio; 
                    sx = (originWidth - cropperWidth) / 2;
                    sy = (originHeight - cropperHeight) / 2;
                    canvas.width = cropperWidth;
                    canvas.height = cropperHeight;
                }
            }


            
        }}>裁剪</Button>
        <Button onClick={() => {
            const image = new Image();
            image.src = mattera;
            image.onload = () => {
                const reader = new FileReader();
                const spark = new SparkMD5.ArrayBuffer();
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                context.drawImage(image,0,0,image.width,image.height);
                const dataURL = canvas.toDataURL('image/png');
                canvas.toBlob((blob) => {
                    const fileSize = blob.size; // 文件大小
                    const chunkSize = 4 * 1024 ; // 切片的大小
                    const chunks = Math.ceil(fileSize / chunkSize); // 获取切片的个数
                    console.log(fileSize,chunkSize,chunks);
                    const blobSlice = blob.slice;
                    let currentChunk = 0;
                    /* const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice; */
                    console.log('blob: ',blob);
                    function loadNext() {
                        var start = currentChunk * chunkSize;
                        var end = start + chunkSize > fileSize ? fileSize : (start + chunkSize);
                        reader.readAsArrayBuffer(blobSlice.call(blob,start, end));
                    };
                    reader.onload = (e)=> {
                        const result = e.target.result;
                        console.log(result,'result');
                        spark.append(result);
                        currentChunk++;
                        if (currentChunk < chunks) {
                          loadNext();
                          console.log(`第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`);
                        } else {
                          const md5 = spark.end();
                          console.log('解析完成');
                          console.log(md5);
                        }
                    };
                    loadNext();
                })
               
            }
        }}>分片</Button>
       {/*  <Button onClick={() => {
            const image = document.getElementById('image') as HTMLImageElement;
            const cropper = new Cropper(image,{
                aspectRatio: 16 / 10,
                background: false,
                modal: false,
                guides: false,
                highlight: false,
                crop(event) {
                    let cas = cropper.getCroppedCanvas();// 获取被裁剪后的canvas                  
                    let base64 = cas.toDataURL('image/jpeg'); // 转换为base64  
                    setPreviewImg(base64);
                    console.log(event.detail.x);
                    console.log(event.detail.y);
                    console.log(event.detail.width);
                    console.log(event.detail.height);
                    console.log(event.detail.rotate);
                    console.log(event.detail.scaleX);
                    console.log(event.detail.scaleY);
                },
            });
            console.log(cropper,'croppercropper');
        }}>cropper</Button> */}
        <img src={previewImg}></img>
    </div>)
}