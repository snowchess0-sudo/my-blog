---
title: hot100哈希
date: 2026-04-19
description: 
tags:
---

## 哈希

想快、想去重、想查存在 → 直接上哈希

#### [1. 两数之和](https://leetcode.cn/problems/two-sum/)

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n=nums.length;
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                if(nums[i]+nums[j]==target)return new int[]{i,j};
            }
        }
        return new int[0];
    }
}
```

`数组.length` → 属性 → **无括号**

`字符串.length()` → 方法 → **有括号**

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer>map=new HashMap<>();
        for(int i=0;i<nums.length;i++){
            int need=target-nums[i];
            if(map.containsKey(need)){
                return new int[]{i,map.get(need)};
            }
            else map.put(nums[i],i);
        }
        return new int[]{};
    }
}
```

int 与 Integer 区别

1. 本质不同

- int：基本数据类型，就是个纯数字，存的是值本身。
- Integer：包装类（对象），把 int 包成一个 Java 对象。

2. 存值方式

- int：直接存数字
- Integer：存的是对象引用，里面包着一个 int 值

3. 初始值

- int：默认 0
- Integer：默认 null

4. 能不能为 null

- int：不能为 null，只能是数字
- Integer：可以为 null

5. 能不能放进 HashMap

- int 不能直接放进 Map
- Integer 可以

int ↔ Integer 来回自动转（自动拆装箱）

#### [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

```java
import java.util.*;  // 这一行导入所有需要的类

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        
        for (String s : strs) {
          	//利用新数组对字符串排序
            char[] temp = s.toCharArray();
            Arrays.sort(temp);
            String key = new String(temp);
            
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }
            map.get(key).add(s);
        }
        
        return new ArrayList<>(map.values());
    }
}
```

`toCharArray()`：将字符串转换为字符数组

`Arrays.sort()`：对字符数组进行升序排序

`new String(char[])`：将字符数组重新构建为字符串

**数组.toString () = 地址**

**new String (数组) = 真实内容**

`map.containsKey(key)`：判断 Map 中是否包含指定的 key

`map.put(key, value)`：向 Map 中存入键值对

`map.get(key)`：根据 key 获取 Map 中对应的 value

`list.add(item)`：向 List 集合中添加元素

`map.values()`：获取 Map 中所有的 value 集合（区分于key集合）， 返回的是 **Collection<List<String>>**，new ArrayList<>()把它包装成题目要的 List 类型**

`new ArrayList<>(集合)`：将其他集合转为 ArrayList 类型，

List<String> list = new ArrayList<>(); // ✅ 正确

List<String> list = new List<String>(); // ❌ 报错

**List 是接口 → 不能 new**

**ArrayList 是类 → 可以 new**

#### [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        int maxLen = 0;

        for (int curNum : set) {
            if (!set.contains(curNum - 1)) { // 英文括号！
                int curLen = 1;

                while (set.contains(curNum + 1)) {
                    curNum++;
                    curLen++;
                }

                // 这里必须用 Math.max
                maxLen = Math.max(curLen, maxLen);
            }
        }
        return maxLen;
    }
}
```

Map 存键值对 → 用 put ()

Set 存单个元素 → 用 add ()

