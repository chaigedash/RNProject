import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {Color} from "../../Constant/Theme.ts";

const AvatarUpload = (props: {url: string, edge?: number, radius?: number}) => {
    // todo：后端已存url的显示逻辑
    const [avatar, setAvatar] = useState(null); // 用于存储上传的图片
    const avatarEdge = props.edge ? props.edge : 120;
    const avatarRadius = props.radius ? props.radius : 20;
    // 打开图片选择器
    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true, // 启用裁切功能
            cropperCircleOverlay: true, // 圆形裁切框
            compressImageQuality: 0.8, // 压缩图片质量
        })
        .then((image) => {
            console.log('Selected image:', image);
            setAvatar(image.path); // 设置选择的图片路径
        })
        .catch((error) => {
            console.log('ImagePicker error:', error);
        });
    };

    // 上传图片到后端
    const uploadImage = async () => {
        if (!avatar) {
            Alert.alert('请先选择图片');
            return;
        }

        const uploadUrl = 'https://your-backend-endpoint.com/upload'; // 替换为你的后端接口

        try {
            const formData = new FormData();
            formData.append('file', {
                uri: avatar, // 图片路径
                name: 'avatar.jpg', // 文件名
                type: 'image/jpeg', // 文件类型
            });

            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload response:', response.data);
            Alert.alert('上传成功');
        } catch (error) {
            console.log('Upload error:', error);
            Alert.alert('上传失败');
        }
    };

    return (
            <TouchableOpacity
                onPress={pickImage}
            >
                <View style={{
                    width: avatarEdge,
                    height: avatarEdge,
                    borderRadius: avatarRadius,
                    backgroundColor: Color.grey,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={{
                            width: avatarEdge,
                            height: avatarEdge,
                        }} />
                    ) : (
                        <Text style={{
                            color: Color.secondary,
                            fontSize: 16,
                        }}>点击选择头像</Text>
                    )}
                </View>
            </TouchableOpacity>
    );
};

export default AvatarUpload;