<?php
// $_user=$_POST['user'];
// $_psd=$_POST['psd'];
$_user="ttt";
$_psd="e10adc3949ba59abbe56e057f20f883e";
$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":\"-1\",\"msg\":\"连接数据库时出错！请联系系统管理员修复！\r\nerror code:".mysqli_connect_error()."\"}");
$query = "SELECT id,name,password,num FROM userinfo WHERE name='" . $_user . "'";
$result = mysqli_query($link, $query);
$db_user = mysqli_fetch_object($result);
$id = $db_user->id;
$psd = $db_user->password;
$name = $db_user->name;
$num = $db_user->num;

mysqli_close($link);
if ($db_user && $psd==$_psd) {
    echo "{\"code\":\"1\",\"name\":\"" . $name . "\",\"id\":\"" . $id . "\",\"num\":" . $num . "}";
} else {
    echo "{\"code\":\"0\",\"msg\":\"用户名或密码不正确！\"}";
}
