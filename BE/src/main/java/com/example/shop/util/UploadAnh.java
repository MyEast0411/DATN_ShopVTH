package com.example.shop.util;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class UploadAnh {

    private static final String IMGUR_CLIENT_ID = "9df5d9cecb5d8ee";

    public static String upload(String urlImg) {
        String userHome = System.getProperty("user.home");

        // Kết hợp với đường dẫn "Pictures/Saved Pictures"
        String fullPath = userHome + "\\Pictures\\Saved Pictures\\";

        // Tạo đối tượng Path từ đường dẫn
        Path path = Paths.get(fullPath);
        File imageFile = new File(path+"\\"+urlImg);
        System.out.println(imageFile);

        if (imageFile.exists()) {
            try {
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("https://api.imgur.com/3/")
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();

                ImgurService imgurService = retrofit.create(ImgurService.class);

                RequestBody requestBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
                MultipartBody.Part imagePart = MultipartBody.Part.createFormData("image", imageFile.getName(), requestBody);

                Call<ImgurResponse> call = imgurService.uploadImage("Client-ID " + IMGUR_CLIENT_ID, imagePart);
                ImgurResponse response = call.execute().body();

                if (response != null && response.success) {
                    System.out.println("Ảnh đã được tải lên thành công! Link Imgur: " + response.data.link);
                    return response.data.link;
                } else {
                    System.err.println("Không thể tải lên ảnh lên Imgur.");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.err.println("Không tìm thấy tệp ảnh.");
        }
        return null;
    }
    interface ImgurService {
        @Multipart
        @POST("image")
        Call<ImgurResponse> uploadImage(@Header("Authorization") String authorization, @Part MultipartBody.Part image);
    }

    static class ImgurResponse {
        Data data;
        boolean success;

        static class Data {
            String link;
        }
    }
}
