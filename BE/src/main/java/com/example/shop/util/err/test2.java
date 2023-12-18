package com.example.shop.util.err;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class test2 {

    public static void main(String[] args) {
        int[] arr = {3,6,9,8};
        System.out.println(ladu(4,5,arr));
    }

    static int ladu(int n, int k, int[] a) {
        Set<String> set = new HashSet<>();
        for (int i = 0; i < a.length ; i++) {
            if(a[i] % k != 0) {
                set.add(a[i] % k +"");
            }else {
                set.add(a[i] / k+"");
            }
        }
        return set.size();
    }
}
