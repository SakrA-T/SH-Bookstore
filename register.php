<?php
$num=$_POST['num'];
$name=$_POST['name'];
$qq = $_POST['qq'];
$psd=$_POST['psd'];
$college=$_POST['college'];
$photo=$_POST['photo'];

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");
$query="SELECT num FROM userinfo WHERE num=$num";
$result=mysqli_query($link, $query);
$p=mysqli_fetch_object($result);
if (isset($p->num)) {//如果存在此学号
    mysqli_close($link);
    echo "{\"code\":\"0\",\"msg\":\"此学号已注册！请重新核对注册信息！\"}";
} else {
    $flag = true;
    while ($flag) {
        
        $id = random_int(1, 999999);

        $checkid = "SELECT id FROM userinfo WHERE id=$id";
        $checkrst=mysqli_query($link, $checkid);
        $p=mysqli_fetch_object($checkrst);
        if (!$p) {
            $flag = false;
        }
    }
    $insert="INSERT INTO userinfo VALUES ($id,'$name',$num,$qq,'$psd','$college',0,0,'$photo')";
    if (mysqli_query($link, $insert)) {
        mysqli_close($link);
        echo "{\"code\":\"1\",\"msg\":\"注册成功！\"}";
    } else {
        mysqli_close($link);
        echo "{\"code\":\"-2\",\"msg\":\"出现未知错误！请联系系统管理员修复！\r\nerror code:".mysqli_error($link)."\"}";
    }
}
