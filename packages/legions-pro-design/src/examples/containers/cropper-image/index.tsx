/*
 * @Author: duanguang
 * @Date: 2021-05-13 22:03:08
 * @LastEditTime: 2021-05-15 21:56:40
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/cropper-image/index.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button } from 'antd';
import React,{ useState } from 'react';
import Cropper from 'cropperjs';
import '../../assets/css/cropper.css';
const mattera = require('../../assets/images/containers/ChMkKmCcnN2INzJBAATXBEkTqDoAAOv9gGHxKgABNcc744.jpg');
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