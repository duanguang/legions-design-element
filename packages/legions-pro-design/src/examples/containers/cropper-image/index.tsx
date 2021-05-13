/*
 * @Author: duanguang
 * @Date: 2021-05-13 22:03:08
 * @LastEditTime: 2021-05-13 22:52:47
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/cropper-image/index.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button } from 'antd';
import React,{useState} from 'react';
import Cropper from 'cropperjs';
import '../../assets/css/cropper.css';
const mattera = require('../../assets/images/containers/ChMkKmCcnN2INzJBAATXBEkTqDoAAOv9gGHxKgABNcc744.jpg');
export const CropperImage = () => {
    const [previewImg, setPreviewImg] = useState('');
    return (<div>
        <img id="image" style={{ display: 'none' }} src={mattera}></img>
        <Button onClick={() => {
            const image = document.getElementById('image') as HTMLImageElement;
            const cropper = new Cropper(image,{
                aspectRatio: 16 / 9,
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
        }}>裁剪</Button>
        <img src={previewImg}></img>
    </div>)
}